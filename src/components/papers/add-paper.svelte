<script>
  import {
    createEventDispatcher, onMount
  } from 'svelte';
  import {
    GET_EXAMS
  } from '../../actions/exams';
  import {
    CREATE_PAPER
  } from '../../actions/papers';
  import Toastr from 'toastr'


  const dispatch = createEventDispatcher();
  let exams = [];

  onMount(() => {
    getExams();
  })

  function getExams() {
    const callback = (response) => {
      exams = response;
    }
    const onError = (error) => {
      console.log(error);
    }

    GET_EXAMS(callback, onError);
  }

  let data = {
    exam_id: '',
    name: '',
    duration: ''
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const callback = (response) => {
      dispatch('formdata', response)
      Toastr.success('Paper has been Added.')


    }
    const onError = (error) => {
      if (error.data) {
        Toastr.error(error.data.message)
        return false;
      }
    }

    CREATE_PAPER(data, callback, onError);
  }
</script>





<form on:submit={handleSubmit}>
  <div class="row">
    <div class="col-md-12 col-lg">
      <div class="preview-block">
        <span class="preview-title-lg overline-title">Add Paper</span>
        <div class="row gy-4">

          <div class="col-sm-12">

            <div class="form-group">
              <label class="form-label" for="default-06">Select Exam</label>
              <div class="form-control-wrap ">
                <div class="form-control-select">
                  <select class="form-control" id="default-06" bind:value={data.exam_id} required>
                    <option value="">Select Option</option>
                    {#each exams as exam}
                    <option value={exam.exam_id}>{exam.exam_name}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="form-group">
              <label class="form-label" for="default-01">Paper Name</label>
              <div class="form-control-wrap">
                <input type="text" class="form-control" name="paper_name" bind:value={data.name}
                  placeholder="English" required>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label class="form-label" for="default-01">Paper Duration</label>
              <div class="form-control-wrap">
                <input type="text" class="form-control" name="duration" bind:value={data.duration}
                  placeholder="2hrs" required>
              </div>
            </div>
          </div>

          <hr class="preview-hr">
          <button type="submit" class="btn btn-lg btn-primary mx-2">Save Paper</button>
        </div>
      </div>
    </div>
</form>