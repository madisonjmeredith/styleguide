import { cn } from '@/lib/utils';
import { neo } from './neo-utils';

type Option<T extends string> = {
    id: T;
    label: string;
    description?: string;
};

type Props<T extends string> = {
    name: string;
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    className?: string;
};

function NeoRadioButton<T extends string>({ name, options, value, onChange, className }: Props<T>) {
    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            {options.map((opt) => (
                <label
                    key={opt.id}
                    className={cn(
                        'flex items-center gap-3 py-2.5 px-3 cursor-pointer border-2 transition-all duration-100',
                        neo.radius,
                        value === opt.id
                            ? 'bg-neo-light border-neo'
                            : 'border-transparent hover:bg-gray-50 hover:border-gray-300',
                    )}
                >
                    <div
                        className={cn(
                            'size-4 rounded-full border-2 flex items-center justify-center shrink-0',
                            value === opt.id ? 'border-neo' : 'border-gray-300',
                        )}
                    >
                        {value === opt.id && <div className="size-2 rounded-full bg-neo" />}
                    </div>
                    <div>
                        <div className="text-sm/6 font-medium text-gray-700">{opt.label}</div>
                        {opt.description && <div className="text-xs text-gray-400">{opt.description}</div>}
                    </div>
                    <input
                        type="radio"
                        name={name}
                        value={opt.id}
                        checked={value === opt.id}
                        onChange={() => onChange(opt.id)}
                        className="sr-only"
                    />
                </label>
            ))}
        </div>
    );
}

export { NeoRadioButton };
