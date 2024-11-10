'use client';

import * as React from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateOrganizationDetails } from '@/actions/organization/update-organization-details';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  type CardProps
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useZodForm } from '@/hooks/use-zod-form';
import {
  updateOrganizationDetailsSchema,
  type UpdateOrganizationDetailsSchema
} from '@/schemas/organization/update-organization-details-schema';
import type { OrganizationDetailsDto } from '@/types/dtos/organization-details-dto';

export type OrganizationDetailsCardProps = CardProps & {
  details: OrganizationDetailsDto;
};

export function OrganizationDetailsCard({
  details,
  ...props
}: OrganizationDetailsCardProps): React.JSX.Element {
  const methods = useZodForm({
    schema: updateOrganizationDetailsSchema,
    mode: 'onSubmit',
    defaultValues: {
      name: details.name ?? '',
      address: details.address ?? '',
      phone: details.phone ?? '',
      email: details.email ?? '',
      website: details.website ?? ''
    }
  });
  const canSubmit = !methods.formState.isSubmitting;
  const onSubmit: SubmitHandler<UpdateOrganizationDetailsSchema> = async (
    values
  ) => {
    if (!canSubmit) {
      return;
    }
    const result = await updateOrganizationDetails(values);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Organization details updated');
    } else {
      toast.error("Couldn't update organization details");
    }
  };
  return (
    <FormProvider {...methods}>
      <Card {...props}>
        <CardContent className="pt-6">
          <form
            className="space-y-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel required>Organization name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      maxLength={255}
                      required
                      autoComplete="organization"
                      disabled={methods.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      maxLength={255}
                      autoComplete="street-address"
                      disabled={methods.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      maxLength={32}
                      autoComplete="tel"
                      disabled={methods.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      maxLength={255}
                      autoComplete="email"
                      disabled={methods.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="website"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      maxLength={2000}
                      autoComplete="url"
                      disabled={methods.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </CardContent>
        <Separator />
        <CardFooter className="flex w-full justify-end pt-6">
          <Button
            type="button"
            variant="default"
            size="default"
            disabled={!canSubmit}
            loading={methods.formState.isSubmitting}
            onClick={methods.handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
