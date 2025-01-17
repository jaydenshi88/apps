import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CardContent, Card } from "@/components/ui/card";
import { CompleteContact, contacts } from "@/lib/db/schema/contacts";
import { Badge } from "./ui/badge";
import Link from "next/link";

export default function Component({ data }: { data: CompleteContact }) {
  return (
    <a href={`/contact/${data.id || "1"}`}>
      <Card
        key="1"
        className="mx-auto max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        <Image
          alt="null"
          className="w-full object-cover"
          height="320"
          src={"/placeholder.jpg"}
          style={{
            aspectRatio: "320/320",
            objectFit: "cover",
          }}
          width="320"
        />
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold transition-all duration-200 hover:text-gray-700">
            {data.fullName}
          </h2>
          <h3 className="text-gray-500 transition-all duration-200 hover:text-gray-600">
            {data.isPrimary ? <Badge> Primary Contact </Badge> : null}
          </h3>
          <p className="mt-2 text-gray-600 transition-all duration-200 hover:text-gray-700">
            {data.notes}
          </p>
          <div className="mt-4 flex-col gap-3 space-x-2">
            <Button
              className="w-full transition-all duration-200 hover:bg-gray-700 hover:text-white"
              size="sm"
            >
              Email: {data.email}
            </Button>
            <Button
              className="w-full transition-all duration-200 hover:border-gray-700 hover:text-gray-700"
              size="sm"
              variant="outline"
            >
              Phone: {data.phone}
            </Button>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
