var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  CONSTRUCTION_TYPES_REQUIRING_DEPOSIT: () => CONSTRUCTION_TYPES_REQUIRING_DEPOSIT,
  CONSTRUCTION_TYPE_RENOVATION: () => CONSTRUCTION_TYPE_RENOVATION,
  DECORATION_DEPOSIT_STATUS: () => DECORATION_DEPOSIT_STATUS,
  auditLogs: () => auditLogs,
  coResidents: () => coResidents,
  emergencyContacts: () => emergencyContacts,
  invitedUsers: () => invitedUsers,
  operationLogs: () => operationLogs,
  parkingPlates: () => parkingPlates,
  parkings: () => parkings,
  passwordUsers: () => passwordUsers,
  renovationApplications: () => renovationApplications,
  repairRequests: () => repairRequests,
  residents: () => residents,
  resourceFiles: () => resourceFiles,
  resourceFolders: () => resourceFolders,
  userSessions: () => userSessions,
  users: () => users
});
import { mysqlTable, mysqlEnum, varchar, int, timestamp, text, json, date } from "drizzle-orm/mysql-core";
var residents, coResidents, parkings, parkingPlates, emergencyContacts, repairRequests, auditLogs, passwordUsers, users, renovationApplications, operationLogs, userSessions, invitedUsers, resourceFolders, resourceFiles, CONSTRUCTION_TYPE_RENOVATION, CONSTRUCTION_TYPES_REQUIRING_DEPOSIT, DECORATION_DEPOSIT_STATUS;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    residents = mysqlTable("residents", {
      id: int("id").autoincrement().primaryKey(),
      // 戶號
      unitNumber: varchar("unitNumber", { length: 32 }).notNull(),
      // 區權人（所有人）
      ownerName: varchar("ownerName", { length: 64 }).notNull(),
      ownerPhone: varchar("ownerPhone", { length: 32 }),
      // 同住人（最多四位）- 保留以支援舊資料
      coResident1Name: varchar("coResident1Name", { length: 64 }),
      coResident1Phone: varchar("coResident1Phone", { length: 32 }),
      coResident2Name: varchar("coResident2Name", { length: 64 }),
      coResident2Phone: varchar("coResident2Phone", { length: 32 }),
      coResident3Name: varchar("coResident3Name", { length: 64 }),
      coResident3Phone: varchar("coResident3Phone", { length: 32 }),
      coResident4Name: varchar("coResident4Name", { length: 64 }),
      coResident4Phone: varchar("coResident4Phone", { length: 32 }),
      // 車位
      carParkingNumber: varchar("carParkingNumber", { length: 32 }),
      carPlateNumber: varchar("carPlateNumber", { length: 32 }),
      motorcycleParkingNumber: varchar("motorcycleParkingNumber", { length: 32 }),
      motorcyclePlateNumber: varchar("motorcyclePlateNumber", { length: 32 }),
      bicycleParkingNumber: varchar("bicycleParkingNumber", { length: 32 }),
      // 住戶住所
      address: text("address"),
      // 緊急連絡人（第一位）
      emergencyContactName: varchar("emergencyContactName", { length: 64 }),
      emergencyContactPhone: varchar("emergencyContactPhone", { length: 32 }),
      emergencyContactRelation: varchar("emergencyContactRelation", { length: 32 }),
      emergencyContactAddress: text("emergencyContactAddress"),
      // 緊急連絡人（第二位）
      emergencyContact2Name: varchar("emergencyContact2Name", { length: 64 }),
      emergencyContact2Phone: varchar("emergencyContact2Phone", { length: 32 }),
      emergencyContact2Relation: varchar("emergencyContact2Relation", { length: 32 }),
      emergencyContact2Address: text("emergencyContact2Address"),
      // 坪數
      squareMeters: varchar("squareMeters", { length: 32 }),
      // 水號
      waterMeterNumber: varchar("waterMeterNumber", { length: 32 }),
      // 電號
      electricityMeterNumber: varchar("electricityMeterNumber", { length: 32 }),
      // 入住日期
      moveInDate: date("moveInDate"),
      // 備註
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    coResidents = mysqlTable("co_residents", {
      id: int("id").autoincrement().primaryKey(),
      residentId: int("residentId").notNull(),
      name: varchar("name", { length: 64 }).notNull(),
      phone: varchar("phone", { length: 32 }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    parkings = mysqlTable("parkings", {
      id: int("id").autoincrement().primaryKey(),
      residentId: int("residentId").notNull(),
      type: mysqlEnum("type", ["car", "motorcycle", "bicycle"]).notNull(),
      number: varchar("number", { length: 32 }).notNull(),
      plate: varchar("plate", { length: 32 }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    parkingPlates = mysqlTable("parking_plates", {
      id: int("id").autoincrement().primaryKey(),
      parkingId: int("parkingId").notNull(),
      plate: varchar("plate", { length: 32 }).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    emergencyContacts = mysqlTable("emergency_contacts", {
      id: int("id").autoincrement().primaryKey(),
      residentId: int("residentId").notNull(),
      name: varchar("name", { length: 64 }).notNull(),
      phone: varchar("phone", { length: 32 }),
      relationship: varchar("relationship", { length: 32 }),
      address: text("address"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    repairRequests = mysqlTable("repair_requests", {
      id: int("id").autoincrement().primaryKey(),
      repairDate: varchar("repairDate", { length: 32 }).notNull(),
      unitNumber: varchar("unitNumber", { length: 32 }).notNull(),
      description: text("description").notNull(),
      status: mysqlEnum("status", [
        "pending",
        "in_progress",
        "completed",
        "cancelled",
        "resident_self_repair"
      ]).default("pending"),
      notes: text("notes"),
      completionDate: varchar("completionDate", { length: 32 }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    auditLogs = mysqlTable("audit_logs", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      action: varchar("action", { length: 50 }).notNull(),
      entity: varchar("entity", { length: 50 }).notNull(),
      entityId: int("entityId"),
      changes: text("changes"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    passwordUsers = mysqlTable("password_users", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull().unique(),
      passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    users = mysqlTable("users", {
      id: int("id").autoincrement().primaryKey(),
      openId: varchar("openId", { length: 255 }).notNull().unique(),
      name: varchar("name", { length: 64 }).notNull(),
      email: varchar("email", { length: 255 }).notNull().unique(),
      loginMethod: mysqlEnum("loginMethod", ["email", "password"]).default("email"),
      role: mysqlEnum("role", ["admin", "user"]).default("user"),
      isActive: int("isactive").default(1).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      lastSignedIn: timestamp("lastSignedIn")
    });
    renovationApplications = mysqlTable("renovation_applications", {
      id: int("id").autoincrement().primaryKey(),
      unitNumber: varchar("unitNumber", { length: 32 }).notNull(),
      applicationDate: varchar("applicationDate", { length: 32 }).notNull(),
      constructionStartDate: varchar("constructionStartDate", { length: 32 }),
      constructionEndDate: varchar("constructionEndDate", { length: 32 }),
      constructionContent: varchar("constructionContent", { length: 255 }).notNull(),
      consentLetterPasted: varchar("consentLetterPasted", { length: 32 }),
      applicantName: varchar("applicantName", { length: 64 }).notNull(),
      applicantPhone: varchar("applicantPhone", { length: 32 }).notNull(),
      registeredBy: varchar("registeredBy", { length: 64 }),
      status: mysqlEnum("status", ["pending", "approved", "completed", "rejected"]).default("pending"),
      decorationDeposit: varchar("decorationDeposit", { length: 32 }),
      decorationDepositStatus: mysqlEnum("decorationDepositStatus", ["notPaid", "paid", "refunded"]).default("notPaid"),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    operationLogs = mysqlTable("operation_logs", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      action: varchar("action", { length: 64 }).notNull(),
      // e.g., "create_resident", "update_repair", "delete_application"
      module: varchar("module", { length: 64 }).notNull(),
      // e.g., "residents", "repairs", "renovations"
      targetId: int("targetId"),
      // ID of the affected record
      targetType: varchar("targetType", { length: 64 }),
      // Type of the affected record
      description: text("description"),
      // Human-readable description
      details: json("details"),
      // Additional details in JSON format
      ipAddress: varchar("ipAddress", { length: 45 }),
      // IPv4 or IPv6
      userAgent: text("userAgent"),
      // Browser/client info
      status: mysqlEnum("status", ["success", "failure"]).default("success"),
      errorMessage: text("errorMessage"),
      // Error message if status is failure
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    userSessions = mysqlTable("user_sessions", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      sessionToken: varchar("sessionToken", { length: 255 }).notNull().unique(),
      ipAddress: varchar("ipAddress", { length: 45 }),
      userAgent: text("userAgent"),
      deviceName: varchar("deviceName", { length: 255 }),
      // Device identifier
      loginAt: timestamp("loginAt").defaultNow().notNull(),
      lastActivityAt: timestamp("lastActivityAt").defaultNow().notNull(),
      logoutAt: timestamp("logoutAt"),
      isActive: int("isActive").default(1).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    invitedUsers = mysqlTable("invited_users", {
      id: int("id").autoincrement().primaryKey(),
      email: varchar("email", { length: 255 }).notNull().unique(),
      name: varchar("name", { length: 64 }),
      role: varchar("role", { length: 32 }).default("user").notNull(),
      // admin or user
      status: varchar("status", { length: 32 }).default("pending").notNull(),
      // pending, accepted, rejected
      invitedBy: int("invitedBy"),
      // User ID who invited
      invitedAt: timestamp("invitedAt").defaultNow().notNull(),
      acceptedAt: timestamp("acceptedAt"),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    resourceFolders = mysqlTable("resource_folders", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    resourceFiles = mysqlTable("resource_files", {
      id: int("id").autoincrement().primaryKey(),
      folderId: int("folderId").notNull().references(() => resourceFolders.id, { onDelete: "cascade" }),
      name: varchar("name", { length: 255 }).notNull(),
      fileUrl: text("fileUrl").notNull(),
      fileSize: int("fileSize"),
      fileType: varchar("fileType", { length: 32 }).default("pdf"),
      uploadedBy: int("uploadedBy"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    CONSTRUCTION_TYPE_RENOVATION = "\u65BD\u5DE5\u88DD\u6F62";
    CONSTRUCTION_TYPES_REQUIRING_DEPOSIT = ["\u65BD\u5DE5\u88DD\u6F62"];
    DECORATION_DEPOSIT_STATUS = {
      NOT_PAID: "notPaid",
      PAID: "paid",
      REFUNDED: "refunded"
    };
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  addInvitedUser: () => addInvitedUser,
  addParkingPlate: () => addParkingPlate,
  backupAllData: () => backupAllData,
  createEmergencyContact: () => createEmergencyContact,
  createParking: () => createParking,
  createRepairRequest: () => createRepairRequest,
  createResident: () => createResident,
  createUserSession: () => createUserSession,
  deleteEmergencyContact: () => deleteEmergencyContact,
  deleteEmergencyContactsByResidentId: () => deleteEmergencyContactsByResidentId,
  deleteInvitedUser: () => deleteInvitedUser,
  deleteParking: () => deleteParking,
  deleteParkingPlate: () => deleteParkingPlate,
  deleteRepairRequest: () => deleteRepairRequest,
  deleteResident: () => deleteResident,
  forceLogoutAllSessions: () => forceLogoutAllSessions,
  getActiveSessionsByUserId: () => getActiveSessionsByUserId,
  getAllInvitedUsers: () => getAllInvitedUsers,
  getDb: () => getDb,
  getEmergencyContactsByResidentId: () => getEmergencyContactsByResidentId,
  getInvitedUserByEmail: () => getInvitedUserByEmail,
  getInvitedUserById: () => getInvitedUserById,
  getOperationLogsByModule: () => getOperationLogsByModule,
  getOperationLogsByUserId: () => getOperationLogsByUserId,
  getParkingPlatesByParkingId: () => getParkingPlatesByParkingId,
  getParkingsByResidentId: () => getParkingsByResidentId,
  getRepairRequestById: () => getRepairRequestById,
  getResidentById: () => getResidentById,
  getUserByOpenId: () => getUserByOpenId,
  hasActiveSession: () => hasActiveSession,
  isEmailInvited: () => isEmailInvited,
  listAllUsers: () => listAllUsers,
  listRepairRequests: () => listRepairRequests,
  listResidents: () => listResidents,
  logOperation: () => logOperation,
  logoutUserSession: () => logoutUserSession,
  restoreRepairRequests: () => restoreRepairRequests,
  restoreResidents: () => restoreResidents,
  updateEmergencyContact: () => updateEmergencyContact,
  updateInvitedUser: () => updateInvitedUser,
  updateParking: () => updateParking,
  updateRepairRequest: () => updateRepairRequest,
  updateResident: () => updateResident,
  updateUserRole: () => updateUserRole,
  upsertUser: () => upsertUser
});
import { and as and2, eq, like, or, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = { openId: user.openId, name: user.name || "", email: user.email || "" };
    const updateSet = {};
    if (user.name) updateSet.name = user.name;
    if (user.email) updateSet.email = user.email;
    if (user.loginMethod) updateSet.loginMethod = user.loginMethod;
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) values.lastSignedIn = /* @__PURE__ */ new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function listResidents(search) {
  const db = await getDb();
  if (!db) return [];
  let residentsData;
  if (search && search.trim()) {
    const keyword = `%${search.trim()}%`;
    residentsData = await db.select().from(residents).where(
      or(
        like(residents.unitNumber, keyword),
        like(residents.ownerName, keyword),
        like(residents.ownerPhone, keyword),
        like(residents.coResident1Name, keyword),
        like(residents.coResident2Name, keyword),
        like(residents.coResident3Name, keyword),
        like(residents.coResident4Name, keyword),
        like(residents.emergencyContactName, keyword),
        like(residents.emergencyContactPhone, keyword)
      )
    ).orderBy(residents.unitNumber);
  } else {
    residentsData = await db.select().from(residents).orderBy(residents.unitNumber);
  }
  const allEmergencyContacts = await db.select().from(emergencyContacts);
  const contactsByResidentId = /* @__PURE__ */ new Map();
  for (const contact of allEmergencyContacts) {
    if (!contactsByResidentId.has(contact.residentId)) {
      contactsByResidentId.set(contact.residentId, []);
    }
    contactsByResidentId.get(contact.residentId).push(contact);
  }
  return residentsData.map((resident) => ({
    ...resident,
    emergencyContacts: contactsByResidentId.get(resident.id) || []
  }));
}
async function getResidentById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(residents).where(eq(residents.id, id)).limit(1);
  return result[0];
}
async function createResident(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(residents).values(data);
  return result;
}
async function updateResident(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(residents).set(data).where(eq(residents.id, id));
  return getResidentById(id);
}
async function deleteResident(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(residents).where(eq(residents.id, id));
}
async function getParkingsByResidentId(residentId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(parkings).where(eq(parkings.residentId, residentId));
}
async function getParkingPlatesByParkingId(parkingId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(parkingPlates).where(eq(parkingPlates.parkingId, parkingId));
}
async function createParking(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(parkings).values(data);
  return { insertId: result[0]?.insertId };
}
async function updateParking(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(parkings).set(data).where(eq(parkings.id, id));
}
async function deleteParking(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(parkingPlates).where(eq(parkingPlates.parkingId, id));
  return await db.delete(parkings).where(eq(parkings.id, id));
}
async function addParkingPlate(parkingId, plate) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(parkingPlates).values({ parkingId, plate });
  return { insertId: result[0]?.insertId };
}
async function deleteParkingPlate(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(parkingPlates).where(eq(parkingPlates.id, id));
}
async function getEmergencyContactsByResidentId(residentId) {
  const db = await getDb();
  if (!db) return [];
  try {
    const result = await db.select().from(emergencyContacts).where(eq(emergencyContacts.residentId, residentId));
    console.log(`[DEBUG] getEmergencyContactsByResidentId: residentId=${residentId}, found ${result?.length || 0} contacts`);
    return result || [];
  } catch (error) {
    console.error(`[ERROR] getEmergencyContactsByResidentId: Failed to fetch for residentId ${residentId}:`, error);
    return [];
  }
}
async function createEmergencyContact(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(emergencyContacts).values(data);
  return { insertId: result[0]?.insertId };
}
async function updateEmergencyContact(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(emergencyContacts).set(data).where(eq(emergencyContacts.id, id));
}
async function deleteEmergencyContact(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(emergencyContacts).where(eq(emergencyContacts.id, id));
}
async function deleteEmergencyContactsByResidentId(residentId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(emergencyContacts).where(eq(emergencyContacts.residentId, residentId));
}
async function listRepairRequests(filters) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (filters?.status && filters.status !== "all") {
    conditions.push(eq(repairRequests.status, filters.status));
  }
  if (conditions.length > 0) {
    return await db.select().from(repairRequests).where(and2(...conditions)).orderBy(repairRequests.createdAt);
  }
  return await db.select().from(repairRequests).orderBy(repairRequests.createdAt);
}
async function getRepairRequestById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(repairRequests).where(eq(repairRequests.id, id)).limit(1);
  return result[0];
}
async function createRepairRequest(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(repairRequests).values(data);
}
async function updateRepairRequest(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(repairRequests).set(data).where(eq(repairRequests.id, id));
  return await db.select().from(repairRequests).where(eq(repairRequests.id, id)).then((rows) => rows[0]);
}
async function deleteRepairRequest(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(repairRequests).where(eq(repairRequests.id, id));
}
async function listAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(users).orderBy(users.createdAt);
}
async function updateUserRole(openId, role) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(users).set({ role }).where(eq(users.openId, openId));
}
async function backupAllData() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const residentsData = await db.select().from(residents);
  const repairRequestsData = await db.select().from(repairRequests);
  return {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    residents: residentsData,
    repairRequests: repairRequestsData,
    totalRecords: residentsData.length + repairRequestsData.length
  };
}
async function restoreResidents(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  for (const resident of data) {
    try {
      await db.insert(residents).values(resident);
      successCount++;
    } catch (error) {
      errorCount++;
      errors.push(`\u6236\u865F ${resident.unitNumber}: ${error.message}`);
    }
  }
  return { successCount, errorCount, errors };
}
async function restoreRepairRequests(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  for (const request of data) {
    try {
      await db.insert(repairRequests).values(request);
      successCount++;
    } catch (error) {
      errorCount++;
      errors.push(`\u5831\u4FEE ${request.unitNumber}: ${error.message}`);
    }
  }
  return { successCount, errorCount, errors };
}
async function logOperation(log) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot log operation: database not available");
    return;
  }
  try {
    await db.insert(operationLogs).values(log);
  } catch (error) {
    console.error("[Database] Failed to log operation:", error);
  }
}
async function getOperationLogsByUserId(userId, limit = 100) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get operation logs: database not available");
    return [];
  }
  try {
    const logs = await db.select().from(operationLogs).where(eq(operationLogs.userId, userId)).orderBy((t2) => t2.createdAt).limit(limit);
    return logs;
  } catch (error) {
    console.error("[Database] Failed to get operation logs:", error);
    return [];
  }
}
async function getOperationLogsByModule(module, limit = 100) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get operation logs: database not available");
    return [];
  }
  try {
    const logs = await db.select().from(operationLogs).where(eq(operationLogs.module, module)).orderBy((t2) => t2.createdAt).limit(limit);
    return logs;
  } catch (error) {
    console.error("[Database] Failed to get operation logs:", error);
    return [];
  }
}
async function createUserSession(session) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create session: database not available");
    return null;
  }
  try {
    const result = await db.insert(userSessions).values(session);
    return result[0].insertId || null;
  } catch (error) {
    console.error("[Database] Failed to create session:", error);
    return null;
  }
}
async function getActiveSessionsByUserId(userId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sessions: database not available");
    return [];
  }
  try {
    const sessions = await db.select().from(userSessions).where(and2(eq(userSessions.userId, userId), eq(userSessions.isActive, 1)));
    return sessions;
  } catch (error) {
    console.error("[Database] Failed to get sessions:", error);
    return [];
  }
}
async function logoutUserSession(sessionId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot logout session: database not available");
    return;
  }
  try {
    await db.update(userSessions).set({ isActive: 0, logoutAt: /* @__PURE__ */ new Date() }).where(eq(userSessions.id, sessionId));
  } catch (error) {
    console.error("[Database] Failed to logout session:", error);
  }
}
async function hasActiveSession(userId) {
  const sessions = await getActiveSessionsByUserId(userId);
  return sessions.length > 0;
}
async function forceLogoutAllSessions(userId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot force logout: database not available");
    return;
  }
  try {
    await db.update(userSessions).set({ isActive: 0, logoutAt: /* @__PURE__ */ new Date() }).where(eq(userSessions.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to force logout:", error);
  }
}
async function addInvitedUser(email, name, role = "user", invitedBy, notes) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(invitedUsers).values({
    email,
    name,
    role,
    invitedBy,
    notes,
    status: "pending"
  });
  return result;
}
async function getAllInvitedUsers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(invitedUsers).orderBy(desc(invitedUsers.invitedAt));
}
async function getInvitedUserByEmail(email) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(invitedUsers).where(eq(invitedUsers.email, email));
  return result[0];
}
async function updateInvitedUser(id, updates) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(invitedUsers).set(updates).where(eq(invitedUsers.id, id));
  return getInvitedUserById(id);
}
async function getInvitedUserById(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(invitedUsers).where(eq(invitedUsers.id, id));
  return result[0];
}
async function deleteInvitedUser(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(invitedUsers).where(eq(invitedUsers.id, id));
  return true;
}
async function isEmailInvited(email) {
  const invited = await getInvitedUserByEmail(email);
  return !!invited;
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    _db = null;
  }
});

// server/_core/index.ts
import "dotenv/config";
import express3 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/oauth.ts
init_db();

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
  statusCode;
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  client;
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
      const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
      const taskUid = userInfo.taskUid ?? null;
      if (!taskUid) {
        throw ForbiddenError("Cron session missing task_uid");
      }
      return buildCronUser(userInfo);
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || "User",
          email: userInfo.email || "",
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? "email",
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      name: user.name,
      email: user.email,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var CRON_OPEN_ID_PREFIX = "cron_";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: userInfo.email || "",
    loginMethod: "email",
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      const userEmail = userInfo.email || "";
      let invitedUser = null;
      if (userEmail) {
        invitedUser = await getInvitedUserByEmail(userEmail);
        if (!invitedUser) {
          res.status(403).json({ error: "\u60A8\u7684\u90F5\u7BB1\u672A\u88AB\u9080\u8ACB\uFF0C\u7121\u6CD5\u8A2A\u554F\u6B64\u7CFB\u7D71" });
          return;
        }
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || "User",
        email: userInfo.email || "",
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? "email",
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      if (invitedUser) {
        await updateInvitedUser(invitedUser.id, { status: "accepted" });
      }
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/storageProxy.ts
init_env();
function registerStorageProxy(app) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/routers.ts
import { z as z10 } from "zod";

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
init_db();
init_db();
init_schema();

// server/sync-handler.ts
init_db();
var SYNC_API_KEY = process.env.SYNC_API_KEY || "meishu-qa-sync-key-2026";
var SYNC_TARGET_URL = process.env.SYNC_TARGET_URL || "";
async function syncToRemote(operation, table, data, keyField, keyValue) {
  if (!SYNC_TARGET_URL) {
    console.log("[SYNC] \u672A\u8A2D\u5B9A SYNC_TARGET_URL\uFF0C\u8DF3\u904E\u540C\u6B65");
    return;
  }
  try {
    const response = await fetch(`${SYNC_TARGET_URL}/api/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sync-Source": "community-management",
        "X-Sync-Api-Key": SYNC_API_KEY
      },
      body: JSON.stringify({
        operation,
        table,
        data,
        keyField,
        keyValue,
        sourceSystem: "community-management",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }),
      signal: AbortSignal.timeout(1e4)
      // 10秒超時
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[SYNC] \u540C\u6B65\u5931\u6557: ${table} ${operation} - ${response.status}: ${errorText}`);
    } else {
      console.log(`[SYNC] \u540C\u6B65\u6210\u529F: ${table} ${operation} (keyField=${keyField}, keyValue=${keyValue})`);
    }
  } catch (error) {
    console.warn(`[SYNC] \u540C\u6B65\u8ACB\u6C42\u7570\u5E38: ${table} ${operation} - ${error instanceof Error ? error.message : String(error)}`);
  }
}
async function handleSyncRequest(req) {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }
  try {
    switch (req.table) {
      case "residents":
        return await syncResident(db, req);
      case "emergency_contacts":
        return await syncEmergencyContact(db, req);
      case "repair_requests":
        return await syncRepairRequest(db, req);
      case "renovation_applications":
        return await syncRenovationApplication(db, req);
      case "resource_folders":
        return await syncResourceFolder(db, req);
      case "resource_files":
        return await syncResourceFile(db, req);
      case "invited_users":
        return await syncInvitedUser(db, req);
      case "parkings":
        return await syncParking(db, req);
      case "parking_plates":
        return await syncParkingPlate(db, req);
      default:
        return { success: false, message: `Unknown table: ${req.table}` };
    }
  } catch (error) {
    console.error(`[SYNC] \u8655\u7406\u540C\u6B65\u8ACB\u6C42\u5931\u6557: ${req.table} ${req.operation}`, error);
    return { success: false, message: `Internal error: ${error instanceof Error ? error.message : String(error)}` };
  }
}
async function syncResident(db, req) {
  const { residents: residents2, coResidents: coResidents2, emergencyContacts: emergencyContacts2, parkings: parkings2, parkingPlates: parkingPlates2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5, and: and3 } = await import("drizzle-orm");
  const unitNumber = req.data.unitNumber;
  if (!unitNumber) {
    return { success: false, message: "Missing unitNumber" };
  }
  const existing = await db.select().from(residents2).where(eq5(residents2.unitNumber, unitNumber)).limit(1);
  const existingRecord = existing[0] || null;
  const newData = req.data;
  if (existingRecord && existingRecord.updatedAt && newData.updatedAt) {
    const localTime = new Date(existingRecord.updatedAt).getTime();
    const remoteTime = new Date(newData.updatedAt).getTime();
    if (localTime >= remoteTime) {
      console.log(`[SYNC] \u4F4F\u6236 ${unitNumber} \u672C\u5730\u8CC7\u6599\u8F03\u65B0\uFF0C\u8DF3\u904E\u540C\u6B65`);
      return { success: true, message: "Skipped - local data is newer", action: "skipped" };
    }
  }
  const residentData = { ...newData };
  delete residentData.emergencyContacts;
  delete residentData.coResidents;
  delete residentData.parkings;
  delete residentData.id;
  if (req.operation === "delete") {
    if (existingRecord) {
      const residentParkings = await db.select({ id: parkings2.id }).from(parkings2).where(eq5(parkings2.residentId, existingRecord.id));
      for (const p of residentParkings) {
        await db.delete(parkingPlates2).where(eq5(parkingPlates2.parkingId, p.id));
      }
      await db.delete(parkings2).where(eq5(parkings2.residentId, existingRecord.id));
      await db.delete(emergencyContacts2).where(eq5(emergencyContacts2.residentId, existingRecord.id));
      await db.delete(coResidents2).where(eq5(coResidents2.residentId, existingRecord.id));
      await db.delete(residents2).where(eq5(residents2.id, existingRecord.id));
    }
    return { success: true, message: "Resident deleted", action: "deleted" };
  }
  if (existingRecord) {
    await db.update(residents2).set(residentData).where(eq5(residents2.id, existingRecord.id));
    if (newData.emergencyContacts) {
      await db.delete(emergencyContacts2).where(eq5(emergencyContacts2.residentId, existingRecord.id));
      for (const contact of newData.emergencyContacts) {
        await db.insert(emergencyContacts2).values({
          residentId: existingRecord.id,
          name: contact.name,
          phone: contact.phone || null,
          relationship: contact.relation || null,
          address: contact.address || null
        });
      }
    }
    return { success: true, message: "Resident updated", action: "updated" };
  } else {
    const insertResult = await db.insert(residents2).values(residentData);
    const insertedId = insertResult?.[0]?.insertId || insertResult?.insertId;
    if (newData.emergencyContacts && insertedId) {
      for (const contact of newData.emergencyContacts) {
        if (contact.name) {
          await db.insert(emergencyContacts2).values({
            residentId: insertedId,
            name: contact.name,
            phone: contact.phone || null,
            relationship: contact.relation || null,
            address: contact.address || null
          });
        }
      }
    }
    return { success: true, message: "Resident inserted", action: "inserted" };
  }
}
async function syncEmergencyContact(db, req) {
  const { emergencyContacts: emergencyContacts2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5 } = await import("drizzle-orm");
  if (req.operation === "delete") {
    await db.delete(emergencyContacts2).where(eq5(emergencyContacts2.id, req.keyValue));
    return { success: true, message: "Emergency contact deleted", action: "deleted" };
  }
  const existing = await db.select().from(emergencyContacts2).where(
    and(
      eq5(emergencyContacts2.residentId, req.data.residentId),
      eq5(emergencyContacts2.name, req.data.name)
    )
  ).limit(1);
  const data = { ...req.data };
  delete data.id;
  if (existing[0]) {
    await db.update(emergencyContacts2).set(data).where(eq5(emergencyContacts2.id, existing[0].id));
    return { success: true, message: "Emergency contact updated", action: "updated" };
  } else {
    await db.insert(emergencyContacts2).values(data);
    return { success: true, message: "Emergency contact inserted", action: "inserted" };
  }
}
async function syncRepairRequest(db, req) {
  const { repairRequests: repairRequests2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5 } = await import("drizzle-orm");
  if (req.operation === "delete") {
    await db.delete(repairRequests2).where(eq5(repairRequests2.id, req.keyValue));
    return { success: true, message: "Repair request deleted", action: "deleted" };
  }
  const data = { ...req.data };
  delete data.id;
  const existing = await db.select().from(repairRequests2).where(eq5(repairRequests2.id, req.keyValue)).limit(1);
  if (existing[0]) {
    await db.update(repairRequests2).set(data).where(eq5(repairRequests2.id, existing[0].id));
    return { success: true, message: "Repair request updated", action: "updated" };
  } else {
    await db.insert(repairRequests2).values(data);
    return { success: true, message: "Repair request inserted", action: "inserted" };
  }
}
async function syncRenovationApplication(db, req) {
  const { renovationApplications: renovationApplications2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5 } = await import("drizzle-orm");
  if (req.operation === "delete") {
    await db.delete(renovationApplications2).where(eq5(renovationApplications2.id, req.keyValue));
    return { success: true, message: "Renovation application deleted", action: "deleted" };
  }
  const data = { ...req.data };
  delete data.id;
  const existing = await db.select().from(renovationApplications2).where(eq5(renovationApplications2.id, req.keyValue)).limit(1);
  if (existing[0]) {
    await db.update(renovationApplications2).set(data).where(eq5(renovationApplications2.id, existing[0].id));
    return { success: true, message: "Renovation application updated", action: "updated" };
  } else {
    await db.insert(renovationApplications2).values(data);
    return { success: true, message: "Renovation application inserted", action: "inserted" };
  }
}
async function syncResourceFolder(db, req) {
  const { resourceFolders: resourceFolders2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5 } = await import("drizzle-orm");
  if (req.operation === "delete") {
    await db.delete(resourceFolders2).where(eq5(resourceFolders2.id, req.keyValue));
    return { success: true, message: "Resource folder deleted", action: "deleted" };
  }
  const data = { ...req.data };
  delete data.id;
  const existing = await db.select().from(resourceFolders2).where(eq5(resourceFolders2.id, req.keyValue)).limit(1);
  if (existing[0]) {
    await db.update(resourceFolders2).set(data).where(eq5(resourceFolders2.id, existing[0].id));
    return { success: true, message: "Resource folder updated", action: "updated" };
  } else {
    await db.insert(resourceFolders2).values(data);
    return { success: true, message: "Resource folder inserted", action: "inserted" };
  }
}
async function syncResourceFile(db, req) {
  const { resourceFiles: resourceFiles2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5 } = await import("drizzle-orm");
  if (req.operation === "delete") {
    await db.delete(resourceFiles2).where(eq5(resourceFiles2.id, req.keyValue));
    return { success: true, message: "Resource file deleted", action: "deleted" };
  }
  const data = { ...req.data };
  delete data.id;
  const existing = await db.select().from(resourceFiles2).where(eq5(resourceFiles2.id, req.keyValue)).limit(1);
  if (existing[0]) {
    await db.update(resourceFiles2).set(data).where(eq5(resourceFiles2.id, existing[0].id));
    return { success: true, message: "Resource file updated", action: "updated" };
  } else {
    await db.insert(resourceFiles2).values(data);
    return { success: true, message: "Resource file inserted", action: "inserted" };
  }
}
async function syncInvitedUser(db, req) {
  const { invitedUsers: invitedUsers2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5 } = await import("drizzle-orm");
  if (req.operation === "delete") {
    await db.delete(invitedUsers2).where(eq5(invitedUsers2.id, req.keyValue));
    return { success: true, message: "Invited user deleted", action: "deleted" };
  }
  const data = { ...req.data };
  delete data.id;
  if (data.email) {
    const existing = await db.select().from(invitedUsers2).where(eq5(invitedUsers2.email, data.email)).limit(1);
    if (existing[0]) {
      await db.update(invitedUsers2).set(data).where(eq5(invitedUsers2.id, existing[0].id));
      return { success: true, message: "Invited user updated", action: "updated" };
    }
  }
  await db.insert(invitedUsers2).values(data);
  return { success: true, message: "Invited user inserted", action: "inserted" };
}
async function syncParking(db, req) {
  const { parkings: parkings2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5 } = await import("drizzle-orm");
  if (req.operation === "delete") {
    await db.delete(parkings2).where(eq5(parkings2.id, req.keyValue));
    return { success: true, message: "Parking deleted", action: "deleted" };
  }
  const data = { ...req.data };
  delete data.id;
  const existing = await db.select().from(parkings2).where(eq5(parkings2.id, req.keyValue)).limit(1);
  if (existing[0]) {
    await db.update(parkings2).set(data).where(eq5(parkings2.id, existing[0].id));
    return { success: true, message: "Parking updated", action: "updated" };
  } else {
    await db.insert(parkings2).values(data);
    return { success: true, message: "Parking inserted", action: "inserted" };
  }
}
async function syncParkingPlate(db, req) {
  const { parkingPlates: parkingPlates2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
  const { eq: eq5 } = await import("drizzle-orm");
  if (req.operation === "delete") {
    await db.delete(parkingPlates2).where(eq5(parkingPlates2.id, req.keyValue));
    return { success: true, message: "Parking plate deleted", action: "deleted" };
  }
  const data = { ...req.data };
  delete data.id;
  const existing = await db.select().from(parkingPlates2).where(eq5(parkingPlates2.id, req.keyValue)).limit(1);
  if (existing[0]) {
    await db.update(parkingPlates2).set(data).where(eq5(parkingPlates2.id, existing[0].id));
    return { success: true, message: "Parking plate updated", action: "updated" };
  } else {
    await db.insert(parkingPlates2).values(data);
    return { success: true, message: "Parking plate inserted", action: "inserted" };
  }
}

// server/auth-routes.ts
import { z as z2 } from "zod";

// server/password-auth.ts
init_db();
init_schema();
import bcrypt from "bcryptjs";
import { eq as eq2 } from "drizzle-orm";
async function authenticatePasswordUser(username, password) {
  try {
    const db = await getDb();
    if (!db) return null;
    const userResult = await db.select().from(users).where(eq2(users.name, username)).limit(1);
    const user = userResult[0];
    if (!user) {
      return null;
    }
    const passwordResult = await db.select().from(passwordUsers).where(eq2(passwordUsers.userId, user.id)).limit(1);
    const passwordRecord = passwordResult[0];
    if (!passwordRecord) {
      return null;
    }
    const isValid = await bcrypt.compare(password, passwordRecord.passwordHash);
    if (!isValid) {
      return null;
    }
    return {
      id: user.id,
      username: user.name,
      name: user.name,
      email: user.email,
      role: user.role || "user",
      isActive: true
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
async function registerPasswordUser(username, password, name, email, role = "user") {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const existingResult = await db.select().from(users).where(eq2(users.name, username)).limit(1);
    if (existingResult.length > 0) {
      throw new Error("\u4F7F\u7528\u8005\u540D\u7A31\u5DF2\u88AB\u4F7F\u7528");
    }
    const now = /* @__PURE__ */ new Date();
    const openId = `password_${username}_${Date.now()}`;
    await db.insert(users).values({
      openId,
      name: username,
      email,
      role,
      loginMethod: "password",
      createdAt: now,
      updatedAt: now,
      lastSignedIn: now
    });
    const newUserResult = await db.select().from(users).where(eq2(users.name, username)).limit(1);
    const newUser = newUserResult[0];
    if (!newUser) {
      throw new Error("Failed to create user");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(passwordUsers).values({
      userId: newUser.id,
      passwordHash,
      createdAt: now,
      updatedAt: now
    });
    return {
      id: newUser.id,
      username: newUser.name,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || "user",
      isActive: true
    };
  } catch (error) {
    throw new Error(error.message || "\u8A3B\u518A\u5931\u6557");
  }
}
async function getPasswordUser(userId) {
  try {
    const db = await getDb();
    if (!db) return null;
    const userResult = await db.select().from(users).where(eq2(users.id, userId)).limit(1);
    const user = userResult[0];
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.name,
      name: user.name,
      email: user.email,
      role: user.role || "user",
      isActive: true
    };
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}
async function getAllPasswordUsers() {
  try {
    const db = await getDb();
    if (!db) return [];
    const userResults = await db.select().from(users);
    return userResults.map((user) => ({
      id: user.id,
      username: user.name,
      name: user.name,
      email: user.email,
      role: user.role || "user",
      isActive: true
    }));
  } catch (error) {
    console.error("Get all users error:", error);
    return [];
  }
}
async function updatePasswordUser(userId, updates) {
  try {
    const db = await getDb();
    if (!db) return null;
    const now = /* @__PURE__ */ new Date();
    const updateData = { updatedAt: now };
    if (updates.name) updateData.name = updates.name;
    if (updates.email) updateData.email = updates.email;
    if (updates.role) updateData.role = updates.role;
    await db.update(users).set(updateData).where(eq2(users.id, userId));
    if (updates.password) {
      const passwordHash = await bcrypt.hash(updates.password, 10);
      await db.update(passwordUsers).set({ passwordHash, updatedAt: now }).where(eq2(passwordUsers.userId, userId));
    }
    return getPasswordUser(userId);
  } catch (error) {
    console.error("Update user error:", error);
    return null;
  }
}
async function deletePasswordUser(userId) {
  try {
    const db = await getDb();
    if (!db) return false;
    await db.delete(passwordUsers).where(eq2(passwordUsers.userId, userId));
    await db.delete(users).where(eq2(users.id, userId));
    return true;
  } catch (error) {
    console.error("Delete user error:", error);
    return false;
  }
}
async function initializeDemoUsers() {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const adminResult = await db.select().from(users).where(eq2(users.name, "admin")).limit(1);
    if (adminResult.length === 0) {
      await registerPasswordUser(
        "admin",
        "admin123",
        "\u7BA1\u7406\u54E1",
        "admin@example.com",
        "admin"
      );
      console.log("[Password Auth] Admin user initialized");
    }
    const userResult = await db.select().from(users).where(eq2(users.name, "user")).limit(1);
    if (userResult.length === 0) {
      await registerPasswordUser(
        "user",
        "user123",
        "\u4E00\u822C\u4F7F\u7528\u8005",
        "user@example.com",
        "user"
      );
      console.log("[Password Auth] User user initialized");
    }
    console.log("[Password Auth] Demo users initialized successfully");
    return { success: true };
  } catch (error) {
    console.error("Initialize demo users error:", error);
    throw new Error(error.message || "\u521D\u59CB\u5316\u5931\u6557");
  }
}

// server/auth-routes.ts
var passwordAuthRouter = router({
  /**
   * 帳密登入
   * 返回使用者資訊和 session token
   */
  login: publicProcedure.input(
    z2.object({
      username: z2.string().min(3, "\u4F7F\u7528\u8005\u540D\u7A31\u81F3\u5C11 3 \u500B\u5B57\u7B26"),
      password: z2.string().min(1, "\u5BC6\u78BC\u4E0D\u80FD\u70BA\u7A7A")
    })
  ).mutation(async ({ input }) => {
    const user = await authenticatePasswordUser(input.username, input.password);
    if (!user) {
      throw new Error("\u4F7F\u7528\u8005\u540D\u7A31\u6216\u5BC6\u78BC\u932F\u8AA4");
    }
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };
  }),
  /**
   * 帳密註冊（僅管理者可用）
   */
  register: publicProcedure.input(
    z2.object({
      username: z2.string().min(3, "\u4F7F\u7528\u8005\u540D\u7A31\u81F3\u5C11 3 \u500B\u5B57\u7B26"),
      password: z2.string().min(6, "\u5BC6\u78BC\u81F3\u5C11 6 \u500B\u5B57\u7B26"),
      name: z2.string().min(1, "\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A"),
      role: z2.enum(["admin", "user"]).optional().default("user")
    })
  ).mutation(async ({ input }) => {
    try {
      const user = await registerPasswordUser(
        input.username,
        input.password,
        input.name,
        input.username + "@example.com",
        input.role
      );
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      };
    } catch (error) {
      throw new Error(error.message || "\u8A3B\u518A\u5931\u6557");
    }
  }),
  /**
   * 驗證 session token
   */
  verify: publicProcedure.input(z2.object({ token: z2.string() })).query(async ({ input }) => {
    const user = await getPasswordUser(parseInt(input.token));
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };
  }),
  /**
   * 初始化示例使用者（開發用）
   */
  initDemo: publicProcedure.mutation(async () => {
    try {
      await initializeDemoUsers();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  })
});

// server/password-user-routes.ts
import { z as z3 } from "zod";
var passwordUserManagementRouter = router({
  /**
   * 列出所有帳密使用者
   */
  list: adminProcedure.query(async () => {
    const users2 = await getAllPasswordUsers();
    return users2.map((user) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    }));
  }),
  /**
   * 建立新的帳密使用者
   */
  create: adminProcedure.input(
    z3.object({
      username: z3.string().min(3, "\u4F7F\u7528\u8005\u540D\u7A31\u81F3\u5C11 3 \u500B\u5B57\u7B26"),
      password: z3.string().min(6, "\u5BC6\u78BC\u81F3\u5C11 6 \u500B\u5B57\u7B26"),
      name: z3.string().min(1, "\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A"),
      role: z3.enum(["admin", "user"]).default("user")
    })
  ).mutation(async ({ input }) => {
    try {
      const user = await registerPasswordUser(
        input.username,
        input.password,
        input.name,
        input.username + "@example.com",
        input.role
      );
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      };
    } catch (error) {
      throw new Error(error.message || "\u5EFA\u7ACB\u4F7F\u7528\u8005\u5931\u6557");
    }
  }),
  /**
   * 更新帳密使用者（名稱、角色、密碼）
   */
  update: adminProcedure.input(
    z3.object({
      id: z3.string(),
      name: z3.string().optional(),
      role: z3.enum(["admin", "user"]).optional(),
      password: z3.string().min(6).optional()
    })
  ).mutation(async ({ input }) => {
    const updates = {};
    if (input.name) updates.name = input.name;
    if (input.role) updates.role = input.role;
    if (input.password) updates.password = input.password;
    const updated = await updatePasswordUser(parseInt(input.id), updates);
    if (!updated) {
      throw new Error("\u4F7F\u7528\u8005\u4E0D\u5B58\u5728");
    }
    return {
      id: updated.id,
      username: updated.username,
      name: updated.name,
      role: updated.role
    };
  }),
  /**
   * 刪除帳密使用者
   */
  delete: adminProcedure.input(z3.object({ id: z3.string() })).mutation(async ({ input }) => {
    const deleted = await deletePasswordUser(parseInt(input.id));
    if (!deleted) {
      throw new Error("\u4F7F\u7528\u8005\u4E0D\u5B58\u5728");
    }
    return { success: true };
  }),
  /**
   * 取得單個帳密使用者
   */
  getById: adminProcedure.input(z3.object({ id: z3.string() })).query(async ({ input }) => {
    const user = await getPasswordUser(parseInt(input.id));
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };
  }),
  /**
   * 初始化 10 個預設帳密使用者
   */
  initializeDefaultUsers: adminProcedure.mutation(async () => {
    const defaultUsers = [
      { username: "admin", password: "admin123", name: "\u7BA1\u7406\u54E1", email: "admin@example.com", role: "admin" },
      { username: "user1", password: "user123", name: "\u4F7F\u7528\u80051", email: "user1@example.com", role: "user" },
      { username: "user2", password: "user123", name: "\u4F7F\u7528\u80052", email: "user2@example.com", role: "user" },
      { username: "user3", password: "user123", name: "\u4F7F\u7528\u80053", email: "user3@example.com", role: "user" },
      { username: "user4", password: "user123", name: "\u4F7F\u7528\u80054", email: "user4@example.com", role: "user" },
      { username: "user5", password: "user123", name: "\u4F7F\u7528\u80055", email: "user5@example.com", role: "user" },
      { username: "user6", password: "user123", name: "\u4F7F\u7528\u80056", email: "user6@example.com", role: "user" },
      { username: "user7", password: "user123", name: "\u4F7F\u7528\u80057", email: "user7@example.com", role: "user" },
      { username: "user8", password: "user123", name: "\u4F7F\u7528\u80058", email: "user8@example.com", role: "user" },
      { username: "user9", password: "user123", name: "\u4F7F\u7528\u80059", email: "user9@example.com", role: "user" }
    ];
    const results = [];
    for (const userData of defaultUsers) {
      try {
        const user = await registerPasswordUser(
          userData.username,
          userData.password,
          userData.name,
          userData.email,
          userData.role
        );
        results.push({ username: userData.username, status: "created", id: user.id });
      } catch (error) {
        results.push({ username: userData.username, status: "error", error: error.message });
      }
    }
    return {
      total: defaultUsers.length,
      results
    };
  })
});

// server/audit-log-routes.ts
import { z as z4 } from "zod";

// server/audit-log.ts
import fs from "fs";
import path from "path";
var LOG_DIR = path.join(process.cwd(), ".audit-logs");
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}
function logAuditEvent(entry) {
  ensureLogDir();
  const logFile = path.join(LOG_DIR, `audit-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.jsonl`);
  const logLine = JSON.stringify(entry) + "\n";
  try {
    fs.appendFileSync(logFile, logLine, "utf-8");
  } catch (error) {
    console.error("[AuditLog] Failed to write audit log:", error);
  }
}
function readAuditLogs(options) {
  ensureLogDir();
  const logs = [];
  const files = fs.readdirSync(LOG_DIR).sort().reverse();
  for (const file of files) {
    if (!file.endsWith(".jsonl")) continue;
    const filePath = path.join(LOG_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n").filter((line) => line.trim());
    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (options?.startDate && new Date(entry.timestamp) < options.startDate) {
          continue;
        }
        if (options?.endDate && new Date(entry.timestamp) > options.endDate) {
          continue;
        }
        if (options?.userId && entry.userId !== options.userId) {
          continue;
        }
        if (options?.entity && entry.entity !== options.entity) {
          continue;
        }
        logs.push(entry);
        if (options?.limit && logs.length >= options.limit) {
          return logs;
        }
      } catch (error) {
        console.error("[AuditLog] Failed to parse log line:", error);
      }
    }
  }
  return logs;
}
function calculateChanges(before, after) {
  const changes = {};
  if (!before && after) {
    for (const key in after) {
      changes[key] = { after: after[key] };
    }
  } else if (before && !after) {
    for (const key in before) {
      changes[key] = { before: before[key] };
    }
  } else if (before && after) {
    for (const key in after) {
      if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
        changes[key] = { before: before[key], after: after[key] };
      }
    }
  }
  return changes;
}

// server/audit-log-routes.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
function requireAdmin(ctx) {
  if (!ctx.user) {
    throw new TRPCError3({
      code: "UNAUTHORIZED",
      message: "\u672A\u767B\u5165"
    });
  }
  if (ctx.user.role !== "admin") {
    throw new TRPCError3({
      code: "FORBIDDEN",
      message: "\u9700\u8981\u7BA1\u7406\u54E1\u6B0A\u9650"
    });
  }
  return ctx.user;
}
var auditLogRouter = router({
  /**
   * 查詢操作日誌
   */
  list: protectedProcedure.input(
    z4.object({
      startDate: z4.string().optional(),
      endDate: z4.string().optional(),
      userId: z4.number().optional(),
      entity: z4.enum(["resident", "repair_request", "user"]).optional(),
      action: z4.enum(["CREATE", "UPDATE", "DELETE"]).optional(),
      sortBy: z4.enum(["timestamp", "userId", "action", "entity"]).default("timestamp"),
      sortOrder: z4.enum(["asc", "desc"]).default("desc"),
      limit: z4.number().default(100)
    })
  ).query(({ ctx, input }) => {
    requireAdmin(ctx);
    let logs = readAuditLogs({
      startDate: input.startDate ? new Date(input.startDate) : void 0,
      endDate: input.endDate ? new Date(input.endDate) : void 0,
      userId: input.userId,
      entity: input.entity,
      limit: input.limit * 2
      // 先讀取更多紀錄以便排序
    });
    if (input.action) {
      logs = logs.filter((log) => log.action === input.action);
    }
    logs.sort((a, b) => {
      let aVal = a[input.sortBy];
      let bVal = b[input.sortBy];
      if (input.sortBy === "timestamp") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (aVal < bVal) return input.sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return input.sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return logs.slice(0, input.limit);
  }),
  /**
   * 查詢特定使用者的操作日誌
   */
  byUser: protectedProcedure.input(z4.object({ userId: z4.number(), limit: z4.number().default(50) })).query(({ ctx, input }) => {
    requireAdmin(ctx);
    const logs = readAuditLogs({
      userId: input.userId,
      limit: input.limit
    });
    return logs;
  }),
  /**
   * 查詢特定實體的操作日誌
   */
  byEntity: protectedProcedure.input(
    z4.object({
      entity: z4.enum(["resident", "repair_request", "user"]),
      limit: z4.number().default(50)
    })
  ).query(({ ctx, input }) => {
    requireAdmin(ctx);
    const logs = readAuditLogs({
      entity: input.entity,
      limit: input.limit
    });
    return logs;
  })
});

// server/repair-requests-routes.ts
import { z as z5 } from "zod";
init_db();
var repairRequestInput = z5.object({
  unitNumber: z5.string().min(1, "\u6236\u865F\u70BA\u5FC5\u586B"),
  description: z5.string().min(1, "\u63CF\u8FF0\u70BA\u5FC5\u586B"),
  status: z5.enum(["pending", "in_progress", "completed", "cancelled", "resident_self_repair"]).default("pending"),
  repairDate: z5.string().optional(),
  completionDate: z5.string().optional().nullable(),
  notes: z5.string().optional().nullable()
});
var repairRequestsWithAuditRouter = router({
  list: protectedProcedure.input(
    z5.object({
      status: z5.string().optional()
    })
  ).query(({ ctx, input }) => {
    return listRepairRequests({ status: input.status });
  }),
  get: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ ctx, input }) => {
    return getRepairRequestById(input.id);
  }),
  create: protectedProcedure.input(repairRequestInput).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const result = await createRepairRequest({
      ...input,
      repairDate: input.repairDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 16)
    });
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: user.id,
      userName: user.name || user.email || "Unknown",
      action: "CREATE",
      entity: "repair_request",
      entityId: result.id,
      changes: calculateChanges(null, input)
    });
    syncToRemote("create", "repair_requests", {
      ...input,
      id: result.id
    }, "id", result.id).catch(() => {
    });
    return result;
  }),
  update: protectedProcedure.input(z5.object({ id: z5.number(), unitNumber: z5.string().min(1), description: z5.string().min(1), status: z5.enum(["pending", "in_progress", "completed", "cancelled", "resident_self_repair"]).optional(), repairDate: z5.string().optional(), completionDate: z5.string().optional().nullable(), notes: z5.string().optional().nullable() })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const before = await getRepairRequestById(input.id);
    const { id, ...updateData } = input;
    const result = await updateRepairRequest(id, updateData);
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: user.id,
      userName: user.name || user.email || "Unknown",
      action: "UPDATE",
      entity: "repair_request",
      entityId: id,
      changes: calculateChanges(before || null, result)
    });
    syncToRemote("update", "repair_requests", {
      ...input,
      id
    }, "id", id).catch(() => {
    });
    return result;
  }),
  delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const before = await getRepairRequestById(input.id);
    await deleteRepairRequest(input.id);
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: user.id,
      userName: user.name || user.email || "Unknown",
      action: "DELETE",
      entity: "repair_request",
      entityId: input.id,
      changes: calculateChanges(before || null, null)
    });
    if (before) {
      syncToRemote("delete", "repair_requests", before, "id", input.id).catch(() => {
      });
    }
    return { success: true };
  })
});

// server/residents-routes.ts
import { z as z6 } from "zod";
init_db();
var emergencyContactInput = z6.object({
  id: z6.number().optional(),
  name: z6.string().min(1, "\u7DCA\u6025\u806F\u7D61\u4EBA\u59D3\u540D\u70BA\u5FC5\u586B"),
  phone: z6.string().optional().nullable(),
  relation: z6.string().optional().nullable(),
  address: z6.string().optional().nullable()
});
var residentInput = z6.object({
  unitNumber: z6.string().min(1, "\u6236\u865F\u70BA\u5FC5\u586B"),
  ownerName: z6.string().min(1, "\u5340\u6B0A\u4EBA\u59D3\u540D\u70BA\u5FC5\u586B"),
  ownerPhone: z6.string().optional().nullable(),
  coResident1Name: z6.string().optional().nullable(),
  coResident1Phone: z6.string().optional().nullable(),
  coResident2Name: z6.string().optional().nullable(),
  coResident2Phone: z6.string().optional().nullable(),
  coResident3Name: z6.string().optional().nullable(),
  coResident3Phone: z6.string().optional().nullable(),
  coResident4Name: z6.string().optional().nullable(),
  coResident4Phone: z6.string().optional().nullable(),
  carParkingNumber: z6.string().optional().nullable(),
  carPlateNumber: z6.string().optional().nullable(),
  motorcycleParkingNumber: z6.string().optional().nullable(),
  motorcyclePlateNumber: z6.string().optional().nullable(),
  bicycleParkingNumber: z6.string().optional().nullable(),
  address: z6.string().optional().nullable(),
  emergencyContactName: z6.string().optional().nullable(),
  emergencyContactPhone: z6.string().optional().nullable(),
  emergencyContactRelation: z6.string().optional().nullable(),
  emergencyContactAddress: z6.string().optional().nullable(),
  emergencyContact2Name: z6.string().optional().nullable(),
  emergencyContact2Phone: z6.string().optional().nullable(),
  emergencyContact2Relation: z6.string().optional().nullable(),
  emergencyContact2Address: z6.string().optional().nullable(),
  squareMeters: z6.string().optional().nullable(),
  waterMeterNumber: z6.string().optional().nullable(),
  electricityMeterNumber: z6.string().optional().nullable(),
  moveInDate: z6.string().optional().nullable(),
  notes: z6.string().optional().nullable(),
  emergencyContacts: z6.array(emergencyContactInput).optional()
});
var residentsWithAuditRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      const residents2 = await listResidents();
      console.log(`[DEBUG] list: Found ${residents2.length} residents`);
      return residents2;
    } catch (err) {
      console.error("[ERROR] list procedure failed:", err);
      throw err;
    }
  }),
  get: protectedProcedure.input(z6.object({ id: z6.number() })).query(async ({ ctx, input }) => {
    try {
      console.log("[DEBUG] residents.get: Fetching resident", input.id);
      const resident = await getResidentById(input.id);
      if (!resident) return null;
      const emergencyContacts2 = await getEmergencyContactsByResidentId(input.id);
      console.log("[DEBUG] residents.get: Returning resident with emergencyContacts:", emergencyContacts2?.length || 0);
      return {
        ...resident,
        emergencyContacts: emergencyContacts2 || []
      };
    } catch (err) {
      console.error("[ERROR] get procedure failed:", err);
      throw err;
    }
  }),
  create: protectedProcedure.input(residentInput).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const { emergencyContacts: emergencyContactsInput, ...residentData } = input;
    const result = await createResident(residentData);
    const residentId = result?.insertId || result?.[0]?.insertId || result.id;
    if (!residentId) {
      throw new Error("Failed to create resident: no ID returned");
    }
    if (emergencyContactsInput && emergencyContactsInput.length > 0) {
      for (const contact of emergencyContactsInput) {
        if (contact.name) {
          await createEmergencyContact({
            residentId,
            name: contact.name,
            phone: contact.phone || null,
            relationship: contact.relation || null,
            address: contact.address || null
          });
        }
      }
    }
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: user.id,
      userName: user.name || user.email || "Unknown",
      action: "CREATE",
      entity: "resident",
      entityId: residentId,
      changes: calculateChanges(null, input)
    });
    syncToRemote("create", "residents", {
      ...input,
      id: residentId
    }, "unitNumber", input.unitNumber).catch(() => {
    });
    return result;
  }),
  update: protectedProcedure.input(z6.object({ id: z6.number(), ...residentInput.shape })).mutation(async ({ ctx, input }) => {
    console.log("[DEBUG] update: Called with id:", input.id, "unitNumber:", input.unitNumber);
    const user = ctx.user;
    const before = await getResidentById(input.id);
    const { id, emergencyContacts: emergencyContactsInput, ...updateData } = input;
    const result = await updateResident(id, updateData);
    if (emergencyContactsInput) {
      await deleteEmergencyContactsByResidentId(id);
      for (const contact of emergencyContactsInput) {
        if (contact.name || contact.phone) {
          console.log("[DEBUG] Creating emergency contact for resident", id, ":", contact);
          await createEmergencyContact({
            residentId: id,
            name: contact.name || "N/A",
            phone: contact.phone || null,
            relationship: contact.relation || null,
            address: contact.address || null
          });
        }
      }
    }
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: user.id,
      userName: user.name || user.email || "Unknown",
      action: "UPDATE",
      entity: "resident",
      entityId: id,
      changes: calculateChanges(before || null, result)
    });
    syncToRemote("update", "residents", {
      ...input,
      id
    }, "unitNumber", input.unitNumber).catch(() => {
    });
    console.log("[DEBUG] update: Successfully updated resident:", id);
    return result;
  }),
  delete: protectedProcedure.input(z6.object({ id: z6.number() })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const before = await getResidentById(input.id);
    await deleteEmergencyContactsByResidentId(input.id);
    await deleteResident(input.id);
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: user.id,
      userName: user.name || user.email || "Unknown",
      action: "DELETE",
      entity: "resident",
      entityId: input.id,
      changes: calculateChanges(before || null, null)
    });
    if (before) {
      syncToRemote("delete", "residents", before, "unitNumber", before.unitNumber).catch(() => {
      });
    }
    return { success: true };
  }),
  validateUnitNumber: protectedProcedure.input(z6.object({ unitNumber: z6.string() })).query(({ input }) => {
    const unitNumber = input.unitNumber.trim().toUpperCase();
    const ariMatch = unitNumber.match(/^([A-Z]+)/);
    const mainMatch = unitNumber.match(/(\d+)/);
    const floorMatch = unitNumber.match(/(\d+)([A-Z]?)$/);
    if (!ariMatch || !mainMatch || !floorMatch) {
      return { valid: false, error: "\u6236\u865F\u683C\u5F0F\u4E0D\u6B63\u78BA" };
    }
    const ari = ariMatch[1];
    const mainNum = mainMatch[1];
    const floor = floorMatch[1];
    const floorLetter = floorMatch[2] || "F";
    const validAris = ["A", "B", "E", "S"];
    if (!validAris.includes(ari)) {
      return { valid: false, error: `\u6236\u5225 ${ari} \u4E0D\u5B58\u5728` };
    }
    return { valid: true, ari, mainNum, floor, floorLetter };
  }),
  importBatch: protectedProcedure.input(z6.object({ residents: z6.array(residentInput) })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const results = [];
    for (const residentData of input.residents) {
      try {
        const { emergencyContacts: emergencyContactsInput, ...data } = residentData;
        const result = await createResident(data);
        const residentId = result[0]?.insertId || result.id;
        if (emergencyContactsInput && emergencyContactsInput.length > 0) {
          for (const contact of emergencyContactsInput) {
            if (contact.name) {
              await createEmergencyContact({
                residentId,
                name: contact.name,
                phone: contact.phone || null,
                relationship: contact.relation || null,
                address: contact.address || null
              });
            }
          }
        }
        logAuditEvent({
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          userId: user.id,
          userName: user.name || user.email || "Unknown",
          action: "CREATE",
          entity: "resident",
          entityId: residentId,
          changes: calculateChanges(null, residentData)
        });
        results.push({ success: true, unitNumber: residentData.unitNumber });
        syncToRemote("create", "residents", {
          ...residentData,
          id: residentId
        }, "unitNumber", residentData.unitNumber).catch(() => {
        });
      } catch (error) {
        results.push({
          success: false,
          unitNumber: residentData.unitNumber,
          error: error.message
        });
      }
    }
    return results;
  }),
  clearAll: protectedProcedure.mutation(async ({ ctx }) => {
    const user = ctx.user;
    const residents_list = await listResidents();
    for (const resident of residents_list) {
      await deleteEmergencyContactsByResidentId(resident.id);
      await deleteResident(resident.id);
      logAuditEvent({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        userId: user.id,
        userName: user.name || user.email || "Unknown",
        action: "DELETE",
        entity: "resident",
        entityId: resident.id,
        changes: calculateChanges(resident, null)
      });
    }
    for (const resident of residents_list) {
      syncToRemote("delete", "residents", resident, "unitNumber", resident.unitNumber).catch(() => {
      });
    }
    return { success: true, deletedCount: residents_list.length };
  })
});

// server/account-management-routes.ts
import { TRPCError as TRPCError4 } from "@trpc/server";
import { z as z7 } from "zod";
var accountManagementRouter = router({
  // 獲取所有帳密使用者
  listAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError4({ code: "FORBIDDEN" });
    }
    return getAllPasswordUsers();
  }),
  // 建立新帳號
  create: protectedProcedure.input(
    z7.object({
      username: z7.string().min(3),
      password: z7.string().min(6),
      name: z7.string().min(1),
      role: z7.enum(["admin", "user"])
    })
  ).mutation(async ({ input, ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError4({ code: "FORBIDDEN" });
    }
    try {
      const newUser = await registerPasswordUser(
        input.username,
        input.password,
        input.name,
        input.username + "@example.com",
        input.role
      );
      logAuditEvent({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        userId: ctx.user.id,
        userName: ctx.user.name || "Unknown",
        action: "CREATE",
        entity: "user",
        entityId: newUser.id,
        changes: {
          username: { after: newUser.username },
          name: { after: newUser.name },
          role: { after: newUser.role }
        }
      });
      return newUser;
    } catch (error) {
      throw new TRPCError4({
        code: "BAD_REQUEST",
        message: error instanceof Error ? error.message : "\u5EFA\u7ACB\u5E33\u865F\u5931\u6557"
      });
    }
  }),
  // 更新帳號
  update: protectedProcedure.input(
    z7.object({
      id: z7.number(),
      name: z7.string().min(1).optional(),
      role: z7.enum(["admin", "user"]).optional(),
      password: z7.string().min(6).optional().or(z7.literal("")),
      isActive: z7.boolean().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError4({ code: "FORBIDDEN" });
    }
    const user = await getPasswordUser(input.id);
    if (!user) {
      throw new TRPCError4({ code: "NOT_FOUND" });
    }
    const updates = {};
    if (input.name !== void 0) updates.name = input.name;
    if (input.role !== void 0) updates.role = input.role;
    if (input.password !== void 0 && input.password !== "") updates.password = input.password;
    if (input.isActive !== void 0) updates.isActive = input.isActive;
    const updated = await updatePasswordUser(input.id, updates);
    const changeLog = {};
    Object.entries(updates).forEach(([key, value]) => {
      changeLog[key] = { before: user[key], after: value };
    });
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: ctx.user.id,
      userName: ctx.user.name || "Unknown",
      action: "UPDATE",
      entity: "user",
      entityId: input.id,
      changes: changeLog
    });
    return updated;
  }),
  // 停用帳號
  deactivate: protectedProcedure.input(z7.object({ id: z7.number() })).mutation(async ({ input, ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError4({ code: "FORBIDDEN" });
    }
    const user = await getPasswordUser(input.id);
    if (!user) {
      throw new TRPCError4({ code: "NOT_FOUND" });
    }
    const updated = await updatePasswordUser(input.id, { isActive: false });
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: ctx.user.id,
      userName: ctx.user.name || "Unknown",
      action: "UPDATE",
      entity: "user",
      entityId: input.id,
      changes: { isActive: { before: true, after: false } }
    });
    return updated;
  }),
  // 啟用帳號
  activate: protectedProcedure.input(z7.object({ id: z7.number() })).mutation(async ({ input, ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError4({ code: "FORBIDDEN" });
    }
    const user = await getPasswordUser(input.id);
    if (!user) {
      throw new TRPCError4({ code: "NOT_FOUND" });
    }
    const updated = await updatePasswordUser(input.id, { isActive: true });
    logAuditEvent({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: ctx.user.id,
      userName: ctx.user.name || "Unknown",
      action: "UPDATE",
      entity: "user",
      entityId: input.id,
      changes: { isActive: { before: false, after: true } }
    });
    return updated;
  })
});

// server/renovation-applications-routes.ts
import { z as z8 } from "zod";
init_db();
init_schema();
import { eq as eq3 } from "drizzle-orm";
var renovationApplicationsRouter = router({
  list: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(renovationApplications).orderBy(renovationApplications.createdAt);
    return result;
  }),
  getById: protectedProcedure.input(z8.object({ id: z8.number() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(renovationApplications).where(eq3(renovationApplications.id, input.id)).limit(1);
    return result[0] || null;
  }),
  create: protectedProcedure.input(
    z8.object({
      unitNumber: z8.string().min(1),
      applicationDate: z8.string().min(1),
      constructionStartDate: z8.string().optional().nullable(),
      constructionEndDate: z8.string().optional().nullable(),
      constructionContent: z8.string().min(1),
      consentLetterPasted: z8.string().optional().nullable(),
      applicantName: z8.string().min(1),
      applicantPhone: z8.string().min(1),
      registeredBy: z8.string().optional().nullable(),
      status: z8.enum(["pending", "approved", "completed", "rejected"]).default("pending"),
      decorationDeposit: z8.string().optional().nullable(),
      decorationDepositStatus: z8.enum(["notPaid", "paid", "refunded"]).optional().default("notPaid"),
      notes: z8.string().optional().nullable()
    })
  ).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.insert(renovationApplications).values({
      ...input,
      consentLetterPasted: input.consentLetterPasted || null,
      constructionStartDate: input.constructionStartDate || null,
      constructionEndDate: input.constructionEndDate || null,
      registeredBy: input.registeredBy || null,
      decorationDeposit: input.decorationDeposit || null,
      decorationDepositStatus: input.decorationDepositStatus || "notPaid",
      notes: input.notes || null
    });
    const insertId = result?.[0]?.insertId || result?.insertId;
    syncToRemote("create", "renovation_applications", {
      ...input,
      id: insertId
    }, "id", insertId).catch(() => {
    });
    return result;
  }),
  update: protectedProcedure.input(
    z8.object({
      id: z8.number(),
      unitNumber: z8.string().min(1),
      applicationDate: z8.string().min(1),
      constructionStartDate: z8.string().optional().nullable(),
      constructionEndDate: z8.string().optional().nullable(),
      constructionContent: z8.string().min(1),
      consentLetterPasted: z8.string().optional().nullable(),
      applicantName: z8.string().min(1),
      applicantPhone: z8.string().min(1),
      registeredBy: z8.string().optional().nullable(),
      status: z8.enum(["pending", "approved", "completed", "rejected"]),
      decorationDeposit: z8.string().optional().nullable(),
      decorationDepositStatus: z8.enum(["notPaid", "paid", "refunded"]).optional(),
      notes: z8.string().optional().nullable()
    })
  ).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const { id, ...data } = input;
    const result = await db.update(renovationApplications).set({
      ...data,
      consentLetterPasted: data.consentLetterPasted || null,
      constructionStartDate: data.constructionStartDate || null,
      constructionEndDate: data.constructionEndDate || null,
      registeredBy: data.registeredBy || null,
      decorationDeposit: data.decorationDeposit || null,
      decorationDepositStatus: data.decorationDepositStatus || void 0,
      notes: data.notes || null
    }).where(eq3(renovationApplications.id, id));
    syncToRemote("update", "renovation_applications", {
      ...input,
      id: input.id
    }, "id", input.id).catch(() => {
    });
    return result;
  }),
  delete: protectedProcedure.input(z8.object({ id: z8.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.delete(renovationApplications).where(eq3(renovationApplications.id, input.id));
    syncToRemote("delete", "renovation_applications", { id: input.id }, "id", input.id).catch(() => {
    });
    return result;
  })
});

// server/resource-library-routes.ts
import { z as z9 } from "zod";
init_db();
init_schema();
import { eq as eq4, desc as desc2 } from "drizzle-orm";
var resourceLibraryRouter = router({
  // 文件夾操作
  listFolders: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const folders = await db.select().from(resourceFolders).orderBy(desc2(resourceFolders.createdAt));
    return folders;
  }),
  createFolder: protectedProcedure.input(
    z9.object({
      name: z9.string().min(1, "\u6587\u4EF6\u593E\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A"),
      description: z9.string().optional()
    })
  ).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.insert(resourceFolders).values({
      name: input.name,
      description: input.description
    });
    const folderId = result?.[0]?.insertId || result?.insertId;
    syncToRemote("create", "resource_folders", {
      ...input,
      id: folderId
    }, "id", folderId).catch(() => {
    });
    return result;
  }),
  updateFolder: protectedProcedure.input(
    z9.object({
      id: z9.number(),
      name: z9.string().min(1, "\u6587\u4EF6\u593E\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A"),
      description: z9.string().optional()
    })
  ).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.update(resourceFolders).set({
      name: input.name,
      description: input.description
    }).where(eq4(resourceFolders.id, input.id));
    syncToRemote("update", "resource_folders", {
      ...input,
      id: input.id
    }, "id", input.id).catch(() => {
    });
    return result;
  }),
  deleteFolder: protectedProcedure.input(z9.object({ id: z9.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.delete(resourceFolders).where(eq4(resourceFolders.id, input.id));
    syncToRemote("delete", "resource_folders", { id: input.id }, "id", input.id).catch(() => {
    });
    return result;
  }),
  // 檔案操作
  listFiles: protectedProcedure.input(z9.object({ folderId: z9.number() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const files = await db.select().from(resourceFiles).where(eq4(resourceFiles.folderId, input.folderId)).orderBy(desc2(resourceFiles.createdAt));
    return files;
  }),
  createFile: protectedProcedure.input(
    z9.object({
      folderId: z9.number(),
      name: z9.string().min(1, "\u6A94\u6848\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A"),
      fileUrl: z9.string().min(1, "\u6A94\u6848 URL \u4E0D\u80FD\u70BA\u7A7A"),
      fileSize: z9.number().optional(),
      fileType: z9.string().default("pdf")
    })
  ).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.insert(resourceFiles).values({
      folderId: input.folderId,
      name: input.name,
      fileUrl: input.fileUrl,
      fileSize: input.fileSize,
      fileType: input.fileType,
      uploadedBy: ctx.user?.id
    });
    const fileId = result?.[0]?.insertId || result?.insertId;
    syncToRemote("create", "resource_files", {
      ...input,
      id: fileId
    }, "id", fileId).catch(() => {
    });
    return result;
  }),
  updateFile: protectedProcedure.input(
    z9.object({
      id: z9.number(),
      name: z9.string().min(1, "\u6A94\u6848\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A"),
      fileUrl: z9.string().min(1, "\u6A94\u6848 URL \u4E0D\u80FD\u70BA\u7A7A").optional()
    })
  ).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const updateData = {
      name: input.name
    };
    if (input.fileUrl) {
      updateData.fileUrl = input.fileUrl;
    }
    const result = await db.update(resourceFiles).set(updateData).where(eq4(resourceFiles.id, input.id));
    syncToRemote("update", "resource_files", {
      ...input,
      id: input.id
    }, "id", input.id).catch(() => {
    });
    return result;
  }),
  deleteFile: protectedProcedure.input(z9.object({ id: z9.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.delete(resourceFiles).where(eq4(resourceFiles.id, input.id));
    syncToRemote("delete", "resource_files", { id: input.id }, "id", input.id).catch(() => {
    });
    return result;
  }),
  // 獲取檔案詳情
  getFile: protectedProcedure.input(z9.object({ id: z9.number() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const file = await db.select().from(resourceFiles).where(eq4(resourceFiles.id, input.id));
    return file[0] || null;
  })
});

// server/routers.ts
var residentInput2 = z10.object({
  unitNumber: z10.string().min(1, "\u6236\u865F\u70BA\u5FC5\u586B"),
  ownerName: z10.string().min(1, "\u5340\u6B0A\u4EBA\u59D3\u540D\u70BA\u5FC5\u586B"),
  ownerPhone: z10.string().optional().nullable(),
  coResident1Name: z10.string().optional().nullable(),
  coResident1Phone: z10.string().optional().nullable(),
  coResident2Name: z10.string().optional().nullable(),
  coResident2Phone: z10.string().optional().nullable(),
  coResident3Name: z10.string().optional().nullable(),
  coResident3Phone: z10.string().optional().nullable(),
  coResident4Name: z10.string().optional().nullable(),
  coResident4Phone: z10.string().optional().nullable(),
  carParkingNumber: z10.string().optional().nullable(),
  carPlateNumber: z10.string().optional().nullable(),
  motorcycleParkingNumber: z10.string().optional().nullable(),
  motorcyclePlateNumber: z10.string().optional().nullable(),
  bicycleParkingNumber: z10.string().optional().nullable(),
  address: z10.string().optional().nullable(),
  emergencyContactName: z10.string().optional().nullable(),
  emergencyContactPhone: z10.string().optional().nullable(),
  emergencyContactRelation: z10.string().optional().nullable(),
  emergencyContactAddress: z10.string().optional().nullable(),
  emergencyContact2Name: z10.string().optional().nullable(),
  emergencyContact2Phone: z10.string().optional().nullable(),
  emergencyContact2Relation: z10.string().optional().nullable(),
  emergencyContact2Address: z10.string().optional().nullable(),
  squareMeters: z10.string().optional().nullable(),
  waterMeterNumber: z10.string().optional().nullable(),
  electricityMeterNumber: z10.string().optional().nullable(),
  moveInDate: z10.string().regex(/^\d{4}-\d{2}-\d{2}$/, "\u5165\u4F4F\u65E5\u671F\u683C\u5F0F\u61C9\u70BA YYYY-MM-DD").optional().nullable(),
  notes: z10.string().optional().nullable()
});
var repairRequestInput2 = z10.object({
  repairDate: z10.string().regex(/^\d{4}-\d{2}-\d{2}$/, "\u5831\u4FEE\u65E5\u671F\u683C\u5F0F\u61C9\u70BA YYYY-MM-DD"),
  unitNumber: z10.string().min(1, "\u6236\u865F\u70BA\u5FC5\u586B"),
  reporterName: z10.string().optional().nullable(),
  description: z10.string().min(1, "\u72C0\u6CC1\u63CF\u8FF0\u70BA\u5FC5\u586B"),
  location: z10.string().optional().nullable(),
  status: z10.enum(["pending", "in_progress", "completed", "cancelled"]).default("pending"),
  handlerNotes: z10.string().optional().nullable(),
  completedDate: z10.string().regex(/^\d{4}-\d{2}-\d{2}$/, "\u5B8C\u6210\u65E5\u671F\u683C\u5F0F\u61C9\u70BA YYYY-MM-DD").optional().nullable()
});
var residentsRouter = router({
  list: publicProcedure.input(z10.object({ search: z10.string().optional() }).optional()).query(async ({ input }) => {
    return listResidents(input?.search);
  }),
  getById: publicProcedure.input(z10.object({ id: z10.number() })).query(async ({ input }) => {
    return getResidentById(input.id);
  }),
  create: publicProcedure.input(residentInput2).mutation(async ({ input }) => {
    const data = {
      ...input,
      moveInDate: input.moveInDate || null
    };
    await createResident(data);
    return { success: true };
  }),
  update: publicProcedure.input(z10.object({ id: z10.number(), data: residentInput2.partial() })).mutation(async ({ input }) => {
    const data = {
      ...input.data,
      moveInDate: input.data.moveInDate !== void 0 ? input.data.moveInDate || null : void 0
    };
    await updateResident(input.id, data);
    return { success: true };
  }),
  delete: publicProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input }) => {
    await deleteResident(input.id);
    return { success: true };
  }),
  clearAll: publicProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    await db.delete(residents);
    return { success: true };
  }),
  validateUnitNumber: publicProcedure.input(z10.object({ unitNumber: z10.string(), excludeId: z10.number().optional() })).query(async ({ input }) => {
    const formatRegex = /^[\u4e00-\u9fa5a-zA-Z0-9\-]+$/;
    if (!formatRegex.test(input.unitNumber)) {
      return { valid: false, error: "\u6236\u865F\u683C\u5F0F\u4E0D\u7B26\uFF08\u53EA\u5141\u8A31\u4E2D\u6587\u3001\u82F1\u6587\u3001\u6578\u5B57\u3001\u9023\u5B57\u865F\uFF09" };
    }
    const residents2 = await listResidents();
    const isDuplicate = residents2.some(
      (r) => r.unitNumber === input.unitNumber && r.id !== input.excludeId
    );
    if (isDuplicate) {
      return { valid: false, error: "\u6B64\u6236\u865F\u5DF2\u5B58\u5728\uFF0C\u8ACB\u4F7F\u7528\u4E0D\u540C\u7684\u6236\u865F" };
    }
    return { valid: true };
  }),
  importBatch: publicProcedure.input(z10.object({ residents: z10.array(residentInput2) })).mutation(async ({ input }) => {
    const batchInput = input.residents;
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    for (let i = 0; i < batchInput.length; i++) {
      try {
        await createResident(batchInput[i]);
        successCount++;
      } catch (err) {
        errorCount++;
        errors.push({
          index: i,
          unitNumber: batchInput[i].unitNumber,
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }
    return {
      success: errorCount === 0,
      successCount,
      errorCount,
      errors: errors.length > 0 ? errors : void 0
    };
  }),
  exportExcel: publicProcedure.query(async () => {
    const allResidents = await listResidents();
    return allResidents;
  })
});
var repairRequestsRouter = router({
  list: publicProcedure.input(z10.object({
    status: z10.string().optional(),
    unitNumber: z10.string().optional()
  }).optional()).query(async ({ input }) => {
    return listRepairRequests(input);
  }),
  getById: publicProcedure.input(z10.object({ id: z10.number() })).query(async ({ input }) => {
    return getRepairRequestById(input.id);
  }),
  create: publicProcedure.input(repairRequestInput2).mutation(async ({ input }) => {
    await createRepairRequest(input);
    return { success: true };
  }),
  update: publicProcedure.input(z10.object({ id: z10.number(), data: repairRequestInput2.partial() })).mutation(async ({ input }) => {
    await updateRepairRequest(input.id, input.data);
    return { success: true };
  }),
  delete: publicProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input }) => {
    await deleteRepairRequest(input.id);
    return { success: true };
  })
});
var adminRouter = router({
  listUsers: adminProcedure.query(async () => {
    return listAllUsers();
  }),
  updateUserRole: adminProcedure.input(z10.object({ openId: z10.string(), role: z10.enum(["admin", "user"]) })).mutation(async ({ input }) => {
    await updateUserRole(input.openId, input.role);
    return { success: true };
  }),
  backup: adminProcedure.query(async () => {
    const data = await backupAllData();
    return data;
  }),
  restoreResidents: adminProcedure.input(z10.object({ data: z10.array(z10.any()) })).mutation(async ({ input }) => {
    const result = await restoreResidents(input.data);
    return result;
  }),
  restoreRepairRequests: adminProcedure.input(z10.object({ data: z10.array(z10.any()) })).mutation(async ({ input }) => {
    const result = await restoreRepairRequests(input.data);
    return result;
  }),
  // 新增操作日誌和會話管理程序
  getUsers: adminProcedure.query(async () => {
    return listAllUsers();
  }),
  getOperationLogs: adminProcedure.input(z10.object({ limit: z10.number().default(50) })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    const { operationLogs: operationLogs2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const { desc: desc3 } = await import("drizzle-orm");
    const logs = await db.select().from(operationLogs2).orderBy((t2) => desc3(t2.createdAt)).limit(input.limit);
    return logs;
  }),
  getUserSessions: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const { userSessions: userSessions2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const { eq: eq5 } = await import("drizzle-orm");
    const sessions = await db.select().from(userSessions2).where(eq5(userSessions2.isActive, 1));
    return sessions;
  }),
  forceLogoutUser: adminProcedure.input(z10.object({ sessionId: z10.number() })).mutation(async ({ input }) => {
    const { logoutUserSession: logoutUserSession2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    await logoutUserSession2(input.sessionId);
    return { success: true };
  })
});
var invitedUsersRouter = router({
  /**
   * 列出所有受邀人員
   */
  list: adminProcedure.query(async () => {
    const invited = await getAllInvitedUsers();
    return invited.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      status: u.status,
      invitedAt: u.invitedAt,
      acceptedAt: u.acceptedAt
    }));
  }),
  /**
   * 添加受邀人員
   */
  add: adminProcedure.input(
    z10.object({
      email: z10.string().email("\u90F5\u7BB1\u683C\u5F0F\u4E0D\u6B63\u78BA"),
      name: z10.string().optional(),
      role: z10.enum(["admin", "user"]).default("user"),
      notes: z10.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    try {
      await addInvitedUser(
        input.email,
        input.name || input.email,
        input.role,
        ctx.user?.id,
        input.notes
      );
      await logOperation({
        userId: ctx.user?.id || 0,
        action: "CREATE",
        module: "invited_users",
        targetType: "email",
        description: `Added invited user: ${input.email}`,
        details: { email: input.email, role: input.role }
      });
      syncToRemote("create", "invited_users", {
        email: input.email,
        name: input.name || input.email,
        role: input.role,
        notes: input.notes
      }, "email", input.email).catch(() => {
      });
      return { success: true, message: "\u53D7\u9080\u4EBA\u54E1\u6DFB\u52A0\u6210\u529F" };
    } catch (error) {
      throw new Error(error.message || "\u6DFB\u52A0\u53D7\u9080\u4EBA\u54E1\u5931\u6557");
    }
  }),
  /**
   * 刪除受邀人員
   */
  delete: adminProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    try {
      const invited = await getInvitedUserById(input.id);
      if (!invited) {
        throw new Error("\u53D7\u9080\u4EBA\u54E1\u4E0D\u5B58\u5728");
      }
      await deleteInvitedUser(input.id);
      await logOperation({
        userId: ctx.user?.id || 0,
        action: "DELETE",
        module: "invited_users",
        targetType: "email",
        description: `Deleted invited user: ${invited.email}`,
        details: { id: input.id }
      });
      if (invited) {
        syncToRemote("delete", "invited_users", invited, "email", invited.email).catch(() => {
        });
      }
      return { success: true, message: "\u53D7\u9080\u4EBA\u54E1\u522A\u9664\u6210\u529F" };
    } catch (error) {
      throw new Error(error.message || "\u522A\u9664\u53D7\u9080\u4EBA\u54E1\u5931\u6557");
    }
  }),
  /**
   * 検查郵箱是否被邀請
   */
  checkEmail: publicProcedure.input(z10.object({ email: z10.string().email() })).query(async ({ input }) => {
    const isInvited = await isEmailInvited(input.email);
    return { isInvited };
  }),
  /**
   * 更新受邀人員狀態
   */
  updateStatus: adminProcedure.input(
    z10.object({
      id: z10.number(),
      status: z10.enum(["pending", "accepted", "rejected"])
    })
  ).mutation(async ({ input, ctx }) => {
    try {
      const invited = await getInvitedUserById(input.id);
      if (!invited) {
        throw new Error("\u53D7\u9080\u4EBA\u54E1\u4E0D\u5B58\u5728");
      }
      const updates = { status: input.status };
      if (input.status === "accepted") {
        updates.acceptedAt = /* @__PURE__ */ new Date();
      }
      await updateInvitedUser(input.id, updates);
      await logOperation({
        userId: ctx.user?.id || 0,
        action: "UPDATE",
        module: "invited_users",
        targetType: "email",
        description: `Updated invited user status: ${invited.email} -> ${input.status}`,
        details: { status: input.status }
      });
      if (invited) {
        syncToRemote("update", "invited_users", {
          ...invited,
          status: input.status
        }, "email", invited.email).catch(() => {
        });
      }
      return { success: true, message: "\u72C0\u614B\u66F4\u65B0\u6210\u529F" };
    } catch (error) {
      throw new Error(error.message || "\u66F4\u65B0\u72C0\u614B\u5931\u6557");
    }
  })
});
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    }),
    passwordAuth: passwordAuthRouter
  }),
  residents: residentsWithAuditRouter,
  repairRequests: repairRequestsWithAuditRouter,
  renovationApplications: renovationApplicationsRouter,
  resourceLibrary: resourceLibraryRouter,
  admin: adminRouter,
  passwordUsers: passwordUserManagementRouter,
  auditLog: auditLogRouter,
  accountManagement: accountManagementRouter,
  invitedUsers: invitedUsersRouter
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs3 from "fs";
import { nanoid } from "nanoid";
import path3 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs2 from "node:fs";
import path2 from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var PROJECT_ROOT = import.meta.dirname;
var LOG_DIR2 = path2.join(PROJECT_ROOT, ".manus-logs");
var MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
var TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);
function ensureLogDir2() {
  if (!fs2.existsSync(LOG_DIR2)) {
    fs2.mkdirSync(LOG_DIR2, { recursive: true });
  }
}
function trimLogFile(logPath, maxSize) {
  try {
    if (!fs2.existsSync(logPath) || fs2.statSync(logPath).size <= maxSize) {
      return;
    }
    const lines = fs2.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}
`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }
    fs2.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
  }
}
function writeToLogFile(source, entries) {
  if (entries.length === 0) return;
  ensureLogDir2();
  const logPath = path2.join(LOG_DIR2, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs2.appendFileSync(logPath, `${lines.join("\n")}
`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}
function vitePluginManusDebugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true
            },
            injectTo: "head"
          }
        ]
      };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        const handlePayload = (payload) => {
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };
        const reqBody = req.body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    }
  };
}
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path2.resolve(import.meta.dirname),
  root: path2.resolve(import.meta.dirname, "client"),
  publicDir: path2.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs3.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path3.resolve(import.meta.dirname, "../..", "dist", "public") : path3.resolve(import.meta.dirname, "public");
  if (!fs3.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/residents-export.ts
init_db();
import { Router } from "express";
var residentsExportRouter = Router();
residentsExportRouter.get("/export", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    const { residents: residentsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const { sql } = await import("drizzle-orm");
    const rows = await db.select().from(residentsTable).orderBy(residentsTable.unitNumber);
    const headers = [
      "id",
      "unitNumber",
      "ownerName",
      "ownerPhone",
      "address",
      "coResident1Name",
      "coResident1Phone",
      "coResident2Name",
      "coResident2Phone",
      "coResident3Name",
      "coResident3Phone",
      "coResident4Name",
      "coResident4Phone",
      "carParkingNumber",
      "carPlateNumber",
      "motorcycleParkingNumber",
      "motorcyclePlateNumber",
      "bicycleParkingNumber",
      "squareMeters",
      "waterMeterNumber",
      "electricityMeterNumber",
      "moveInDate",
      "emergencyContactName",
      "emergencyContactPhone",
      "emergencyContactRelation",
      "emergencyContact2Name",
      "emergencyContact2Phone",
      "emergencyContact2Relation",
      "notes",
      "createdAt",
      "updatedAt"
    ];
    const csv = [
      headers.join("	"),
      // 使用 Tab 作為分隔符以支援中文
      ...rows.map(
        (row) => headers.map((header) => {
          const value = row[header];
          if (value === null || value === void 0) return "";
          if (value instanceof Date) {
            return value.toISOString().split("T")[0];
          }
          if (typeof value === "string") {
            return value.includes("	") || value.includes("\n") || value.includes('"') ? `"${value.replace(/"/g, '""')}"` : value;
          }
          return String(value);
        }).join("	")
      )
    ].join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="residents_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`
    );
    res.setHeader("Content-Length", Buffer.byteLength(csv, "utf-8"));
    res.send(csv);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ error: "Failed to export residents data" });
  }
});

// server/upload-routes.ts
import { Router as Router2 } from "express";
import multer from "multer";

// server/storage.ts
init_env();
function getForgeConfig() {
  const forgeUrl = ENV.forgeApiUrl;
  const forgeKey = ENV.forgeApiKey;
  if (!forgeUrl || !forgeKey) {
    throw new Error(
      "Storage config missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }
  return { forgeUrl: forgeUrl.replace(/\/+$/, ""), forgeKey };
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function appendHashSuffix(relKey) {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const { forgeUrl, forgeKey } = getForgeConfig();
  const key = appendHashSuffix(normalizeKey(relKey));
  const presignUrl = new URL("v1/storage/presign/put", forgeUrl + "/");
  presignUrl.searchParams.set("path", key);
  const presignResp = await fetch(presignUrl, {
    headers: { Authorization: `Bearer ${forgeKey}` }
  });
  if (!presignResp.ok) {
    const msg = await presignResp.text().catch(() => presignResp.statusText);
    throw new Error(`Storage presign failed (${presignResp.status}): ${msg}`);
  }
  const { url: s3Url } = await presignResp.json();
  if (!s3Url) throw new Error("Forge returned empty presign URL");
  const blob = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data], { type: contentType });
  const uploadResp = await fetch(s3Url, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: blob
  });
  if (!uploadResp.ok) {
    throw new Error(`Storage upload to S3 failed (${uploadResp.status})`);
  }
  return { key, url: `/manus-storage/${key}` };
}

// server/upload-routes.ts
var router2 = Router2();
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("\u53EA\u652F\u63F4 PDF \u548C Word \u6A94\u6848"));
    }
  }
});
router2.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "\u6C92\u6709\u9078\u64C7\u6A94\u6848" });
    }
    let fileName = req.file.originalname;
    const fileBuffer = req.file.buffer;
    const contentType = req.file.mimetype;
    fileName = fileName.replace(/[^\x00-\x7F]/g, "").replace(/\s+/g, "_");
    if (!fileName) {
      fileName = `file_${Date.now()}`;
    }
    const { key, url } = await storagePut(
      `resource-library/${Date.now()}-${fileName}`,
      fileBuffer,
      contentType
    );
    res.json({
      success: true,
      url,
      key,
      size: req.file.size
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: error.message || "\u6A94\u6848\u4E0A\u50B3\u5931\u6557"
    });
  }
});
var upload_routes_default = router2;

// server/sync-routes.ts
import { Router as Router3 } from "express";
var router3 = Router3();
router3.post("/sync", async (req, res) => {
  try {
    const apiKey = req.headers["x-sync-api-key"];
    if (!apiKey || apiKey !== SYNC_API_KEY) {
      return res.status(401).json({ success: false, message: "Invalid API key" });
    }
    const syncSource = req.headers["x-sync-source"];
    if (syncSource === "community-management") {
      return res.json({ success: true, message: "Skipped - source is self", action: "skipped" });
    }
    const syncReq = req.body;
    if (!syncReq.operation || !syncReq.table || !syncReq.data) {
      return res.status(400).json({ success: false, message: "Invalid request body" });
    }
    const result = await handleSyncRequest(syncReq);
    res.json(result);
  } catch (error) {
    console.error("[SYNC] \u540C\u6B65\u7AEF\u9EDE\u932F\u8AA4:", error);
    res.status(500).json({
      success: false,
      message: `Internal error: ${error instanceof Error ? error.message : String(error)}`
    });
  }
});
var sync_routes_default = router3;

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
var demoUsersInitialized = false;
async function ensureDemoUsers() {
  if (demoUsersInitialized) return;
  demoUsersInitialized = true;
  try {
    await initializeDemoUsers();
    console.log("[Server] Demo users initialized (lazy)");
  } catch (error) {
    console.error("[Server] Failed to initialize demo users:", error);
  }
}
function createApp() {
  const app = express3();
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    app.use(async (_req, _res, next) => {
      if (!demoUsersInitialized) {
        await ensureDemoUsers();
      }
      next();
    });
  }
  app.use(express3.json({ limit: "50mb" }));
  app.use(express3.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use("/api/residents", residentsExportRouter);
  app.use("/api", upload_routes_default);
  app.use("/api", sync_routes_default);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  serveStatic(app);
  return app;
}
async function startServer() {
  try {
    await initializeDemoUsers();
    console.log("Demo users initialized successfully");
  } catch (error) {
    console.error("Failed to initialize demo users:", error);
  }
  const app = createApp();
  const server = createServer(app);
  if (process.env.NODE_ENV === "development") {
    console.log("[Server] Running in development mode with Vite");
    await setupVite(app, server);
  } else {
    console.log("[Server] Running in production mode with static files");
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`[Server] Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`[Server] Running on http://localhost:${port}/`);
  });
}
var isVercel = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
if (!isVercel) {
  initializeDemoUsers().catch((err) => {
    console.warn("[Server] Demo users init:", err.message);
  });
  startServer().catch((error) => {
    console.error("[Server] Failed to start:", error);
    process.exit(1);
  });
}
export {
  createApp
};
