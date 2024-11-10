'use client';

import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateBillingEmail } from '@/actions/billing/update-billing-email';
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
  updateBillingEmailSchema,
  type UpdateBillingEmailSchema
} from '@/schemas/billing/update-billing-email-schema';

export type BillingEmailCardProps = CardProps & {
  email?: string;
};

export function BillingEmailCard({
  email,
  ...other
}: BillingEmailCardProps): React.JSX.Element {
  const methods = useZodForm({
    schema: updateBillingEmailSchema,
    mode: 'onSubmit',
    defaultValues: {
      email: email ?? ''
    }
  });
  const canSubmit = !methods.formState.isSubmitting;
  const onSubmit: SubmitHandler<UpdateBillingEmailSchema> = async (values) => {
    if (!canSubmit) {
      return;
    }
    const result = await updateBillingEmail(values);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Email recipient updated');
    } else {
      toast.error("Couldn't update email recipient");
    }
  };
  return (
    <FormProvider {...methods}>
      <Card {...other}>
        <CardContent className="pt-6">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      maxLength={255}
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
