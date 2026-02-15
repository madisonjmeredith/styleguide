import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { StyleGuideConfig } from '@/types';
import { TRANSITION_DURATION_MAX, TRANSITION_DURATION_MIN, TRANSITION_DURATION_STEP } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function TransitionSection({ config, onUpdate }: Props) {
    return (
        <div className="py-6">
            <Label className="text-base font-semibold text-gray-900 mb-4 block">Transitions</Label>

            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm/6 font-medium text-gray-700">Duration</span>
                    <span className="text-sm font-mono text-gray-500">
                        {config.transitionDuration === 0 ? 'None' : `${config.transitionDuration}ms`}
                    </span>
                </div>
                <Slider
                    min={TRANSITION_DURATION_MIN}
                    max={TRANSITION_DURATION_MAX}
                    step={TRANSITION_DURATION_STEP}
                    value={[config.transitionDuration]}
                    onValueChange={([v]) => onUpdate('transitionDuration', v)}
                />
            </div>
        </div>
    );
}
