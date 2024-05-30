<script lang="ts">
    export let port = "";
    export let bindAddress = "0.0.0.0";
    export let index;
    export let deleteSocket;

    function handleAddressChange(e) {
        bindAddress = e.target.value;
    }

    function handlePortChange(e) {
        port = e.target.value;
    }

    function deleteSock(){
        deleteSocket(index);
    }
</script>

<div class="flex flex-wrap">
    <div class="w-full lg:w-5/12 px-4">
        <div class="relative w-full mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                   for="grid-port">
                <sub>Port</sub>
            </label>
            <input id="grid-port"
                   type="number"
                   class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                   value={port ?? ""}
                   placeholder="port"
                   required
                   on:change={handlePortChange}/>
        </div>
    </div>
    <div class="w-full lg:w-5/12 px-4">
        <div class="relative w-full mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                   for="grid-address">
                <sub>Bind Address</sub>
            </label>
            <input id="grid-address"
                   type="text"
                   class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                   value={bindAddress}
                   placeholder="bind-address"
                   required
                   on:change={handleAddressChange}/>
        </div>
    </div>
    <div class="w-full lg:w-2/12 px-4 flex items-center text-center">
        <div class="relative w-full">
            <button on:click={deleteSock} type="button" class="text-red-500 hover:text-red-600"><i class="fas fa-trash"></i></button>
        </div>
    </div>
</div>