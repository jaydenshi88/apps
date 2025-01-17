"use client"
import { createPartner } from "@/app/_lib/actions";
import { partners } from "@/lib/db/schema/partners";
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { CreatePartnerSchema, createPartnerSchema } from '@/app/_lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '@/lib/handle-error';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Button } from "./ui/button";

export default function CreatePartnerForm() {
  const [isDone, setIsDone] = useState(false)
  const [partner, setPartnerData] = useState<string>()
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const form = useForm<CreatePartnerSchema>({
    resolver: zodResolver(createPartnerSchema),
  });

  function onSubmit(input: CreatePartnerSchema) {
    startCreateTransition(() => {
      toast.promise(createPartner(input), {
        loading: "Creating partner...",
        success: () => {
          form.reset();
          setIsDone(true)
          return "Partner created";
        },
        error: (error) => {
          return getErrorMessage(error);
        },
      });
    });
  }


  return (
    <div>
      {
        isDone ? <div className='text-2xl font-semibold'>
          Created Partner With Name: {partner}
        </div> :
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter partner name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orgType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an organization type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {partners.orgType.enumValues.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableResources"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Resources</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter available resources"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isCreatePending}>Submit</Button>
            </form>
          </Form>
      }

    </div>
  )
}

