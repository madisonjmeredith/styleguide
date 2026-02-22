import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

function NeoToggle({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
    return (
        <SwitchPrimitive.Root
            className={cn(
                'peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-neo transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo focus-visible:ring-offset-1',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'data-[state=checked]:bg-neo data-[state=unchecked]:bg-gray-200',
                className,
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    'pointer-events-none block size-3.5 rounded-full ring-0 transition-transform',
                    'data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-0.5',
                    'data-[state=checked]:bg-white data-[state=unchecked]:bg-neo',
                )}
            />
        </SwitchPrimitive.Root>
    );
}

export { NeoToggle };
