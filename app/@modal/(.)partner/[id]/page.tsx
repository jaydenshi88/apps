import Modal from "@/components/ui/modal";
import { getPartnerById, getPartnerMap } from "@/lib/api/partners/queries";
import { NCard } from "./item";
import { getContactsByPartner } from "@/lib/api/contacts/queries";

interface PartnerModalPageProps {
  params: {
    id: string;
  };
}

const PhotoModalPage = async ({ params }: PartnerModalPageProps) => {
  const { id } = params;
  const { partner } = await getPartnerById(id);
  const { contacts } = await getContactsByPartner(id);

  return (
    <Modal>
      <NCard partner={partner} partnerId={params.id} contacts={contacts} />
    </Modal>
  );
};

export default PhotoModalPage;
