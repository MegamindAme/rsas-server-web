<script lang="ts">
  export let relay;

  export let deleteRelay;
  export let index;
  export let mounts;

  function handleChangeUrl(e) {
    relay.url = e.target.value;
  }

  function handleChangeLocalMount(e) {
    relay["local-mount"] = e.target.value;
  }

  function handleChangeOnDemand(e) {
    relay["on-demand"] = e.target.checked ? 1 : 0;
  }
  
  function handleChangeAutoStop(e) {
    relay["auto-stop"] = e.target.checked ? 1 : 0;
  }

  function handleChangeHlsRelay(e) {
    relay["hls-relay"] = e.target.checked ? 1 : 0;
  }


  function deleterelay() {
    deleteRelay(index);
  }
</script>
<div class="bg-blueGray-50 my-6 py-3 px-6 relay-details-container">
  <input id="toggle-relay-{index}" class="relay-toggle" type="checkbox">
  <label for="toggle-relay-{index}" class="relay-summary-label">
    {relay.url ?? ""}
  </label>
  <div class="flex flex-wrap relay-details relative">
    <div class="w-full lg:w-6/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-relayurl">
          <sub>Relay url</sub>
        </label>
        <input id="grid-relayurl"
               type="text"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={relay.url ?? ""}
               placeholder="relay url"
               required
               on:change={handleChangeUrl}/>
      </div>
    </div> <!-- relay url-->
    <div class="w-full lg:w-6/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-localmount">
          <sub>Local Mount</sub>
        </label>
        <select id="grid-localmount" on:change={handleChangeLocalMount} value={relay["local-mount"]}>
          <option value="">--</option>
          {#each mounts as r}
            <option value={r}>{r}</option>
          {/each}
        </select>
      </div>
    </div> <!-- local mount-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-on-demand">
          <sub>On demand</sub>
        </label>
        <input id="grid-on-demand"
               type="checkbox"
               style="width: initial"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               checked={relay["on-demand"] === 1}
               on:change={handleChangeOnDemand}/>
      </div>
    </div> <!-- on demand-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-auto-stop">
          <sub>Auto stop</sub>
        </label>
        <input id="grid-auto-stop"
               type="checkbox"
               style="width: initial"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               checked={relay["auto-stop"] === 1}
               on:change={handleChangeAutoStop}/>
      </div>
    </div> <!-- auto stop-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-hls-relay">
          <sub>Enable Hls</sub>
        </label>
        <input id="grid-hls-relay"
               type="checkbox"
               style="width: initial"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               checked={relay["hls-relay"] === 1}
               on:change={handleChangeHlsRelay}/>
      </div>
    </div> <!-- hls relay-->

    <div class="w-full lg:w-2/12 py-6 flex items-center text-center absolute bottom-0 right-0">
      <div class="relative w-full">
        <button on:click={deleterelay} type="button" class="text-red-500 hover:text-red-600"><i
                class="fas fa-trash"></i></button>
      </div>
    </div>
  </div>
</div>

<style>
  .relay-details-container {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .relay-toggle {
    appearance: none;
    display: none;
  }

  .relay-summary-label {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    cursor: pointer;
    font-weight: bold;
    margin: 15px 0;
  }

  .relay-toggle+label:before {
    content: "⯈";
    display: inline-block;
    text-align: right;
    transition: transform .5s;
    transform: rotate(90deg);
  }

  .relay-toggle:checked+label:before {
    transform: rotate(270deg);
  }

  .relay-toggle~.relay-details {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height .5s, opacity .5s;
  }

  .relay-toggle:checked~.relay-details {
    max-height: 100vh;
    opacity: 1;
  }


</style>