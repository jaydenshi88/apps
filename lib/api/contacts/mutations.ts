import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import {
  ContactId,
  NewContactParams,
  UpdateContactParams,
  updateContactSchema,
  insertContactSchema,
  contacts,
  contactIdSchema,
  updateContactJoint,
} from "@/lib/db/schema/contacts";
import { revalidatePath } from "next/cache";

export const createContact = async (contact: NewContactParams) => {
  const newContact = insertContactSchema.parse(contact);
  try {
    await db.insert(contacts).values(newContact);
    revalidatePath(`/partner/${contact.partnerId}`)
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateContact = async (
  id: ContactId,
  contact: UpdateContactParams,
) => {
  const { id: contactId } = contactIdSchema.parse({ id });
  const newContact = updateContactSchema.parse(contact);
  try {
    await db
      .update(contacts)
      .set({ ...newContact, updatedAt: new Date() })
      .where(eq(contacts.id, contactId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteContact = async (id: ContactId) => {
  const { id: contactId } = contactIdSchema.parse({ id });
  try {
    await db.delete(contacts).where(eq(contacts.id, contactId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
