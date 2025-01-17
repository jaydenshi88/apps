"use client";
import { createPartnerActions } from "@/app/_lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { catchError } from "@/lib/catch-error";
import {
  insertPartnerParams,
} from "@/lib/db/schema/partners";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";

export function CreatePartner() {
  const { execute } = useAction(createPartnerActions, {
    onSuccess() {
      toast.success("Partner updated successfully");
    },
    onError(error) {
      catchError(error);
    },
  });


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create Partner</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Want to create a partner</AlertDialogTitle>
        </AlertDialogHeader>
        <AutoForm formSchema={insertPartnerParams.extend({
          isVerified: z.boolean().default(false)
        })} onSubmit={execute} fieldConfig={{
          availableResources: {
            fieldType: "textarea"
          },
          isVerified: {
            fieldType: "switch"
          }


        }}>
          <AutoFormSubmit />
        </AutoForm>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
