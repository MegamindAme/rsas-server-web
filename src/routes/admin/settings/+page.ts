export const ssr = false;

import { PUBLIC_BASE_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${PUBLIC_BASE_URL}/api/rsas`);
    const icecast = await res.json();

    return { icecast };
};