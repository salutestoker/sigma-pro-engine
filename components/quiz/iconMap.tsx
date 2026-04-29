import {
    BeakerIcon,
    ChartBarIcon,
    ClockIcon,
    CubeTransparentIcon,
    CurrencyDollarIcon,
    RocketLaunchIcon,
    ShieldCheckIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import type { ComponentProps, ComponentType } from 'react';

import { TraderFitIconKey } from './types';

export const TRADER_FIT_ICON_MAP: Record<
    TraderFitIconKey,
    ComponentType<ComponentProps<'svg'>>
> = {
    spark: SparklesIcon,
    chart: ChartBarIcon,
    clock: ClockIcon,
    shield: ShieldCheckIcon,
    currency: CurrencyDollarIcon,
    rocket: RocketLaunchIcon,
    beaker: BeakerIcon,
    cubes: CubeTransparentIcon,
};
