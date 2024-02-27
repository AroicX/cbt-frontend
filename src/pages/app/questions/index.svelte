<script>
  import {
    onMount
  } from "svelte";
  import {
    GET_PAPERS
  } from "../../../actions/papers";
  import {
    GET_QUESTIONS
  } from "../../../actions/questions";



  let questions = null;
  let papers = []
  let paper_id = null;




  $: if (paper_id) {
    getQuestions();
  }

  onMount(() => {
    getPapers();
  })

  function getQuestions() {
    const callback = (response) => {
      questions = response;

      console.log(response);
    }
    const onError = (error) => {
      console.log(error);
    }

    GET_QUESTIONS(paper_id, callback, onError);
  }

  function getPapers() {
    const callback = (response) => {
      papers = response;
    }
    const onError = (error) => {
      console.log(error);
    }

    GET_PAPERS(callback, onError);
  }
</script>


<div class="row">
  <div class="col-sm-3 my-2">

    <div class="form-group">
      <label class="form-label" for="default-06">Select Paper</label>
      <div class="form-control-wrap ">
        <div class="form-control-select">
          <select class="form-control" id="default-06" bind:value={paper_id} required>
            <option value="">Select Option</option>
            {#each papers as paper}
            <option value={paper.id}>{paper.name} - {paper.exam_name}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>


  {#if questions !== null}
  <div class="col-lg-12">

    <div class="card card-preview">
      <div class="card-inner">
        <table class="datatable-init nk-tb-list nk-tb-ulist" data-auto-responsive="false">
          <thead>
            <tr class="nk-tb-item nk-tb-head">
              <th class="nk-tb-col nk-tb-col-check">
                <div class="custom-control custom-control-sm custom-checkbox notext">
                  <input type="checkbox" class="custom-control-input" id="uid">
                  <label class="custom-control-label" for="uid"></label>
                </div>
              </th>
              <th class="nk-tb-col"><span class="sub-text">Id</span></th>

              <th class="nk-tb-col tb-col-md"><span class="sub-text">Passage</span></th>
              <th class="nk-tb-col tb-col-md"><span class="sub-text">Type</span></th>
              <th class="nk-tb-col tb-col-md"><span class="sub-text">Questions</span></th>
              <th class="nk-tb-col tb-col-lg"><span class="sub-text">Option A</span></th>
              <th class="nk-tb-col tb-col-lg"><span class="sub-text">Option B</span></th>
              <th class="nk-tb-col tb-col-lg"><span class="sub-text">Option C</span></th>
              <th class="nk-tb-col tb-col-lg"><span class="sub-text">Option D</span></th>
              <!-- <th class="nk-tb-col tb-col-lg"><span class="sub-text">Correct</span></th> -->
              <th class="nk-tb-col tb-col-md"><span class="sub-text">Status</span></th>
              <th class="nk-tb-col nk-tb-col-tools text-right">
              </th>
            </tr>
          </thead>
          <tbody>
            {#each questions as question,i }
            <tr class="nk-tb-item">
              <td class="nk-tb-col nk-tb-col-check">
                <div class="custom-control custom-control-sm custom-checkbox notext">
                  <input type="checkbox" class="custom-control-input" id="uid1">
                  <label class="custom-control-label" for="uid1"></label>
                </div>
              </td>
              <td class="nk-tb-col">
                <div class="user-card">
                  <div class="user-avatar bg-dim-primary d-none d-sm-flex">
                    <span>{i + 1}</span>
                  </div>

                </div>
              </td>
              <td class="nk-tb-col tb-col-mb h-20" >
                <span class="tb-amount" style="height: 50px !important; word-break: break-all; overflow-y:scroll">{question?.content || ''} </span>
              </td>
              <td class="nk-tb-col tb-col-mb" >
                <span class="tb-amount">{question?.type || ''} </span>
              </td>
              <td class="nk-tb-col tb-col-mb" >
                <span class="tb-amount" style="height: 50px !important; word-break: break-all; overflow-y:scroll">{question.question} </span>
              </td>
              <td class="nk-tb-col tb-col-mb" >
                <span class="tb-amount">{question.option_a} </span>
              </td>
          
              <td class="nk-tb-col tb-col-mb" >
                <span class="tb-amount">{question.option_b} </span>
              </td>
          
              <td class="nk-tb-col tb-col-mb" >
                <span class="tb-amount">{question.option_c} </span>
              </td>
          
              <td class="nk-tb-col tb-col-mb" >
                <span class="tb-amount">{question.option_d} </span>
              </td>
<!--           
              <td class="nk-tb-col tb-col-mb" >
                <span class="tb-amount">{question.correct} </span>
              </td> -->
          
              <td class="nk-tb-col tb-col-md">
                <span class="tb-status text-success">Active</span>
              </td>
              <td class="nk-tb-col nk-tb-col-tools">
                <ul class="nk-tb-actions gx-1">

                  <li>
                    <div class="drodown">
                      <a href={`#`} class="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em
                          class="icon ni ni-more-h"></em></a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <ul class="link-list-opt no-bdr">
                          <li><a href={`#`}><em class="icon ni ni-focus"></em><span>Quick View</span></a></li>

                          <li><a href={`/app/questions/edit/${question.id}`}><em class="icon ni ni-repeat"></em><span>Edit</span></a></li>

                          <li class="divider"></li>

                          <li><a href={`#`}><em class="icon ni ni-na"></em><span>Deactivate Question</span></a></li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </td>
            </tr><!-- .nk-tb-item  -->

            {/each}
           
          </tbody>
        </table>
      </div>
    </div><!-- .card-preview -->
  </div>
  {/if}
 
</div>