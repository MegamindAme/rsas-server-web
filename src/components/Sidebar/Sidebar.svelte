<script lang="ts">
    // core ../components
    import {route} from '../../lib/ROUTES';
    import {enhance} from '$app/forms';
    import {PUBLIC_RSAS_BASE_URL, PUBLIC_HTTP_SCHEME, PUBLIC_BASE_URL} from '$env/static/public';
    import type {Domain} from "../../interfaces/Domain";
    import {getContext, setContext} from 'svelte';
    import { page } from '$app/stores';

    let collapseShow = 'hidden';

    export let domains: Domain[];

    const main_server = "main_server";

    let currentRsasDomain = getContext('currentRsasDomainValue');
    let currentApiDomain = getContext('currentApiDomainValue');

    function handleDomainChange(e) {
        const value = e.target.value;

        let rsasDomain;
        let apiDomain;

        if (value == main_server) {
            rsasDomain = PUBLIC_RSAS_BASE_URL;
            apiDomain = PUBLIC_BASE_URL;
        } else {
            let domain = domains.find((d) => d.name == value);

            rsasDomain = domain.rsasDomain;
            apiDomain = domain.apiDomain;
        }

        currentRsasDomain.update(() => PUBLIC_HTTP_SCHEME + rsasDomain);
        currentApiDomain.update(() => PUBLIC_HTTP_SCHEME + apiDomain);
    }

    function toggleCollapseShow(classes) {
        collapseShow = classes;
    }
    
</script>

<nav
        class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
>
    <div
            class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
        <!-- Toggler -->
        <button
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                type="button"
                on:click={() => toggleCollapseShow('bg-white m-2 py-3 px-6')}
        >
            <i class="fas fa-bars"></i>
        </button>
        <!-- Brand -->
        <a

                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                href="/"
        >
            QCell Streaming
        </a>
        <!-- Collapse -->
        <div
                class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
        >
            <!-- Collapse header -->
            <div
                    class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
            >
                <div class="flex flex-wrap">
                    <div class="w-6/12">
                        <a

                                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                href="/"
                        >
                            QCell Streaming
                        </a>
                    </div>
                    <div class="w-6/12 flex justify-end">
                        <button
                                type="button"
                                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                on:click={() => toggleCollapseShow('hidden')}
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Form -->
            <form class="mt-6 mb-4 md:hidden">
                <div class="mb-3 pt-0">
                    <input
                            type="text"
                            placeholder="Search"
                            class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                    />
                </div>
            </form>

            <!-- Divider -->
            <hr class="my-4 md:min-w-full"/>

            <div class="my-2 font-bold"><h4>Domains</h4></div>
            <select class="my-2" id="domains" on:change={handleDomainChange} value={main_server}>
                <option value={main_server}>Main - {PUBLIC_RSAS_BASE_URL}</option>
                {#each domains as d}
                    <option value={d.name}>{d.name}-{d.rsasDomain}</option>
                {/each}
            </select>

            <hr class="my-4 md:min-w-full"/>

            <!-- Heading -->
            <h6
                    class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
                Navigation Panel
            </h6>
            <!-- Navigation -->

            <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                <li class="items-center">
                    <a

                            href="/admin/dashboard"
                            class="text-xs uppercase py-3 font-bold block {$page.url.href.indexOf(
							'/admin/dashboard'
						) !== -1
							? 'text-red-500 hover:text-red-600'
							: 'text-blueGray-700 hover:text-blueGray-500'}"
                    >
                        <i
                                class="fas fa-tv mr-2 text-sm {$page.url.href.indexOf('/admin/dashboard') !== -1
								? 'opacity-75'
								: 'text-blueGray-300'}"
                        ></i>
                        Dashboard
                    </a>
                </li>

                <li class="items-center">
                    <a

                            href="/admin/settings"
                            class="text-xs uppercase py-3 font-bold block {$page.url.href.indexOf(
							'/admin/settings'
						) !== -1
							? 'text-red-500 hover:text-red-600'
							: 'text-blueGray-700 hover:text-blueGray-500'}"
                    >
                        <i
                                class="fas fa-tools mr-2 text-sm {$page.url.href.indexOf('/admin/settings') !== -1
								? 'opacity-75'
								: 'text-blueGray-300'}"
                        ></i>
                        Settings
                    </a>
                </li>

                <li class="items-center">
                    <a

                            href="/admin/servers"
                            class="text-xs uppercase py-3 font-bold block {$page.url.href.indexOf(
							'/admin/servers'
						) !== -1
							? 'text-red-500 hover:text-red-600'
							: 'text-blueGray-700 hover:text-blueGray-500'}"
                    >
                        <i
                                class="fas fa-tools mr-2 text-sm {$page.url.href.indexOf('/admin/servers') !== -1
								? 'opacity-75'
								: 'text-blueGray-300'}"
                        ></i>
                        Servers
                    </a>
                </li>

                <li class="items-center">
                    <a

                            href="/admin/profile"
                            class="text-xs uppercase py-3 font-bold block {$page.url.href.indexOf(
							'/admin/profile'
						) !== -1
							? 'text-red-500 hover:text-red-600'
							: 'text-blueGray-700 hover:text-blueGray-500'}"
                    >
                        <i
                                class="fas fa-tools mr-2 text-sm {$page.url.href.indexOf('/admin/profile') !== -1
								? 'opacity-75'
								: 'text-blueGray-300'}"
                        ></i>
                        Profile
                    </a>
                </li>

                <li class="items-center logout">
                    <form method="post" use:enhance action={route('logout /dashboard')}>
                        <button class="bg-green-400 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit">
                            Logout
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</nav>

<style>
    .logout {
        position: absolute;
        bottom: 0;
    }
</style>
