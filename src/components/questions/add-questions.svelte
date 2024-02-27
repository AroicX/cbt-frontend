<script>
  import {
    createEventDispatcher,
    onMount
  } from 'svelte';

  import {
    GET_PAPERS
  } from '../../actions/papers';
  import {
    CREATE_QUESTION,
    UPLOAD_QUESTION
  } from '../../actions/questions';
  import Toastr from 'toastr'


  const dispatch = createEventDispatcher();
  let papers = [];
  let data = {
    paper_id: '',
    question: '',
    correct: '',
    a: '',
    b: '',
    c: '',
    d: '',
  }

  let file = null;


  $: if (file) {
    console.log(file);
  }

  onMount(() => {
    getPapers();
  })

  function getPapers() {
    const callback = (response) => {
      papers = response;
    }
    const onError = (error) => {
      console.log(error);
    }

    GET_PAPERS(callback, onError);
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    const questionData = {
      "paper_id": data.paper_id,
      "question": data.question,
      "option_a": data.a,
      "option_b": data.b,
      "option_c": data.c,
      "option_d": data.d,
      "correct": data.correct
    }

    const callback = (response) => {
      dispatch('formdata', response)
      Toastr.success('Question has been Added.')

    }
    const onError = (error) => {
      if (error.data) {
        Toastr.error(error.data.message)
        return false;
      }
    }

    CREATE_QUESTION(questionData, callback, onError);
  }


  const handleFile = (e) => {
    let xlsx = e.target.files[0];
    file = xlsx;
  }
  const handleUpload = (e) => {
    e.preventDefault();

    let formData = new FormData()
    formData.append('file', file)

    const callback = (response) => {
      Toastr.success('Question has been Added.')
    }
    const onError = (error) => {
      if (error.data) {
        Toastr.error(error.data.message)
        return false;
      }
    }

    UPLOAD_QUESTION(data.paper_id, formData, callback, onError);

  }

  // 
</script>

<form on:submit={handleSubmit}>
  <div class="row">
    <div class="col-md-12 col-lg">
      <div class="preview-block">
        <span class="preview-title-lg overline-title">Add Question</span>
        <div class="row gy-4">
          <div class="col-sm-6">
            <div class="form-group">
              <label class="form-label" for="default-06">Select Paper</label>
              <div class="form-control-wrap ">
                <div class="form-control-select">
                  <select class="form-control" id="default-06" bind:value={data.paper_id} required>
                    <option value="">Select Option</option>
                    {#each papers as paper}
                    <option value={paper.id}>{paper.name} - {paper.exam_name}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label class="form-label" for="default-06">Select Correct Answer</label>
              <div class="form-control-wrap ">
                <div class="form-control-select">
                  <select class="form-control" id="default-06" bind:value={data.correct} required>
                    <option value="">Select Option</option>
                   
                    <option value={'a'}>Option A</option>
                    <option value={'b'}>Option B</option>
                    <option value={'c'}>Option C</option>
                    <option value={'d'}>Option D</option>

                  </select>
                </div>
              </div>
            </div>
          </div>

          

          <div class="col-sm-6 col-lg-12">
            <div class="form-group">
              <label class="form-label" for="default-01">Question</label>
              <div class="form-control-wrap">
                <div class="form-control-wrap">
                  <textarea class="form-control form-control-sm"  name="question" bind:value={data.question} placeholder="Write your message" required></textarea>
              </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6 ">
            <div class="form-group">
              <label class="form-label" for="default-01">Option A</label>
              <div class="form-control-wrap">
                <input type="text" class="form-control" name="a" bind:value={data.a}
                  required>
              </div>
            </div>
          </div>
          <div class="col-sm-6 ">
            <div class="form-group">
              <label class="form-label" for="default-01">Option B</label>
              <div class="form-control-wrap">
                <input type="text" class="form-control" name="b" bind:value={data.b}
                  required>
              </div>
            </div>
          </div>
          <div class="col-sm-6 ">
            <div class="form-group">
              <label class="form-label" for="default-01">Option C</label>
              <div class="form-control-wrap">
                <input type="text" class="form-control" name="c" bind:value={data.c}
                  required>
              </div>
            </div>
          </div>
          <div class="col-sm-6 ">
            <div class="form-group">
              <label class="form-label" for="default-01">Option D</label>
              <div class="form-control-wrap">
                <input type="text" class="form-control" name="d" bind:value={data.d}
                  required>
              </div>
            </div>
          </div>
        

          <hr class="preview-hr">
          <button type="submit" class="btn btn-lg btn-primary mx-2">Save Question</button>
        </div>

       


      </div>
    </div>
</form>

<main>
<form on:submit={handleUpload} enctype="multipart/form-data">

<div class="row my-10">
  <div class="col-sm-6">
    <div class="form-group">
      <label class="form-label" for="default-06">Select Paper</label>
      <div class="form-control-wrap ">
        <div class="form-control-select">
          <select class="form-control" id="default-06" bind:value={data.paper_id} required>
            <option value="">Select Option</option>
            {#each papers as paper}
            <option value={paper.id}>{paper.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="col-sm-6 ">
    <div class="form-group">
      <label class="form-label" for="default-01">Bulk Upload</label>
      <div class="form-control-wrap">
        <div class="custom-file">
          <input type="file" multiple class="custom-file-input" id="file" on:change={(e)=> handleFile(e)} bind:this={file} required>
          <label class="custom-file-label" for="customFile">Choose file</label>
      </div>
      </div>
    </div>
  </div>
  <br>
  <br>
  <br>
  <hr class="preview-hr">
          <button type="submit" class="btn btn-lg btn-primary mx-2 my-10">Upload Question</button>
</div>
</form>
</main>