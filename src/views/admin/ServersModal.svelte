<script lang="ts">
    import type {Domain} from "../../interfaces/Domain";
    import {PUBLIC_BASE_URL, PUBLIC_HTTP_SCHEME} from "$env/static/public";

    export let showModal;
    export let domain: Domain;

    let errorMessage = "";

    function toggleModal() {
        showModal.update(() => false);
    }

    async function submit(e) {
        e.preventDefault();

        if (!isSubmissionOk()) return;

        const url = `${PUBLIC_HTTP_SCHEME}${PUBLIC_BASE_URL}/api/domains`;

        try {
            const response = await fetch(url, {
                method: domain?.id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(domain),
            });

            if (response.ok) {
                location.reload();
            }
        } catch (error) {
            console.log(error);
            errorMessage = error;
        }

    }

    function isSubmissionOk() {
        errorMessage = "";

        if (!domain?.name) {
            errorMessage = "The name cannot be empty";
        } else if (!domain?.rsasDomain) {
            errorMessage = "The rsas Domain cannot be empty";
        } else if (!domain?.apiDomain) {
            errorMessage = "The web Domain cannot be empty";
        } else if (domain?.name == "main_server") {
            errorMessage = "Name: main_server is a reserved name, use another name";
        }

        return errorMessage === "";
    }

    function handleChangeServerName(e) {
        domain.name = e.target.value;
    }

    function handleChangeRsasDomain(e) {
        domain.rsasDomain = e.target.value;
    }

    function handleChangeWebDomain(e) {
        domain.apiDomain = e.target.value;
    }

</script>

{#if $showModal}
    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-1/3 my-6 mx-auto max-w-3xl">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 class="text-3xl font-semibold">
                        {#if domain.id}
                            Edit domain: {domain.name ?? ""}
                        {:else}
                            Add new domain
                        {/if}
                    </h3>
                </div>
                <form on:submit={submit}>
                    <!--body-->
                    <div class="relative p-6 flex-auto">

                        {#if errorMessage}
                            <p class="my-4 text-red-500 text-lg leading-relaxed">
                                {errorMessage}
                            </p>
                        {/if}

                        <div class="w-full px-4">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                       for="grid-server_name">
                                    <sub>Server Name</sub>
                                </label>
                                <input id="grid-server_name"
                                       type="text"
                                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                       value={domain?.name ?? ""}
                                       placeholder="server name"
                                       required
                                       on:change={handleChangeServerName}/>
                            </div>
                        </div> <!-- server name-->
                        <div class="w-full px-4">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                       for="grid-rsasDomain">
                                    <sub>Rsas Domain</sub>
                                </label>
                                <input id="grid-rsasDomain"
                                       type="text"
                                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                       value={domain?.rsasDomain ?? ""}
                                       placeholder="web domain"
                                       required
                                       on:change={handleChangeRsasDomain}/>
                            </div>
                        </div> <!-- rsas domain-->
                        <div class="w-full px-4">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                       for="grid-webDomain">
                                    <sub>Web Domain</sub>
                                </label>
                                <input id="grid-webDomain"
                                       type="text"
                                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                       value={domain?.apiDomain ?? ""}
                                       placeholder="web domain"
                                       required
                                       on:change={handleChangeWebDomain}/>
                            </div>
                        </div> <!-- web domain-->
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button" on:click={toggleModal}>
                            Close
                        </button>
                        <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
{/if}