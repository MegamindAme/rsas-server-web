export const ssr = false;

import { PUBLIC_BASE_URL } from '$env/static/public';
import type { PageLoad } from './$types';
import type { IceCastRoot } from '../../../interfaces/Icecast'

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${PUBLIC_BASE_URL}/api/rsas`);
    const icecast = await res.json() as IceCastRoot;

    return { icecast };
};