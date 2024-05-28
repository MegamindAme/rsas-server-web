<script lang="ts">
	import Dashboard from '../../../views/admin/Dashboard.svelte';

    import type { PageData } from './$types';

    export let data: PageData;console.log(data)
</script>

<Dashboard data={data?.item}></Dashboard>
