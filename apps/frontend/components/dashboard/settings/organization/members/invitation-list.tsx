'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { InvitationStatus } from '@prisma/client';
import { MoreHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { deleteInvitation } from '@/actions/invitations/delete-invitation';
import { resendInvitation } from '@/actions/invitations/resend-invitation';
import { EditInvitationModal } from '@/components/dashboard/settings/organization/members/edit-invitation-modal';
import { RevokeInvitationModal } from '@/components/dashboard/settings/organization/members/revoke-invitation-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { capitalize, cn } from '@/lib/utils';
import type { InvitationDto } from '@/types/dtos/invitation-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export type InvitationListProps = React.HtmlHTMLAttributes<HTMLUListElement> & {
  profile: ProfileDto;
  invitations: InvitationDto[];
};

export function InvitationList({
  profile,
  invitations,
  className,
  ...other
}: InvitationListProps): React.JSX.Element {
  return (
    <ul
      role="list"
      className={cn('m-0 list-none divide-y p-0', className)}
      {...other}
    >
      {invitations.map((invitation) => (
        <InvitationListItem
          key={invitation.id}
          profile={profile}
          invitation={invitation}
        />
      ))}
    </ul>
  );
}

type InvitationListItemProps = React.HtmlHTMLAttributes<HTMLLIElement> & {
  profile: ProfileDto;
  invitation: InvitationDto;
};

function InvitationListItem({
  profile,
  invitation,
  className,
  ...other
}: InvitationListItemProps): React.JSX.Element {
  const handleShowEditInvitationModal = (): void => {
    NiceModal.show(EditInvitationModal, { profile, invitation });
  };
  const handleResendInvitation = async (): Promise<void> => {
    const result = await resendInvitation({ id: invitation.id });
    if (!result?.serverError && !result?.validationErrors) {
      toast.error('Invitation re-sent');
    } else {
      toast.error("Couldn't resend invitation");
    }
  };
  const handleShowRevokeInvitationModal = (): void => {
    NiceModal.show(RevokeInvitationModal, { invitation });
  };
  const handleDeleteInvitation = async (): Promise<void> => {
    const result = await deleteInvitation({ id: invitation.id });
    if (!result?.serverError && !result?.validationErrors) {
      toast.error('Invitation deleted');
    } else {
      toast.error("Couldn't delete invitation");
    }
  };
  return (
    <li
      role="listitem"
      className={cn('flex w-full flex-row justify-between p-6', className)}
      {...other}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col">
          <div className="text-sm font-medium">
            {capitalize(invitation.status.toLowerCase())}
          </div>
          <div className="text-xs font-normal text-muted-foreground">
            {invitation.email}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Badge
          variant="secondary"
          className="hidden rounded-3xl sm:inline-block"
        >
          {capitalize(invitation.role.toLowerCase())}
        </Badge>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="size-8 p-0"
              title="Open menu"
            >
              <MoreHorizontalIcon className="size-4 shrink-0" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {invitation.status === InvitationStatus.PENDING && (
              <>
                <DropdownMenuItem onClick={handleShowEditInvitationModal}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleResendInvitation}>
                  Resend
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="!text-destructive"
                  onClick={handleShowRevokeInvitationModal}
                >
                  Revoke
                </DropdownMenuItem>
              </>
            )}
            {invitation.status === InvitationStatus.REVOKED && (
              <DropdownMenuItem
                className="!text-destructive"
                onClick={handleDeleteInvitation}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
