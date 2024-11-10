'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import NiceModal from '@ebay/nice-modal-react';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

import { logOut } from '@/actions/auth/log-out';
import { CommandMenu } from '@/components/dashboard/command-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Routes } from '@/constants/routes';
import { isDialogOpen } from '@/lib/browser/is-dialog-open';
import { isInputFocused } from '@/lib/browser/is-input-focused';
import { isMac } from '@/lib/browser/is-mac';
import { cn, getInitials } from '@/lib/utils';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export type UserDropdownProps = ButtonProps & {
  profile: ProfileDto;
  isCollapsed?: boolean;
};

export function UserDropdown({
  profile,
  isCollapsed,
  className,
  ...other
}: UserDropdownProps): React.JSX.Element {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleNavigateToProfilePage = (): void => {
    router.push(Routes.Profile);
  };
  const handleNavigateToBillingPage = (): void => {
    router.push(Routes.Billing);
  };
  const handleShowCommandMenu = (): void => {
    NiceModal.show(CommandMenu);
  };
  const handleLogOut = async (): Promise<void> => {
    const result = await logOut({ redirect: true });
    if (result?.serverError || result?.validationErrors) {
      toast.error("Couldn't log out");
    }
  };

  React.useEffect(() => {
    const mac = isMac();
    const hotkeys: Record<string, { action: () => void; shift: boolean }> = {
      p: { action: handleNavigateToProfilePage, shift: true },
      b: { action: handleNavigateToBillingPage, shift: true },
      k: { action: handleShowCommandMenu, shift: false },
      l: { action: handleLogOut, shift: true }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDialogOpen() || isInputFocused()) return;

      const modifierKey = mac ? e.metaKey : e.ctrlKey;
      if (!modifierKey) return;

      const hotkey = hotkeys[e.key];
      if (!hotkey) return;
      if (hotkey.shift && !e.shiftKey) return;

      e.preventDefault();
      hotkey.action();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'group relative size-full justify-start gap-2',
            isCollapsed ? 'rounded-full p-0.5' : 'px-2 py-1',
            className
          )}
          {...other}
        >
          <Avatar className="size-7">
            <AvatarImage
              src={profile.image}
              alt={profile.name}
            />
            <AvatarFallback className="transition-colors duration-200 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <span className={cn('truncate', isCollapsed && 'sr-only')}>
            {profile.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="truncate text-sm font-medium leading-none">
              {profile.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleNavigateToProfilePage}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleNavigateToBillingPage}>
            Billing
            <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleShowCommandMenu}>
            Command Menu
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-default flex-row justify-between !bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Theme</p>
            <Select
              value={theme}
              onValueChange={setTheme}
            >
              <SelectTrigger className="h-[28px] w-[96px] px-2 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <span className="flex flex-row items-center gap-1 text-xs">
                    <SunIcon className="size-4 shrink-0 text-muted-foreground" />
                    Light
                  </span>
                </SelectItem>
                <SelectItem value="dark">
                  <span className="flex flex-row items-center gap-1 text-xs">
                    <MoonIcon className="size-4 shrink-0 text-muted-foreground" />
                    Dark
                  </span>
                </SelectItem>
                <SelectItem value="system">
                  <span className="flex flex-row items-center gap-1 text-xs">
                    <MonitorIcon className="size-4 shrink-0 text-muted-foreground" />
                    System
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
