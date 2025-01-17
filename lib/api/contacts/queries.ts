import "server-only";
import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import {
  type ContactId,
  contactIdSchema,
  contacts,
} from "@/lib/db/schema/contacts";

export const getContacts = async () => {
  const c = await db.select().from(contacts);
  return { contacts: c };
};

export const getContactsByPartner = async (pId: string) => {
  const c = await db.select().from(contacts).where(eq(contacts.partnerId, pId));
  return { contacts: c };
};

export const getContactById = async (id: ContactId) => {
  const { id: contactId } = contactIdSchema.parse({ id });
  const [c] = await db
    .select()
    .from(contacts)
    .where(eq(contacts.id, contactId));
  return { contact: c };
};
