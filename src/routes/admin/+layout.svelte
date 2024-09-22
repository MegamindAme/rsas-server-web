<script lang="ts">

	import AdminNavbar from '../../components/Navbars/AdminNavbar.svelte';
	import Sidebar from '../../components/Sidebar/Sidebar.svelte';
	import HeaderStats from '../../components/Headers/HeaderStats.svelte';
	import FooterAdmin from '../../components/Footers/FooterAdmin.svelte';
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { PUBLIC_RSAS_BASE_URL, PUBLIC_HTTP_SCHEME, PUBLIC_BASE_URL } from '$env/static/public';

	export let data: PageData;

	let currentRsasDomain = writable(PUBLIC_HTTP_SCHEME + PUBLIC_RSAS_BASE_URL);
	setContext('currentRsasDomainValue', currentRsasDomain);

	let currentApiDomain = writable(PUBLIC_HTTP_SCHEME + PUBLIC_BASE_URL);
	setContext('currentApiDomainValue', currentApiDomain);
</script>

<div>
	<Sidebar domains={data.domains}/>
	<div class="relative md:ml-64 bg-blueGray-100">
		<AdminNavbar />
		<HeaderStats domains={data.domains}/>
		<div class="px-4 md:px-10 mx-auto w-full -m-24">
			<slot></slot>
			<FooterAdmin />
		</div>
	</div>
</div>
