<script>
import { goto } from "@roxi/routify";

  // import { onMount } from "svelte";
  import {
    SINGLE_PAPER,
    UPDATE_PAPER
  } from "../../../../../actions/papers";
  import Toastr from 'toastr'


  export let slug
  let paper = null

  let data = {
    paper_name: '',
    duration: ''
  }

  $: if (slug) {
    getPaper(slug.slug)
    console.log(slug.slug);
  }

  $: if (paper) {
    console.log(paper);
  }


  function getPaper(slug) {
    const callback = (response) => {
      paper = response[0];
      data.paper_name = paper.name
    }
    const onError = (error) => {
      console.log(error);
    }

    SINGLE_PAPER(slug, callback, onError);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let form = {
      exam_id: paper.exam_id,
      name: data.paper_name,
      duration: data.duration
    }
    const callback = (response) => {
      Toastr.success('Paper has been updated.')

      $goto('/app/papers')
      console.log(response);

    }
    const onError = (error) => {
      if (error.data) {
        Toastr.error(error.data.message)
        return false;
      }
    }

    UPDATE_PAPER(paper.id,form, callback, onError);
  }
</script>


<div class="card my-10">
  <div class="card-header">
    <h5>Edit Paper</h5>
  </div>
  <div class="card-body">
    <form on:submit={handleSubmit}>
      <div class="row">
        <div class="col-md-12 col-lg">
          <div class="preview-block">

            <div class="row gy-4">



              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label" for="default-01">Paper Name</label>
                  <div class="form-control-wrap">
                    <input type="text" class="form-control" name="paper_name" bind:value={data.paper_name}
                      placeholder="English" required>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label" for="default-01">Paper Duration</label>
                  <div class="form-control-wrap">
                    <input type="text" class="form-control" name="paper_duration" bind:value={data.duration}
                      placeholder="2hrs" required>
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <hr class="preview-hr">
                <button type="submit" class="btn btn-lg btn-primary mx-2">Save Paper</button>
              </div>


            </div>
          </div>
        </div>
    </form>

  </div>
</div>