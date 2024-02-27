<script>
  import { onMount, beforeUpdate } from "svelte";
  import { goto, url, params } from "@roxi/routify";
  import Spinner from "../../../components/spinner.svelte";
  import { fetcher } from "../../../actions";
  import { paginateArr } from "../../../helpers";
  import List from "../../../components/results/list.svelte";
  import Pagination from "../../../components/pagination.svelte";

  let students;
  let studentsData;
  let page = 1;
  let range = 1;
  let div;
  let autoscroll;
  let loading;
  let len = 0;
  let state = 0;
  let search;

  onMount(async () => {
    try {
      loading = true;
      const { data } = await fetcher.get("/centers/students/" + $params.id);
      if (data.data && data.data.length > 1) {
        len = data.data.length;
        studentsData = data.data;
        students = paginateArr(data.data, 50);
      }
      loading = false;
    } catch (error) {
      // loading = false;
    }
  });
  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });
  const onClick = (idx) => {
    $goto($url() + "/" + idx);
  };

  const onChange = (pageNo) => {
    page = pageNo;
    if (autoscroll) div.scrollIntoView({ behavior: "auto", block: "start" });
  };

  $: console.log(search);
</script>

<div bind:this={div} />
<div class="nk-content ">
  <div class="container-fluid">
    <div class="nk-content-inner">
      <div class="nk-content-body">
        <div class="flex__">
          <div class="nk-block-head nk-block-head-sm">
            <div class="nk-block-between">
              <div class="nk-block-head-content">
                <h3 class="nk-bloc`k-title page-title">Candidates Lists</h3>
                <div class="nk-block-des text-soft">
                  <p>
                    You have total {len && len} candidates.
                  </p>
                </div>
              </div>
              <!-- .nk-block-head-content -->
            </div>
            <!-- .nk-block-between -->
          </div>

          <div class="nk-header-search ml-3 ml-xl-0">
            <em class="icon ni ni-search" />
            <input
              type="text"
              class="form-control border-transparent form-focus-none"
              placeholder="Search student with Application ID"
              bind:value={search}
            />
          </div>
        </div>
        <!-- .nk-block-head -->

        <!-- .nk-block-head -->
        <ul class="nav nav-tabs">
          <li on:click={() => (state = 0)} class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tabItem1"
              >Students</a
            >
          </li>
          <li on:click={() => (state = 1)} class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#tabItem2">Exams</a>
          </li>
        </ul>

        <!-- {#if state === 0} -->
        <div class:none={state === 1} class="card card-preview">
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
                    ><span class="sub-text">Surname</span></th
                  >
                  <th class="nk-tb-col tb-col-lg"
                    ><span class="sub-text">Firstname</span></th
                  >
                  <th class="nk-tb-col tb-col-lg"
                    ><span class="sub-text">Othername</span></th
                  >
                  <th class="nk-tb-col tb-col-md"
                    ><span class="sub-text">Application ID</span></th
                  >
                </tr>
              </thead>
              <tbody>
                {#if studentsData && search}
                  {#each studentsData as student, i}
                    {#if student.application_id.toString().includes(search)}
                      <tr
                        on:click={onClick(student.application_id)}
                        class="nk-tb-item pointer"
                      >
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
                              <span>{50 * (page - 1) + (i + 1)}</span>
                            </div>
                          </div>
                        </td>

                        <td class="nk-tb-col tb-col-md">
                          <span>{student.surname}</span>
                        </td>
                        <td class="nk-tb-col tb-col-md">
                          <span>{student.firstname}</span>
                        </td>
                        <td class="nk-tb-col tb-col-md">
                          <span>{student.othername}</span>
                        </td>
                        <td class="nk-tb-col tb-col-lg">
                          <span>{student.application_id}</span>
                        </td>
                      </tr>
                      <!-- .nk-tb-item  -->
                    {/if}
                  {/each}
                {:else if students}
                  {#each students[page - 1] as student, i}
                    <tr
                      on:click={onClick(student.application_id)}
                      class="nk-tb-item pointer"
                    >
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
                            <span>{50 * (page - 1) + (i + 1)}</span>
                          </div>
                        </div>
                      </td>

                      <td class="nk-tb-col tb-col-md">
                        <span>{student.surname}</span>
                      </td>
                      <td class="nk-tb-col tb-col-md">
                        <span>{student.firstname}</span>
                      </td>
                      <td class="nk-tb-col tb-col-md">
                        <span>{student.othername}</span>
                      </td>
                      <td class="nk-tb-col tb-col-lg">
                        <span>{student.application_id}</span>
                      </td>
                    </tr><!-- .nk-tb-item  -->
                  {/each}
                {/if}
              </tbody>
            </table>
          </div>
        </div>
        <div class:none={state === 0}>
          <List show={true} load={true} center={true} />
        </div>
      </div>
    </div>
  </div>
</div>

{#if students && state === 0 && !search}
  <Pagination
    numOfPages={students.length}
    range={range > 3 ? 3 : range}
    current={page}
    {onChange}
  />
{/if}

{#if loading}
  <Spinner />
{/if}

<style>
  .pointer {
    cursor: pointer;
  }

  .nk-content {
    margin-top: 0px;
  }

  .nav-tabs {
    margin-bottom: 2rem;
  }

  .none {
    display: none;
  }
  .flex__ {
    display: grid;
    grid-template-columns: 60% 40%;
  }
</style>
