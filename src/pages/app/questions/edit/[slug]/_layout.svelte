

<script>
  import EditQuestion from "./index.svelte";
  import {
    params
  } from '@roxi/routify'

  export let slug;
  $: slug = $params;

</script>


<EditQuestion {slug}/>
