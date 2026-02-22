import * as React from 'react';
import { cn } from '@/lib/utils';
import { neo } from './neo-utils';

function NeoInput({ className, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            className={cn(
                neo.border,
                neo.radius,
                neo.shadow,
                neo.focus,
                'w-full bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400',
                className,
            )}
            {...props}
        />
    );
}

export { NeoInput };
