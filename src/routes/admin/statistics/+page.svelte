<script lang="ts">
	import Dashboard from '../../../views/admin/Dashboard.svelte';

    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Dashboard data={data}></Dashboard>
