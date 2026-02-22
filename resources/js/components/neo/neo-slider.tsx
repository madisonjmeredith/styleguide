import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

function NeoSlider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
    const _values = React.useMemo(() => value ?? defaultValue ?? [min], [value, defaultValue, min]);

    return (
        <SliderPrimitive.Root
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn('relative flex w-full touch-none items-center select-none py-2 data-[disabled]:opacity-50', className)}
            {...props}
        >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full border-2 border-neo bg-gray-100">
                <SliderPrimitive.Range className="absolute h-full bg-neo" />
            </SliderPrimitive.Track>
            {_values.map((_, index) => (
                <SliderPrimitive.Thumb
                    key={index}
                    className="block size-5 rounded-full border-2 border-neo bg-white shadow-[2px_2px_0px_#0f172a] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo focus-visible:ring-offset-1 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#0f172a] disabled:pointer-events-none"
                />
            ))}
        </SliderPrimitive.Root>
    );
}

export { NeoSlider };
