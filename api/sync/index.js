/**
 * Standalone sync serverless function for Vercel
 * This is a minimal function that only handles the sync endpoint
 * without loading the entire Express app
 */

const SYNC_API_KEY = process.env.SYNC_API_KEY || "meishu-qa-sync-key-2026";

// MySQL connection
let db = null;
async function getDb() {
  if (!db && process.env.DATABASE_URL) {
    const { drizzle } = await import("drizzle-orm/mysql2");
    db = drizzle(process.env.DATABASE_URL);
  }
  return db;
}

// Schema import
async function getSchema() {
  const schema = await import("../../drizzle/schema.ts");
  return schema;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // 1. Verify API Key
  const apiKey = req.headers["x-sync-api-key"];
  if (!apiKey || apiKey !== SYNC_API_KEY) {
    return res.status(401).json({ success: false, message: "Invalid API key" });
  }

  // 2. Check source header (prevent loops)
  const syncSource = req.headers["x-sync-source"];
  if (syncSource === "community-management") {
    return res.json({ success: true, message: "Skipped - source is self", action: "skipped" });
  }

  // 3. Parse request
  const syncReq = req.body;
  if (!syncReq.operation || !syncReq.table || !syncReq.data) {
    return res.status(400).json({ success: false, message: "Invalid request body" });
  }

  // 4. Handle sync request
  try {
    const database = await getDb();
    if (!database) {
      return res.status(500).json({ success: false, message: "Database not available" });
    }

    const schema = await getSchema();
    const { eq, desc, and } = await import("drizzle-orm");
    
    const tableMap = {
      residents: schema.residents,
      repairRequests: schema.repairRequests,
      renovationApplications: schema.renovationApplications,
      resourceLibrary: schema.resourceLibrary,
      invitedUsers: schema.invitedUsers,
      emergencyContacts: schema.emergencyContacts,
    };

    const table = tableMap[syncReq.table];
    if (!table) {
      return res.status(400).json({ success: false, message: `Unknown table: ${syncReq.table}` });
    }

    let result;
    switch (syncReq.operation) {
      case "create": {
        result = await database.insert(table).values(syncReq.data);
        const insertId = result[0]?.insertId || null;
        return res.json({ success: true, message: `${syncReq.table} inserted`, action: "inserted", id: insertId });
      }
      case "update": {
        // Use id if available, otherwise use the primary key field
        const keyField = syncReq.keyField || "id";
        result = await database.update(table)
          .set(syncReq.data)
          .where(eq(table[keyField], syncReq.data[keyField]));
        return res.json({ success: true, message: `${syncReq.table} updated`, action: "updated", affectedRows: result[0]?.affectedRows || 0 });
      }
      case "delete": {
        const keyField = syncReq.keyField || "id";
        result = await database.delete(table)
          .where(eq(table[keyField], syncReq.data[keyField]));
        return res.json({ success: true, message: `${syncReq.table} deleted`, action: "deleted", affectedRows: result[0]?.affectedRows || 0 });
      }
      default:
        return res.status(400).json({ success: false, message: `Unknown operation: ${syncReq.operation}` });
    }
  } catch (error) {
    console.error("[SYNC] Error:", error);
    return res.status(500).json({
      success: false,
      message: `Internal error: ${error.message}`,
    });
  }
}
