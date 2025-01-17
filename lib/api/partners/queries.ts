import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import {
  type PartnerId,
  partnerIdSchema,
  partners,
} from "@/lib/db/schema/partners";
import { contacts } from "@/lib/db/schema/contacts";
import { PartnerMap } from "@/types/partners";

export const getPartners = async () => {
  const p = await db
    .select()
    .from(partners)
    .where(eq(partners.isVerified, true));
  return { partners: p };
};

export const getApplicants = async () => {
  const p = await db
    .select()
    .from(partners)
    .where(eq(partners.isVerified, false));
  return { partners: p };
};

export const getPartnerTableData = async () => {
  const p = await db
    .select()
    .from(partners)
    .leftJoin(contacts, eq(partners.id, contacts.partnerId));

  return { partners: p };
};

export const getPartnerById = async (id: PartnerId) => {
  const { id: partnerId } = partnerIdSchema.parse({ id });
  const [p] = await db
    .select()
    .from(partners)
    .where(eq(partners.id, partnerId));
  return { partner: p };
};

export async function getPartnerMap(): Promise<PartnerMap[]> {
  const p = await db
    .select({
      id: partners.id,
      name: partners.name,
    })
    .from(partners);

  return p;
}

export async function getAllData() {
  const data = await db.select().from(partners);
  return { data: data };
}

export type AllData = Awaited<ReturnType<typeof getAllData>>["data"];
