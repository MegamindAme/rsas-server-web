<script lang="ts">
    import {PUBLIC_BASE_URL, PUBLIC_HTTP_SCHEME} from "$env/static/public";

    export let showModal;
    export let id: number;
    export let domainName: string;

    let errorMessage = "";

    function closeModal() {
        showModal.update(() => false)
    }

    async function submit() {
        const url = `${PUBLIC_HTTP_SCHEME}${PUBLIC_BASE_URL}/api/domains`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id}),
            });

            if (response.ok) {
                showModal.update(() => false)
                location.reload();
            }
        } catch (error) {
            console.log(error);
            errorMessage = error;
        }
    }

</script>

{#if $showModal}
    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 class="text-3xl font-semibold">
                        Delete Domain
                    </h3>
                    <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            on:click={closeModal}>
          <span class="bg-black text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
            ×
          </span>
                    </button>
                </div>
                <!--body-->
                <div class="relative p-6 flex-auto">
                    <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Are you sure you want to delete domain: {domainName}
                    </p>

                    {#if errorMessage}
                        <p class="my-4 text-red-500 text-lg leading-relaxed">
                            {errorMessage}
                        </p>
                    {/if}
                </div>

                <!--footer-->
                <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" on:click={closeModal}>
                        Close
                    </button>
                    <button class="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" on:click={submit}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
{/if}