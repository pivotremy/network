import * as React from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  type CardProps
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function BillingAddressSkeletonCard(
  props: CardProps
): React.JSX.Element {
  return (
    <Card {...props}>
      <CardContent className="pt-6">
        <div className="grid grid-cols-12 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`full-${i}`}
              className="col-span-12"
            >
              <div className="mb-2 flex flex-col space-y-2">
                <Skeleton className="h-3.5 w-[200px]" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`half-${i}`}
              className="col-span-6"
            >
              <div className="mb-2 flex flex-col space-y-2">
                <Skeleton className="h-3.5 w-[200px]" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex w-full justify-end pt-6">
        <Skeleton className="h-9 w-16" />
      </CardFooter>
    </Card>
  );
}
