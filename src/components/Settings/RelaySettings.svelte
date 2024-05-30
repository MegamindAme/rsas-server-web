<script lang="ts">
    import type {Mount, Relay} from "../../interfaces/Icecast";
    import Relay from "./Relay.svelte";

    export let relays: Relay[];
    export let mounts: Mount[];
    let mountsName = mounts != undefined ? mounts.map((m) => m["mount-name"]) : [];

    function handleButton() {
        let rel = {} as Relay;

        if (relays == undefined){
            relays = [{}] as Relay[]
        } else {
            let r = relays;
            r.push(rel);

            relays = r;
        }
    }

    function deleteRelay(i) {
        let d = relays;
        d.splice(i, 1);

        relays = d;
    }


</script>

<div class="text-center flex justify-between items-center">
    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Relays
    </h6>
    <div>
        <button on:click={handleButton}
                class="bg-green-400 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button">
            Add Relay
        </button>
    </div>
</div>

{#if relays}
    {#each relays as relay, index (relay)}
        {#if relay}
            <Relay
                    index={index}
                    bind:relay={relay}
                    deleteRelay={deleteRelay}
                    mounts={mountsName}
            ></Relay>
        {/if}
    {/each}
{/if}
