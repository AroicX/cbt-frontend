<script>
  import {
    goto
  } from "@roxi/routify";
import { onMount } from "svelte";
  import {
    GET_PAPERS
  } from "../../../../../actions/papers";

  import {
    SINGLE_QUESTION,
    UPDATE_QUESTION
  } from "../../../../../actions/questions";

  import Toastr from 'toastr'


  export let slug
  let question = [];
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

  $: if (slug) {
    getQuestion(slug.slug)
  }
  $: if (question) {
    console.log(question);
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

  function getQuestion(slug) {
    const callback = (response) => {
      question = response[0];
      data = {
        paper_id: question.paper_id,
        question: question.question,
        a: question.option_a,
        b: question.option_b,
        c: question.option_c,
        d: question.option_d,
      }

    }
    const onError = (error) => {
      console.log(error);
    }

    SINGLE_QUESTION(slug, callback, onError);
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
      Toastr.success('Question has been updated.')
      $goto('/app/questions')
    }
    const onError = (error) => {
      if (error.data) {
        Toastr.error(error.data.message)
        return false;
      }
    }

    UPDATE_QUESTION(question.id, questionData, callback, onError);
  }
</script>




<div class="card card-bordered card-full my-10">
  <div class="card-inner border-bottom">
    <div class="card-title-group">
      <div class="card-title">
        <h6 class="title">Edit Question</h6>
      </div>

    </div>
  </div>
  <div class="card-body">
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
    
  </div>
</div>