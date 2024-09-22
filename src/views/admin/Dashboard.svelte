<script lang="ts">
  // core ../../components
  // import { env } from "$env/static/public";
  import CardPageVisits from "../../components/Cards/CardPageVisits.svelte";
  import type { Health } from '../../interfaces/Health';

  export let data: Health;
</script>

<div>
  <div class="flex flex-wrap mt-4">
    <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
      <CardPageVisits data={data}/>
    </div>
  </div>
</div>
