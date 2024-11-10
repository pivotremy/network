'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';

import { InviteMemberModal } from '@/components/dashboard/settings/organization/members/invite-member-modal';
import { MemberList } from '@/components/dashboard/settings/organization/members/member-list';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  type CardProps
} from '@/components/ui/card';
import { EmptyText } from '@/components/ui/empty-text';
import { InputSearch } from '@/components/ui/input-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { MemberDto } from '@/types/dtos/member-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export type MembersCardProps = CardProps & {
  profile: ProfileDto;
  members: MemberDto[];
};

export function MembersCard({
  profile,
  members,
  className,
  ...other
}: MembersCardProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const filteredMembers = members.filter(
    (member) =>
      !searchQuery ||
      member.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      member.email.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
  );
  const handleSearchQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(e.target?.value || '');
  };
  const handleShowInviteMemberModal = (): void => {
    NiceModal.show(InviteMemberModal, { profile });
  };
  return (
    <Card
      className={cn('flex h-full flex-col', className)}
      {...other}
    >
      <CardHeader className="pb-0">
        <div className="flex flex-row items-center gap-2">
          <InputSearch
            placeholder="Filter by name or email"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <Button
            type="button"
            variant="default"
            size="default"
            className="whitespace-nowrap"
            onClick={handleShowInviteMemberModal}
          >
            Invite member
          </Button>
        </div>
      </CardHeader>
      <CardContent className="max-h-72 flex-1 overflow-hidden p-0">
        {filteredMembers.length > 0 ? (
          <ScrollArea className="h-full">
            <MemberList
              profile={profile}
              members={filteredMembers}
            />
          </ScrollArea>
        ) : (
          <EmptyText className="p-6">
            No member found {!!searchQuery && ' (filtered)'}.
          </EmptyText>
        )}
      </CardContent>
    </Card>
  );
}
