<script lang="ts">
    import ListenSettings from "../../components/Settings/ListenSettings.svelte"
    import MountSettings from "../../components/Settings/MountSettings.svelte"
    import type {Icecast} from "../../interfaces/Icecast";

    export let data: Icecast;

    function handleSubmit(event) {
        event.preventDefault();

        console.log(data);
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
            <ListenSettings bind:listenSocket={data["listen-socket"]}></ListenSettings>
            <hr>
            <MountSettings bind:mounts={data.mount}></MountSettings>
            <hr>
        </div>
    </div>
</form>
