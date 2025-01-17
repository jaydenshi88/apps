import { sql } from "drizzle-orm";
import {
  varchar,
  boolean,
  timestamp,
  mysqlTable,
  mysqlEnum,
  text,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getPartners } from "@/lib/api/partners/queries";

export const orgTypes = [
  { label: "Sole Proprietorship", value: "Sole Proprietorship" },
  {
    label: "Partnership",
    value: "Partnership",
  },
  { label: "Corporate", value: "Corporate" },
  {
    label: "Limited Liability Company (LLC)",
    value: "Limited Liability Company (LLC)",
  },
  { label: "Cooperative", value: "Cooperative" },
  { label: "NPO", value: "NPO" },
  { label: "S Corporation", value: "S Corporation" },
  { label: "Government", value: "Government" },
  { label: "Educational", value: "Educational" },
];

import { nanoid, timestamps } from "@/lib/utils";
export const partners = mysqlTable(
  "partners",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar("name", { length: 256 }).notNull(),
    orgType: mysqlEnum("org_type", [
      "Sole Proprietorship",
      "Partnership",
      "Corporate",
      "Limited Liability Company (LLC)",
      "Cooperative",
      "NPO",
      "S Corporation",
      "Government",
      "Educational",
    ])
      .notNull()
      .default("NPO"),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
    availableResources: text("available_resources").default("None as of now"),
    isVerified: boolean("is_verified").notNull().default(false),
  },
  (partners) => {
    return {};
  },
);

// Schema for partners - used to validate API requests
const baseSchema = createSelectSchema(partners).omit(timestamps);

export const insertPartnerSchema =
  createInsertSchema(partners).omit(timestamps);
export const insertPartnerParams = baseSchema
  .extend({
    isVerified: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updatePartnerSchema = baseSchema;
export const updatePartnerParams = baseSchema.extend({
  isVerified: z.coerce.boolean(),
});
export const partnerIdSchema = baseSchema.pick({ id: true });

// Types for partners - used to type API request params and within Components
export type Partner = typeof partners.$inferSelect;
export type NewPartner = z.infer<typeof insertPartnerSchema>;
export type NewPartnerParams = z.infer<typeof insertPartnerParams>;
export type UpdatePartnerParams = z.infer<typeof updatePartnerParams>;
export type PartnerId = z.infer<typeof partnerIdSchema>["id"];

// this type infers the return from getPartners() - meaning it will include any joins
export type CompletePartner = Awaited<
  ReturnType<typeof getPartners>
>["partners"][number];
