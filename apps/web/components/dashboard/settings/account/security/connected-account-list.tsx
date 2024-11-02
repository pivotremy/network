'use client';

import * as React from 'react';
import { GlobeLockIcon } from 'lucide-react';
import GoogleLogo from 'public/google-logo.svg';
import MicrosoftLogo from 'public/microsoft-logo.svg';
import { toast } from 'sonner';

import { connectAccount } from '@/actions/account/connect-account';
import { disconnectAccount } from '@/actions/account/disconnect-account';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ConnectedAccountDto } from '@/types/dtos/connected-account-dto';
import {
  identityProviderFriendlyNames,
  OAuthIdentityProvider
} from '@/types/identity-provider';

export type ConnectedAccountListProps =
  React.HtmlHTMLAttributes<HTMLUListElement> & {
    connectedAccounts: ConnectedAccountDto[];
  };

export function ConnectedAccountList({
  connectedAccounts,
  className,
  ...other
}: ConnectedAccountListProps): React.JSX.Element {
  return (
    <ul
      role="list"
      className={cn('m-0 list-none divide-y p-0', className)}
      {...other}
    >
      {connectedAccounts.map((connectedAccount) => (
        <ConnectedAccountListItem
          key={connectedAccount.id}
          connectedAccount={connectedAccount}
        />
      ))}
    </ul>
  );
}

type ConnectedAccountListItemProps = React.HTMLAttributes<HTMLLIElement> & {
  connectedAccount: ConnectedAccountDto;
};

function ConnectedAccountListItem({
  connectedAccount,
  className,
  ...other
}: ConnectedAccountListItemProps): React.JSX.Element {
  const handleConnect = async () => {
    const result = await connectAccount({
      provider: connectedAccount.id as OAuthIdentityProvider
    });
    if (result?.serverError || result?.validationErrors) {
      toast.error("Couldn't connect account");
    }
  };
  const handleDisconnect = async () => {
    const result = await disconnectAccount({
      provider: connectedAccount.id as OAuthIdentityProvider
    });
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Account disconnected');
    } else {
      toast.error("Couldn't disconnect account");
    }
  };
  return (
    <li
      className={cn(
        'flex flex-row items-center justify-between p-6',
        className
      )}
      {...other}
    >
      <div className="flex flex-row items-center gap-4">
        <Icon connectedAccount={connectedAccount} />
        <div>
          <h5 className="text-sm font-medium">
            {
              identityProviderFriendlyNames[
                connectedAccount.id as OAuthIdentityProvider
              ]
            }
          </h5>
          <p className="text-sm text-muted-foreground">
            {connectedAccount.linked ? 'Connected' : 'Not connected'}
          </p>
        </div>
      </div>
      {connectedAccount.linked ? (
        <Button
          type="button"
          variant="outline"
          onClick={handleDisconnect}
        >
          Disconnect
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={handleConnect}
        >
          Connect
        </Button>
      )}
    </li>
  );
}

function Icon({
  connectedAccount
}: {
  connectedAccount: ConnectedAccountDto;
}): React.JSX.Element {
  switch (connectedAccount.id) {
    case OAuthIdentityProvider.Google:
      return (
        <GoogleLogo
          viewBox="0 0 24 24"
          width="20"
          height="20"
        />
      );
    case OAuthIdentityProvider.MicrosoftEntraId:
      return (
        <MicrosoftLogo
          viewBox="0 0 21 21"
          width="20"
          height="20"
        />
      );
  }

  return <GlobeLockIcon className="size-5 shrink-0 text-muted-foreground" />;
}
