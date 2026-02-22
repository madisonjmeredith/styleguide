import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { neo } from './neo-utils';

const neoAlertVariants = cva(cn('flex items-center gap-2.5 px-4 py-3 text-sm font-medium', neo.border, neo.radius), {
    variants: {
        variant: {
            default: 'bg-white text-gray-900',
            success: 'bg-neo text-white border-neo',
            warning: 'bg-amber-50 text-amber-900 border-amber-400',
            destructive: 'bg-red-50 text-red-900 border-red-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

function NeoAlert({
    className,
    variant,
    children,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof neoAlertVariants>) {
    return (
        <div className={cn(neoAlertVariants({ variant, className }))} {...props}>
            {children}
        </div>
    );
}

export { NeoAlert, neoAlertVariants };
