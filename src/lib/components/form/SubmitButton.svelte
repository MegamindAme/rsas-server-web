<script lang="ts">
	// import type { HTMLButtonAttributes } from 'svelte/elements';

	// import { cn } from '../../utils/styleTransitionUtils';

	import Button from '../ui/button/button.svelte';

	// let className: HTMLButtonAttributes['class'] = undefined;

	// export { className as class };
	export let disabled: boolean = false;
	export let formaction: string | null = null;
	export let showSpinner: boolean | null = null;
</script>

<Button
	{disabled}
	{formaction}
	type="submit"
	aria-disabled={disabled}
	class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
>
	{#if showSpinner === null ? disabled : showSpinner}
		<iconify-icon icon="eos-icons:bubble-loading"></iconify-icon>
	{/if}

	<span>
		<slot>Submit</slot>
	</span>
</Button>