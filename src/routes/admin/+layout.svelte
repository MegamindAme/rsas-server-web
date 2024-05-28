<script lang="ts">
	import AdminNavbar from '../../components/Navbars/AdminNavbar.svelte';
	import Sidebar from '../../components/Sidebar/Sidebar.svelte';
	import HeaderStats from '../../components/Headers/HeaderStats.svelte';
	import FooterAdmin from '../../components/Footers/FooterAdmin.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>


<div>
	<Sidebar />
	<div class="relative md:ml-64 bg-blueGray-100">
		<AdminNavbar />
		<HeaderStats data={data.item}/>
		<div class="px-4 md:px-10 mx-auto w-full -m-24">
			<slot></slot>
			<FooterAdmin />
		</div>
	</div>
</div>
