<script lang="ts">
    import type {ListenSocket} from "../../interfaces/Icecast";
    import Socket from "./Socket.svelte";

    export let listenSocket: ListenSocket[];

    function handleButton(){
        let sock = {  port: "", "bind-address": "0.0.0.0"} as ListenSocket;

        let l = listenSocket;
        l.push(sock);

        listenSocket = l;
    }

    function deleteSocket(i){
        let d = listenSocket;
        d.splice(i, 1);

        listenSocket = d;
    }
</script>

<div class="text-center flex justify-between items-center">
    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Listen Sockets
    </h6>
    <div>
        <button on:click={handleButton}
                class="bg-green-400 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button">
            Add Socket
        </button>
    </div>
</div>

{#if listenSocket}
    {#each listenSocket as socket, index (socket)}
        <Socket bind:port={socket.port} bind:bindAddress={socket["bind-address"]} deleteSocket={deleteSocket} index={index}></Socket>
    {/each}
{/if}
