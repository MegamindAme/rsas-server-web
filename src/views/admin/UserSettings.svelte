<script lang="ts">
    import {route} from '../../lib/ROUTES';
    import {superForm} from "sveltekit-superforms/client";
    import {EmailZodSchema} from "../../lib/validations/authZodShemas";
    import {toast} from "svelte-sonner";

    import type {PageData} from './$types';

    export let data: PageData;
console.log(data)
    const {enhance, form, errors, message} = superForm(data?.emailZodSchema, {
        resetForm: true,
        taintedMessage: null,
        validators: EmailZodSchema,

        onUpdated: () => {
            if (!$message) return;

            const {alertType, alertText} = $message;

            if (alertType === 'error') {
                toast.error(alertText);
            }
        }
    });

    function pData() {
        let {enhance, form, errors} = superForm(data?.passwordZodSchema, {
            resetForm: true,
            taintedMessage: null,
            validators: EmailZodSchema
        });

        return {penhance: enhance, perrors: errors, form: form}
    }

    const {penhance, perrors} = pData();
</script>

<form method="post" action={route('changePassword /profile')}>
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
            <div class="bg-blueGray-50 my-6 py-3 px-6 relay-details-container">
                <div class="flex flex-wrap relay-details relative">
                    <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                   for="grid-new-password">
                                <sub>New Password</sub>
                            </label>
                            {#if $perrors?.password}
                                <p class="text-red-500">{$perrors?.password}</p>
                            {/if}
                            <input id="grid-new-password"
                                   name="newPassword"
                                   type="password"
                                   class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                   placeholder="new password"
                                   required/>
                        </div>
                    </div>

                    <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                   for="grid-confirm-new-password">
                                <sub>Confirm New Password</sub>
                            </label>
                            <input id="grid-confirm-new-password"
                                   name="confirmNewPassword"
                                   type="password"
                                   class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                   placeholder="confirm new password"
                                   required/>
                        </div>
                    </div>

                    <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                   for="grid-old-password">
                                <sub>Old Password</sub>
                            </label>
                            <input id="grid-old-password"
                                   name="password"
                                   type="password"
                                   class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                   placeholder="old password"
                                   required/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</form>

<form method="post" use:enhance action={route('changeUsername /profile')}>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div class="rounded-t bg-white mb-0 px-6 py-6">
            <div class="text-center flex justify-between">
                <h6 class="text-blueGray-700 text-xl font-bold">Change username</h6>
                <button class="bg-green-400 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="submit">
                    Save
                </button>
            </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="bg-blueGray-50 my-6 py-3 px-6 relay-details-container">
                <div class="flex flex-wrap relay-details relative">
                    <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                   for="grid-new-username">
                                <sub>New Username</sub>
                            </label>
                            {#if $errors.email}
                                <p class="text-red-500">{$errors.email}</p>
                            {/if}
                            <input id="grid-new-username"
                                   name="email"
                                   type="email"
                                   class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                   placeholder="new username"
                                   bind:value={$form.email}
                                   required/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</form>
