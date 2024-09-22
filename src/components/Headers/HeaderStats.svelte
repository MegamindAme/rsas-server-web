<script lang="ts">
    import CardStats from '../Cards/CardStats.svelte'
    import type {Health} from '../../interfaces/Health';
    import {PUBLIC_BASE_URL, PUBLIC_HTTP_SCHEME, PUBLIC_RSAS_BASE_URL} from "$env/static/public";
    import {onMount} from 'svelte';
    import type {Domain} from "../../interfaces/Domain";

    export let domains: Domain[];

    let domainUrls: string[];
    let total_listener_count = 0;
    let total_mounts_count = 0;
    let total_servers_count = 0;

    async function fetchData() {
        let listener_count = 0;
        let mounts_count = 0;
        let servers_count = 0;

        for (const key in domainUrls) {
            try {
                let url = (key == 0 ? `${domainUrls[key]}/health` : `${PUBLIC_HTTP_SCHEME}${PUBLIC_BASE_URL}/api/domains/route?domain=${domainUrls[key]}/health`);
                const res = await fetch(url);

                if (res.ok) {
                    let health = await res.json() as Health;

                    listener_count += health.total_listener_count ?? 0;
                    mounts_count = health.total_source_count ?? 0;
                    servers_count++;
                }
            } catch (error) {
                console.log(error);
            }
        }

        total_listener_count = listener_count;
        total_mounts_count = mounts_count;
        total_servers_count = servers_count;
    }

    onMount(() => {
        const intervalId = setInterval(fetchData, 5000);

        domainUrls = [(PUBLIC_HTTP_SCHEME + PUBLIC_RSAS_BASE_URL), ...domains.map((d) => PUBLIC_HTTP_SCHEME + d.rsasDomain)];

        fetchData();

        return () => clearInterval(intervalId);
    })
</script>

<!-- Header -->
<div class="relative bg-red-500 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
        <div>
            <!-- Card stats -->
            <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                            statSubtitle="Live Total Listeners"
                            statTitle={total_listener_count}
                            statIconName="far fa-chart-bar"
                            statIconColor="bg-red-500"
                    />
                </div>
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                            statSubtitle="Total Active Streams"
                            statTitle={total_mounts_count}
                            statArrow="down"
                            statPercentColor="text-red-500"
                            statIconName="fas fa-chart-pie"
                            statIconColor="bg-orange-500"
                    />
                </div>
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                            statSubtitle="Total Active Servers"
                            statTitle={total_servers_count}
                            statArrow="down"
                            statPercentColor="text-red-500"
                            statIconName="fas fa-server"
                            statIconColor="bg-orange-500"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
