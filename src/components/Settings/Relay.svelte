<script lang="ts">
  export let mount;

  export let deleteMount;
  export let index;
  export let mounts;

  function handleChangeMountName(e) {
    mount["mount-name"] = e.target.value;
  }

  function handleChangeUsername(e) {
    mount.username = e.target.value;
  }

  function handleChangePassword(e) {
    mount.password = e.target.value;
  }

  function handleChangeMaxListeners(e) {
    mount["max-listeners"] = e.target.value;
  }

  function handleChangeFallbackMount(e) {
    mount["fallback-mount"] = e.target.value;
  }

  function handleChangeFallbackOverride(e) {
    mount["fallback-override"] = e.target.checked ? 1 : 0;
  }

  function handleChangeFallbackWhenFull(e) {
    mount["fallback-when-full"] = e.target.checked ? 1 : 0;
  }

  function handleChangeMaxListenerDuration(e) {
    mount["max-listener-duration"] = e.target.value;
  }

  function handleChangeHealthPassword(e) {
    mount["health-password"] = e.target.value;
  }

  function handleChangeHls(e) {
    mount.hls = e.target.checked ? 1 : 0;
  }

  function handleChangePreroll(e) {
    mount.preroll = e.target.value;
  }

  function handleChangePostroll(e) {
    mount.postroll = e.target.value;
  }

  function handleChangeType(e) {
    mount.type = e.target.value;
  }

  function handleChangeBitrate(e) {
    mount.bitrate = e.target.value;
  }

  function handleChangeChannels(e) {
    mount.channels = e.target.value;
  }

  function handleChangeSamplerate(e) {
    mount.samplerate = e.target.value;
  }


  function deletemount() {
    deleteMount(index);
  }
</script>
<div class="bg-blueGray-50 my-6 py-3 px-6 details-container">
  <input id="toggle{index}" class="toggle" type="checkbox">
  <label for="toggle{index}" class="summary-label">
    {mount["mount-name"] ?? ""}
  </label>
  <div class="flex flex-wrap details relative">
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-mountname">
          <sub>Mount Name</sub>
        </label>
        <input id="grid-mountname"
               type="text"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount["mount-name"] ?? ""}
               placeholder="mount name"
               required
               on:change={handleChangeMountName}/>
      </div>
    </div> <!-- mount name-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-username">
          <sub>Username</sub>
        </label>
        <input id="grid-username"
               type="text"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount.username ?? ""}
               placeholder="user name"
               on:change={handleChangeUsername}/>
      </div>
    </div> <!-- username-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
          <sub>Password</sub>
        </label>
        <input id="grid-password"
               type="text"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount.password ?? ""}
               placeholder="password"
               on:change={handleChangePassword}/>
      </div>
    </div> <!-- password-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-maxlisteners">
          <sub>Max Listeners</sub>
        </label>
        <input id="grid-maxlisteners"
               type="number"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount["max-listeners"]}
               placeholder="max listeners"
               on:change={handleChangeMaxListeners}/>
      </div>
    </div> <!-- max listeners-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-maxlistenerduration">
          <sub>Max listener duration in (s)</sub>
        </label>
        <input id="grid-maxlistenerduration"
               type="number"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount["max-listener-duration"]}
               placeholder="Max Listeners duration"
               on:change={handleChangeMaxListenerDuration}/>
      </div>
    </div> <!-- max listener duration-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-fallbackmount">
          <sub>Fallback Mount</sub>
        </label>
        <select id="grid-fallbackmount" on:change={handleChangeFallbackMount} value={mount["fallback-mount"]}>
          <option value="">--</option>
          {#each mounts as m}
            <option value={m}>{m}</option>
          {/each}
        </select>
      </div>
    </div> <!-- fix fallback mount-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-fallbackoverride">
          <sub>Fallback Override</sub>
        </label>
        <input id="grid-fallbackoverride"
               style="width: initial"
               type="checkbox"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               checked={mount["fallback-override"] === 1}
               placeholder="fallback override"
               on:change={handleChangeFallbackOverride}/>
      </div>
    </div> <!-- fall back override-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-samplerate">
          <sub>Fall back when full</sub>
        </label>
        <input id="grid-fallbackwhenfull"
               type="checkbox"
               style="width: initial"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               checked={mount["fallback-when-full"] === 1}
               placeholder="Fall back when full"
               on:change={handleChangeFallbackWhenFull}/>
      </div>
    </div> <!-- fallback when full-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-healthpassword">
          <sub>Health password</sub>
        </label>
        <input id="grid-healthpassword"
               type="text"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount["health-password"] ?? ""}
               placeholder="Health password"
               on:change={handleChangeHealthPassword}/>
      </div>
    </div> <!-- health password-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-hls">
          <sub>Serve as hls</sub>
        </label>
        <input id="grid-hls"
               type="checkbox"
               style="width: initial"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               checked={mount.hls === 1}
               on:change={handleChangeHls}/>
      </div>
    </div> <!-- hls-->

    <!--    Ad insertion -->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-pre-roll">
          <sub>Pre roll audio</sub>
        </label>
        <input id="grid-pre-roll"
               type="text"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount.preroll ?? ""}
               on:change={handleChangePreroll}/>
      </div>
    </div> <!-- pre roll-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-post-roll">
          <sub>Post roll audio</sub>
        </label>
        <input id="grid-post-roll"
               type="text"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount.postroll ?? ""}
               on:change={handleChangePostroll}/>
      </div>
    </div> <!-- post roll-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-type">
          <sub>Audio type (e.g audio/mpeg)</sub>
        </label>
        <input id="grid-type"
               type="text"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount.type ?? ""}
               placeholder="audio type"
               on:change={handleChangeType}/>
      </div>
    </div> <!-- audio type-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-bitrate">
          <sub>Bitrate</sub>
        </label>
        <input id="grid-bitrate"
               type="number"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount.bitrate}
               on:change={handleChangeBitrate}/>
      </div>
    </div> <!-- bitrate channels-->
    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-channels">
          <sub>Channels</sub>
        </label>
        <input id="grid-channels"
               type="number"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount.channels}
               on:change={handleChangeChannels}/>
      </div>
    </div> <!-- bitrate channels-->


    <div class="w-full lg:w-4/12 px-4">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-samplerate">
          <sub>Samplerate</sub>
        </label>
        <input id="grid-samplerate"
               type="number"
               class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
               value={mount.samplerate}
               placeholder="sample rate"
               on:change={handleChangeSamplerate}/>
      </div>
    </div> <!-- sample rate-->


    <div class="w-full lg:w-2/12 py-6 flex items-center text-center absolute bottom-0 right-0">
      <div class="relative w-full">
        <button on:click={deletemount} type="button" class="text-red-500 hover:text-red-600"><i
                class="fas fa-trash"></i></button>
      </div>
    </div>
  </div>
</div>

<style>
  .details-container {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .toggle {
    appearance: none;
    display: none;
  }

  .summary-label {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    cursor: pointer;
    font-weight: bold;
    margin: 15px 0;
  }

  .toggle+label:before {
    content: "⯈";
    display: inline-block;
    text-align: right;
    transition: transform .5s;
    transform: rotate(90deg);
  }

  .toggle:checked+label:before {
    transform: rotate(270deg);
  }

  .toggle~.details {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height .5s, opacity .5s;
  }

  .toggle:checked~.details {
    max-height: 100vh;
    opacity: 1;
  }


</style>