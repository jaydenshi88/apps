"use client";
import ContactCard from "@/components/ContactCard";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { CompleteContact } from "@/lib/db/schema/contacts";
import { CompletePartner, orgTypes, partners } from "@/lib/db/schema/partners";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCheckIcon } from "lucide-react";
import { orgTypeZod } from "@/app/_lib/validations";
import { updatePartner, updatePartnerForm } from "@/app/_lib/actions";
import { toast } from "sonner";
import { catchError } from "@/lib/catch-error";
import { CreateContact } from "@/components/CreateContact";
import { PartnerMap } from "@/types/partners";
import { Textarea } from "@/components/ui/textarea";
export const NCard = (props: {
  partner: CompletePartner;
  contacts: CompleteContact[];
  partnerId: string;
}) => {
  const { partner, contacts } = props;
  const { execute } = useAction(updatePartnerForm, {
    onSuccess() {
      toast.success("Partner updated successfully");
    },
    onError(error) {
      catchError(error);
    },
  });

  const schema = z.object({
    id: z.string(),
    name: z.string().min(1).max(100),
    availableResources: z.string().min(1),
    orgType: orgTypeZod,
  });
  if (!partner) return null;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: partner.id as string,
      name: partner.name as string,
      orgType: partner.orgType,
      availableResources: partner.availableResources as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof schema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    execute(values);
  }

  return (
    <div className="pt-10">
      <Card className="mx-auto h-[600px] w-[800px] flex-col gap-4 overflow-auto bg-primary-foreground">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="pt-10">
                <h2 className="text-3xl font-bold">Partner Information</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Here are the details of the partner you selected.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partner Id</FormLabel>
                          <FormControl>
                            <Input
                              id="partner-id"
                              placeholder="Enter the partner ID"
                              {...field}
                            />
                          </FormControl>

                          <FormDescription>
                            The Partner ID is a unique identifier for the
                            partner
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partner Name</FormLabel>
                          <FormControl>
                            <Input
                              id="partner-name"
                              placeholder="Enter the partner name"
                              {...field}
                            />
                          </FormControl>

                          <FormDescription>
                            The name of the partner
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="orgType"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Organization Type</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? orgTypes.find(
                                    (language) =>
                                      language.value === field.value,
                                  )?.label
                                  : "Select language"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search Organization Type"
                                className="h-9"
                              />
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {orgTypes.map((language) => (
                                  <CommandItem
                                    value={language.label}
                                    key={language.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "orgType",
                                        language.value as z.infer<
                                          typeof orgTypeZod
                                        >,
                                      );
                                    }}
                                  >
                                    {language.label}
                                    <CheckCheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        language.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          The type of organization the partner is
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="availableResources"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Resources</FormLabel>
                        <FormControl>
                          <Textarea
                            id="a-resounce"
                            placeholder="Enter the available resources"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The available resources of the partner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex justify-between pt-4">
            <Label className="text-3xl font-bold">Contacts</Label>
            <CreateContact partnerId={props.partnerId} />
          </div>
          <div className="flex w-full items-center justify-center space-y-2">
            {/*no form element here */}
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {contacts.map((contact, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <ContactCard data={contact} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
