import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  integer,
  json,
} from "drizzle-orm/pg-core";

// Users Table
export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    userSessionId: varchar("user_id", { length: 100 }).notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    availableTime: json("available_time"),
    availablePlace: json("available_place"),
  },
  (table) => ({
    displayIdIndex: index("users_display_id_index").on(table.userSessionId),
  }),
);

// export const eventsTable = pgTable(
//   "events",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 100 }).notNull(),
//     description: varchar("description", { length: 100 }).notNull(),
//     startTime: varchar("start_time", { length: 100 }).notNull(),
//     endTime: varchar("end_time", { length: 100 }).notNull(),
//     location: varchar("location", { length: 100 }).notNull(),
//     createdAt: varchar("created_at", { length: 100 }).notNull(),
//     updatedAt: varchar("updated_at", { length: 100 }).notNull(),
//     level: varchar("level", { length: 100 }).notNull(),
//     availableTime: json("available_time").notNull(),
//     creatorDisplayId: uuid("creator_display_id")
//       .notNull()
//       .references(() => usersTable.userSessionId, {
//         onDelete: "cascade",
//         onUpdate: "cascade",
//       }),
//   },
//   (table) => ({
//     creatorDisplayIdIndex: index("creator_display_id_index").on(
//       table.creatorDisplayId,
//     ),
//   }),
// );

// export const eventtoTimeTable = pgTable(
//   "time",
//   {
//     id: serial("id").primaryKey(),
//     userDisplayId: uuid("display_id")
//       .notNull()
//       .references(() => usersTable.userSessionId, {
//         onDelete: "cascade",
//         onUpdate: "cascade",
//       }),
//     eventId: integer("event_id")
//       .notNull()
//       .references(() => eventsTable.id, {
//         onDelete: "cascade",
//         onUpdate: "cascade",
//       }),
//     availability: json("availability").notNull(),
//     createdAt: varchar("created_at", { length: 100 }).notNull(),
//     updatedAt: varchar("updated_at", { length: 100 }).notNull(),
//   },
//   (table) => ({
//     userDisplayIdIndex: index("user_display_id_index").on(table.userDisplayId),
//     eventIdIndex: index("event_id_index").on(table.eventId),
//   }),
// );
