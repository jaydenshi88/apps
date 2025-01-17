"use client";
import { createContactAction, updateContactAction } from "@/app/_lib/actions";
import { Card, CardContent } from "@/components/ui/card";

import {
  insertContactParams,
} from "@/lib/db/schema/contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { catchError } from "@/lib/catch-error";
import { PhoneInput } from "./ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { AutoFormInputComponentProps } from "./ui/auto-form/types";
import { FormControl, FormDescription, FormItem, FormLabel } from "./ui/form";
import { Switch } from "./ui/switch";

export const CreateContact = (props: { partnerId: string }) => {
  const { execute } = useAction(createContactAction, {
    onSuccess() {
      toast.success("Contact created successfully");
      console.log("done")
    },
    onError(error) {
      catchError(error);
      console.log(":(")
    },
  });

  const schema = insertContactParams.omit({
    partnerId: true,
  }).extend({
    phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    isPrimary: z.boolean().default(false),
  });
  function onSubmit(data: z.infer<typeof schema>) {
    execute({
      ...data,
      partnerId: props.partnerId,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create Contact</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div>
          <Card>
            <CardContent className=" pt-5 text-4xl font-bold">
              Create Contact{" "}
            </CardContent>
            <CardContent>
              <AutoForm formSchema={schema} onSubmit={(v) => execute({
                ...v,
                partnerId: props.partnerId
              })} fieldConfig={{
                notes: {
                  fieldType: "textarea"
                },
                isPrimary: {
                  fieldType: "switch"
                },
                phone: {
                  fieldType: ({
                    label,
                    isRequired,
                    field,
                    fieldConfigItem,
                    fieldProps
                  }: AutoFormInputComponentProps) => {
                    return (

                      <FormItem className="flex flex-row items-start rounded-md border p-4">

                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            {label}
                            {isRequired && <span className="text-destructive"> *</span>}
                          </FormLabel>
                          {fieldConfigItem.description && (
                            <FormDescription>{fieldConfigItem.description}</FormDescription>
                          )}
                        </div>
                        <FormControl>

                          <PhoneInput placeholder="Enter a phone number" className="py-3 justify-self-start" {...field} />

                        </FormControl>
                      </FormItem>
                    )
                  }
                }
              }}>
                <AutoFormSubmit> Create Contact</AutoFormSubmit>
              </AutoForm>
            </CardContent>
          </Card>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
