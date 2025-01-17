import { sql } from "drizzle-orm";
import {
  int,
  text,
  varchar,
  boolean,
  timestamp,
  mysqlTable,
  index,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getContacts } from "@/lib/api/contacts/queries";

import { nanoid, timestamps } from "@/lib/utils";

export const contacts = mysqlTable(
  "contacts",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull().default("+12312313333"),
    image: text("image").default("/placeholder.png").notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    jobTitle: text("job_title").notNull(),
    isPrimary: boolean("is_primary").notNull().default(false),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
    partnerId: varchar("partner_id", { length: 191 }).notNull(),
    notes: text("notes").default("").notNull(),
  },
  (contacts) => {
    return {
      isPrimaryIndex: index("is_primary_idx").on(contacts.isPrimary),
    };
  },
);

export const contactSchema = createSelectSchema(contacts);
// Schema for contacts - used to validate API requests
const baseSchema = createSelectSchema(contacts, {
  email: z.coerce.string().email().min(5),
}).omit(timestamps);

export const insertContactSchema =
  createInsertSchema(contacts).omit(timestamps);
export const insertContactParams = baseSchema
  .extend({
    phone: z.coerce.string(),
    isPrimary: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateContactSchema = baseSchema;
export const updateContactParams = baseSchema.extend({
  phone: z.coerce.string(),
  isPrimary: z.coerce.boolean(),
});

export const updateContactJoint = z.object({
  id: z.string(),
  info: updateContactParams,
});
export const contactIdSchema = baseSchema.pick({ id: true });

// Types for contacts - used to type API request params and within Components
export type Contact = typeof contacts.$inferSelect;
export type NewContact = z.infer<typeof insertContactSchema>;
export type NewContactParams = z.infer<typeof insertContactParams>;
export type UpdateContactParams = z.infer<typeof updateContactParams>;
export type ContactId = z.infer<typeof contactIdSchema>["id"];

// this type infers the return from getContacts() - meaning it will include any joins
export type CompleteContact = Awaited<
  ReturnType<typeof getContacts>
>["contacts"][number];
