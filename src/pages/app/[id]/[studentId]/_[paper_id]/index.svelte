<script>
  import { params } from "@roxi/routify";
  import { onMount } from "svelte";
  import { fetcher } from "../../../../../actions";
  import Spinner from "../../../../../components/spinner.svelte";
  import { convertToTime } from "../../../../../helpers";
  let questions;
  let loading = false;
  onMount(async () => {
    try {
      loading = true;
      const { data } = await fetcher.get(
        "/students/exam-details/" + $params.studentId + "/" + $params.paper_id
      );
      questions = data.data;
      loading = false;
    } catch (error) {
      // loading = false;
    }
  });
  const getSeconds = (str) => {
    const date = new Date(str);
    const sec = date.getTime() / 1000;
    return date;
  };
</script>

<div class="nk-content ">
  <div class="container-fluid">
    <div class="nk-content-inner">
      <div class="nk-content-body">
        <div class="nk-block-head nk-block-head-sm">
          <div class="nk-block-between">
            <div class="nk-block-head-content">
              <h3 class="nk-bloc`k-title page-title">Questions</h3>
              <div class="nk-block-des text-soft">
                <p>
                  You have total {questions && questions.length} questions.
                </p>
              </div>
            </div>
            <!-- .nk-block-head-content -->
          </div>
          <!-- .nk-block-between -->
        </div>
        <!-- .nk-block-head -->

        <div class="card card-preview">
          <div class="card-inner">
            <table
              class="datatable-init nk-tb-list nk-tb-ulist"
              data-auto-responsive="false"
            >
              <thead>
                <tr class="nk-tb-item nk-tb-head">
                  <th class="nk-tb-col nk-tb-col-check">
                    <div
                      class="custom-control custom-control-sm custom-checkbox notext"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="uid"
                      />
                      <label class="custom-control-label" for="uid" />
                    </div>
                  </th>
                  <th class="nk-tb-col"><span class="sub-text">Id</span></th>
                  <!-- <th class="nk-tb-col tb-col-mb"><span class="sub-text">Exam Id</span></th> -->
                  <th class="nk-tb-col tb-col-md"
                    ><span class="sub-text">Question ID</span></th
                  >
                  <th class="nk-tb-col tb-col-lg"
                    ><span class="sub-text">Status</span></th
                  >
                  <th class="nk-tb-col tb-col-lg"
                    ><span class="sub-text">Selected Ans</span></th
                  >
                  <th class="nk-tb-col tb-col-md"
                    ><span class="sub-text">Correct Ans</span></th
                  >
                  <th class="nk-tb-col tb-col-md"
                    ><span class="sub-text">Score</span></th
                  >
                  <th class="nk-tb-col tb-col-md"
                    ><span class="sub-text">Time answered</span></th
                  >
                </tr>
              </thead>
              <tbody>
                {#if questions}
                  {#each questions as { correct, selected, score, time_answered, question_id, status }, i}
                    <tr class="nk-tb-item pointer">
                      <td class="nk-tb-col nk-tb-col-check">
                        <div
                          class="custom-control custom-control-sm custom-checkbox notext"
                        >
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="uid1"
                          />
                          <label class="custom-control-label" for="uid1" />
                        </div>
                      </td>
                      <td class="nk-tb-col">
                        <div class="user-card">
                          <div
                            class="user-avatar bg-dim-primary d-none d-sm-flex"
                          >
                            <span>{i + 1}</span>
                          </div>
                        </div>
                      </td>

                      <td class="nk-tb-col tb-col-md">
                        <span>{question_id}</span>
                      </td>
                      <td class="nk-tb-col tb-col-md">
                        <span>{status}</span>
                      </td>
                      <td class="nk-tb-col tb-col-md">
                        <span>{selected}</span>
                      </td>
                      <td class="nk-tb-col tb-col-lg">
                        <span>{correct}</span>
                      </td>
                      <td class="nk-tb-col tb-col-lg">
                        <span>{score}</span>
                      </td><td class="nk-tb-col tb-col-lg">
                        <span
                          >{selected === null
                            ? "null"
                            : convertToTime(time_answered)}</span
                        >
                      </td>
                    </tr><!-- .nk-tb-item  -->
                  {/each}
                {/if}
              </tbody>
            </table>
          </div>
        </div>
        <!-- .card-preview -->

        <!-- .nk-block -->
      </div>
    </div>
  </div>
</div>

{#if loading}
  <Spinner />
{/if}

<style>
  .nk-content {
    margin-top: 0px;
  }
</style>
