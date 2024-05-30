<script lang="ts">
  import type {Mount} from "../../interfaces/Icecast";
  import Mount from "./Mount.svelte";

  export let mounts: Mount[];
  let mountsName = mounts.map((m) => m["mount-name"]);

  function handleButton() {
    let sock = {} as Mount;

    let l = mounts;
    l.push(sock);

    mounts = l;
  }

  function deleteMount(i) {
    let d = mounts;
    d.splice(i, 1);

    mounts = d;
  }


</script>

<div class="text-center flex justify-between items-center">
  <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
    Mounts
  </h6>
  <div>
    <button on:click={handleButton}
            class="bg-green-400 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button">
      Add Mount
    </button>
  </div>
</div>

{#if mounts}
  {#each mounts as mount, index (mount)}
    <Mount
            index={index}
            bind:mount={mount}
            deleteMount={deleteMount}
            mounts={mountsName}
    ></Mount>
  {/each}
{/if}
