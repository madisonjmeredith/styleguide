import { cn } from '@/lib/utils';
import { neo } from './neo-utils';

type Option<T extends string> = {
    id: T;
    label: string;
};

type Props<T extends string> = {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    className?: string;
};

function NeoRadioCards<T extends string>({ options, value, onChange, className }: Props<T>) {
    return (
        <div className={cn('flex gap-1.5', className)}>
            {options.map((opt) => (
                <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange(opt.id)}
                    className={cn(
                        'flex-1 py-2 px-1.5 text-sm cursor-pointer border-2 transition-all duration-100',
                        neo.radius,
                        value === opt.id
                            ? 'bg-neo text-white border-neo font-semibold shadow-none'
                            : cn('bg-white text-gray-600 border-gray-300', neo.focus, 'hover:border-neo hover:text-neo'),
                    )}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

export { NeoRadioCards };
export type { Option as NeoRadioCardOption };
