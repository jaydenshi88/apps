import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {
  PartnerId,
  NewPartnerParams,
  UpdatePartnerParams,
  updatePartnerSchema,
  insertPartnerSchema,
  partners,
  partnerIdSchema,
  insertPartnerParams,
} from "@/lib/db/schema/partners";

export const createPartner = async (partner: NewPartnerParams) => {
  const newPartner = insertPartnerSchema.parse(partner);
  try {
    await db.insert(partners).values(newPartner);
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePartner = async (
  id: PartnerId,
  partner: UpdatePartnerParams,
) => {
  const { id: partnerId } = partnerIdSchema.parse({ id });
  const newPartner = updatePartnerSchema.parse(partner);
  try {
    await db
      .update(partners)
      .set({ ...newPartner, updatedAt: new Date() })
      .where(eq(partners.id, partnerId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePartner = async (id: PartnerId) => {
  const { id: partnerId } = partnerIdSchema.parse({ id });
  try {
    await db.delete(partners).where(eq(partners.id, partnerId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
