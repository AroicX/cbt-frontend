

<script>
  import EditExam from "./index.svelte";
  import {
    params
  } from '@roxi/routify'

  export let slug;
  $: slug = $params;

</script>


<EditExam {slug}/>
