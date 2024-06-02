<script lang="ts">
    import CardStats from '../Cards/CardStats.svelte'
    import type {Health} from '../../interfaces/Health';
    import {PUBLIC_RSAS_BASE_URL} from "$env/static/public";
    import {onMount} from 'svelte';

    export let data: Health;

    async function fetchData() {
        const res = await fetch(`${PUBLIC_RSAS_BASE_URL}/health`);
        data = await res.json() as Health;
    }

    onMount(() => {
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    })

    setInterval
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
                            statTitle={data.total_listener_count}
                            statIconName="far fa-chart-bar"
                            statIconColor="bg-red-500"
                    />
                </div>
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                            statSubtitle="Total Streams"
                            statTitle={Object.keys(data?.mounts)?.length}
                            statArrow="down"
                            statPercentColor="text-red-500"
                            statIconName="fas fa-chart-pie"
                            statIconColor="bg-orange-500"
                    />
                </div>
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                            statSubtitle="Server Counts"
                            statTitle="1"
                            statArrow="down"
                            statPercentColor="text-orange-500"
                            statIconName="fas fa-users"
                            statIconColor="bg-pink-500"
                    />
                </div>
                <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                            statSubtitle="Main Server Performance"
                            statTitle="--"
                            statPercentColor="text-emerald-500"
                            statIconName="fas fa-percent"
                            statIconColor="bg-emerald-500"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
