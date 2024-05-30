<script lang="ts">
    import {PUBLIC_BASE_URL} from "$env/static/public"
    import ListenSettings from "../../components/Settings/ListenSettings.svelte"
    import RelaySettings from "../../components/Settings/RelaySettings.svelte"
    import MountSettings from "../../components/Settings/MountSettings.svelte"
    import type {IceCastRoot, Mount, Relay, ListenSocket} from "../../interfaces/Icecast";

    export let data: IceCastRoot;

    if (!Array.isArray(data.icecast["listen-socket"]) && data.icecast["listen-socket"] != undefined){
        let l = data.icecast["listen-socket"] as ListenSocket;
        data.icecast["listen-socket"] = [l] as ListenSocket[];
    }

    if (!Array.isArray(data.icecast.mount) && data.icecast.mount != undefined){
        let m = data.icecast.mount as Mount;
        data.icecast.mount = [m] as Mount[];
    }

    if (!Array.isArray(data.icecast.relay) && data.icecast.relay != undefined){
        let r = data.icecast.relay as Relay;
        data.icecast.relay = [r] as Relay[];
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch(`${PUBLIC_BASE_URL}/api/rsas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log(response);
    }
</script>

<form on:submit={handleSubmit}>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div class="rounded-t bg-white mb-0 px-6 py-6">
            <div class="text-center flex justify-between">
                <h6 class="text-blueGray-700 text-xl font-bold">Rsas Settings</h6>
                <button class="bg-green-400 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="submit">
                    Save
                </button>
            </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <ListenSettings bind:listenSocket={data.icecast["listen-socket"]}></ListenSettings>
            <hr>
            <MountSettings bind:mounts={data.icecast.mount}></MountSettings>
            <hr>
            <RelaySettings bind:mounts={data.icecast.mount} bind:relays={data.icecast.relay}></RelaySettings>
            <hr>
        </div>
    </div>
</form>
