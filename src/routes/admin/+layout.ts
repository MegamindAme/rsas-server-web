export const ssr = false;

import { PUBLIC_BASE_URL } from '$env/static/public';
import { PUBLIC_HTTP_SCHEME } from '$env/static/public';
import type { PageLoad } from './$types';
import type {Domain} from "../../interfaces/Domain";

export const load: PageLoad = async ({ fetch }) => {
    const domainsResponse = await fetch(`${PUBLIC_HTTP_SCHEME}${PUBLIC_BASE_URL}/api/domains`);
    const domains = await domainsResponse.json() as Domain[];

    return { domains };
};