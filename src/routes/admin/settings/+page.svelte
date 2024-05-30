<script lang="ts">
	import Settings from '../../../views/admin/Settings.svelte';

    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Settings data={data.icecast}></Settings>