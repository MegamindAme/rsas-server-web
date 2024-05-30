<script lang="ts">
	import Settings from '../../../views/admin/Settings.svelte';

    import type { PageData } from './$types';
    import type {IceCastRoot} from "../../../interfaces/Icecast";

    export let data: PageData;
    let icecast = data.icecast as IceCastRoot
</script>

<Settings data={icecast.icecast}></Settings>