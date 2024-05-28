export const ssr = false;

import type { PageLoad } from './$types';
import type { Health } from '../../../interfaces/Health'

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`http://qcell.megamindame.xyz:8000/health`);
    const item = await res.json() as Health;

    return { item } ;
};