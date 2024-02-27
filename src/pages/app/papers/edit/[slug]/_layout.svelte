

<script>
  import EditPaper from "./index.svelte";
  import {
    params
  } from '@roxi/routify'

  export let slug;
  $: slug = $params;

</script>


<EditPaper {slug}/>
