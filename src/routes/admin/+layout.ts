export const ssr = false;

import { PUBLIC_RSAS_BASE_URL } from '$env/static/public';
import type { PageLoad } from './$types';
import type { Health } from '../../interfaces/Health'

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${PUBLIC_RSAS_BASE_URL}/health`);
    const item = await res.json() as Health;

    return { item } ;
};