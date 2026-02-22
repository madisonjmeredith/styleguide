import { NeoAccordion } from '@/components/neo/neo-accordion';
import { NeoSlider } from '@/components/neo/neo-slider';
import type { StyleGuideConfig } from '@/types';
import { TRANSITION_DURATION_MAX, TRANSITION_DURATION_MIN, TRANSITION_DURATION_STEP } from '../data';

type Props = {
    config: StyleGuideConfig;
    onUpdate: <K extends keyof StyleGuideConfig>(key: K, value: StyleGuideConfig[K]) => void;
};

export function TransitionSection({ config, onUpdate }: Props) {
    return (
        <NeoAccordion title="Transitions">
            <div>
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm/6 font-semibold text-gray-700">Duration</span>
                    <span className="font-mono text-sm font-bold text-gray-500">
                        {config.transitionDuration === 0 ? 'None' : `${config.transitionDuration}ms`}
                    </span>
                </div>
                <NeoSlider
                    min={TRANSITION_DURATION_MIN}
                    max={TRANSITION_DURATION_MAX}
                    step={TRANSITION_DURATION_STEP}
                    value={[config.transitionDuration]}
                    onValueChange={([v]) => onUpdate('transitionDuration', v)}
                />
            </div>
        </NeoAccordion>
    );
}
