<script lang="ts">

    import type {Domain} from "../../interfaces/Domain";
    import ServersModal from "./ServersModal.svelte";
    import DomainDeleteModal from "./DomainDeleteModal.svelte";
    import {writable} from "svelte/store";

    export let domains: Domain[];

    let selectedDomain: Domain;
    let showEditModal = writable(false);
    let showDeleteModal = writable(false);

    function openAddModal() {
        selectedDomain = {} as Domain;
        showEditModal.update(() => true);
    }

    function openEditModal(id) {
        selectedDomain = domains.find((d) => d.id == id);
        showEditModal.update(() => true);
    }

    function openDeleteModal(id) {
        selectedDomain = domains.find((d) => d.id == id);
        showDeleteModal.update(() => true);
    }

    showEditModal.subscribe(() => {
        domains = domains;
    })


</script>


<div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
    <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
            <h3 class="font-semibold text-base text-blueGray-700">
                Servers
            </h3>
            <button class="bg-green-400 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" on:click={openAddModal}>
                <i class="fa fa-plus"></i>
            </button>

        </div>
    </div>
    <div class="block w-full overflow-x-auto">
        <!-- Projects table -->
        <table class="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
                <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                    Name
                </th>
                <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                    Rsas Domain
                </th>
                <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                    Web Domain
                </th>
                <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                    Actions
                </th>
            </tr>
            </thead>
            <tbody>
            {#each domains as domain}
                <tr>
                    <th
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
                    >
                        {domain.name}
                    </th>
                    <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                        {domain.rsasDomain}
                    </td>
                    <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                        {domain.apiDomain}
                    </td>
                    <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                        <div class="flex items-center justify-between px-6">
                            <button on:click={() => openEditModal(domain.id)} type="button"
                                    class="text-red-500 hover:text-red-600"><i
                                    class="fas fa-edit"></i></button>
                            <button on:click={() => openDeleteModal(domain.id)} type="button"
                                    class="text-red-500 hover:text-red-600"><i
                                    class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

<ServersModal domain={selectedDomain} showModal={showEditModal}></ServersModal>

<DomainDeleteModal id={selectedDomain?.id} domainName={selectedDomain?.name}
                   showModal={showDeleteModal}></DomainDeleteModal>
