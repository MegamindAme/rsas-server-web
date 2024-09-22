<script lang="ts">
    import Settings from '../../../views/admin/Settings.svelte';
    import {getContext} from "svelte";
    import {PUBLIC_HTTP_SCHEME, PUBLIC_BASE_URL} from '$env/static/public';
    import type {IceCastRoot} from "../../../interfaces/Icecast";

    let currentApiDomain = getContext('currentApiDomainValue');

    let icecast: IceCastRoot;

    async function fetchIceCast() {
        try {
            const url = $currentApiDomain.includes(PUBLIC_BASE_URL) ? `${$currentApiDomain}/api/rsas` : `${PUBLIC_HTTP_SCHEME}${PUBLIC_BASE_URL}/api/domains/route?domain=${$currentApiDomain}/api/rsas`;
            const res = await fetch(url);
            let i = await res.json() as IceCastRoot;
            icecast = i;
        } catch (error) {
            console.log(error);
        }
    }

    currentApiDomain.subscribe(() => {
        icecast = undefined;
        fetchIceCast()
    });
</script>

{#if icecast}
    <Settings data={icecast}></Settings>
{/if}
