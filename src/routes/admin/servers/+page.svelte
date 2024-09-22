<script lang="ts">
    import ServersSettings from '../../../views/admin/ServersSettings.svelte';
    import type {PageData} from './$types';


    export let data: PageData;
</script>

<ServersSettings domains={data.domains}></ServersSettings>