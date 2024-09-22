<script lang="ts">
    import Dashboard from '../../../views/admin/Dashboard.svelte';
    import {getContext} from "svelte";
    import type {Health} from "../../../interfaces/Health";
    import {PUBLIC_HTTP_SCHEME, PUBLIC_BASE_URL, PUBLIC_RSAS_BASE_URL} from '$env/static/public';

    const currentRsasDomain = getContext('currentRsasDomainValue');

    let health: Health;

    async function fetchHealth() {
        try {
            const url = $currentRsasDomain.includes(PUBLIC_RSAS_BASE_URL) ? `${$currentRsasDomain}/health` : `${PUBLIC_HTTP_SCHEME}${PUBLIC_BASE_URL}/api/domains/route?domain=${$currentRsasDomain}/health`;
            const res = await fetch(url);
            let h = await res.json() as Health;
            health = h;
        } catch (error) {
            console.log(error);
        }
    }

    currentRsasDomain.subscribe(() => fetchHealth());
</script>

<Dashboard data={health}></Dashboard>
