'use client';

import * as React from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Command as CommandPrimitive } from 'cmdk';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  type DialogProps
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export type CommandElement = React.ElementRef<typeof CommandPrimitive>;
export type CommandProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
>;
const Command = React.forwardRef<CommandElement, CommandProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(
        'flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className
      )}
      {...props}
    />
  )
);
Command.displayName = CommandPrimitive.displayName;

export type CommandDialogProps = DialogProps;
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogTitle className="sr-only">Command menu</DialogTitle>
      <DialogDescription className="sr-only">
        Quickly navigate through the dashboard with your keyboard using the
        command menu.
      </DialogDescription>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export type CommandInputElement = React.ElementRef<
  typeof CommandPrimitive.Input
>;
export type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
>;
const CommandInput = React.forwardRef<CommandInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div
      className="flex items-center border-b px-3"
      cmdk-input-wrapper=""
    >
      <MagnifyingGlassIcon className="mr-2 size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  )
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

export type CommandListElement = React.ElementRef<typeof CommandPrimitive.List>;
export type CommandListProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
>;
const CommandList = React.forwardRef<CommandListElement, CommandListProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn(
        'max-h-[300px] overflow-y-auto overflow-x-hidden',
        className
      )}
      {...props}
    />
  )
);

CommandList.displayName = CommandPrimitive.List.displayName;

export type CommandEmptyElement = React.ElementRef<
  typeof CommandPrimitive.Empty
>;
export type CommandEmptyProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;
const CommandEmpty = React.forwardRef<CommandEmptyElement, CommandEmptyProps>(
  (props, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      className="py-6 text-center text-sm"
      {...props}
    />
  )
);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export type CommandGroupElement = React.ElementRef<
  typeof CommandPrimitive.Group
>;
export type CommandGroupProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>;
const CommandGroup = React.forwardRef<CommandGroupElement, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
        className
      )}
      {...props}
    />
  )
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

export type CommandSeparatorElement = React.ElementRef<
  typeof CommandPrimitive.Separator
>;
export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;
const CommandSeparator = React.forwardRef<
  CommandSeparatorElement,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export type CommandItemElement = React.ElementRef<typeof CommandPrimitive.Item>;
export type CommandItemProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
>;
const CommandItem = React.forwardRef<CommandItemElement, CommandItemProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50",
        className
      )}
      {...props}
    />
  )
);

CommandItem.displayName = CommandPrimitive.Item.displayName;

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
};