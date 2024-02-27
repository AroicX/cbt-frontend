<script>
  import { onMount, beforeUpdate } from "svelte";
  import Pagination from "../pagination.svelte";
  import THead from "../table/THead.svelte";
  import { formatDateString, paginateArr } from "../../helpers";
  import { json2excel } from "js2excel";
  import { goto } from "@roxi/routify/runtime/helpers";

  export let data;
  export let title;
  export let examId;

  let studentData;
  let students;
  let page = 1;
  let range = 1;
  let div;
  let autoscroll;
  let len = 0;
  let search;

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  onMount(async () => {
    if (data.data.length > 0) {
      studentData = data.data;
      len = studentData.length;
      students = paginateArr(data.data, 100);
    }
  });

  $: if (students) {
    const len = students.length;
    if (len > 5) range = 5;
    else if (len > 3) range = 3;
    else range = 1;
  }

  const onChange = (pageNo) => {
    page = pageNo;
    if (autoscroll) div.scrollIntoView({ behavior: "auto", block: "start" });
  };

  const modifyData = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      delete arr[i].passport_url;
    }
    return arr;
  };

  const convert = () => {
    if (students)
      try {
        const res = modifyData([].concat(...students));
        json2excel({
          data: res,
          name: "students-results",
          formateDate: "yyyy/mm/dd",
        });
      } catch (e) {
        // console.log(e);
      }
  };
</script>

<div class="flex_display">
  <div class="nk-block-head-content">
    <h3 class="nk-block-title page-title">
      Students Results for {title && title}
    </h3>
    <div class="nk-block-des text-soft">
      <p>Total {len && len} students</p>
    </div>
  </div>
  <div class="nk-header-search ml-3 ml-xl-0">
    <em class="icon ni ni-search" />
    <input
      type="text"
      class="form-control border-transparent form-focus-none"
      placeholder="Search student by Student ID"
      bind:value={search}
    />
  </div>
</div>

<div class="download_btn">
  <button on:click={convert}>Download Results</button>
</div>

<div style="margin-bottom: 60px;" bind:this={div} />
<div class="card card-preview">
  <div class="card-inner">
    <table
      class="datatable-init nk-tb-list nk-tb-ulist"
      data-auto-responsive="false"
    >
      <THead />
      <tbody>
        {#if students && search}
          {#each [].concat(...students) as { firstname, othername, fullname, paper_1_score, passport_url, student_id, surname, total, avg_total, paper_2_score, first_choice, second_choice, third_choice, center, date_of_birth, gender, telephone, church_name, church_denomination }, i}
            {#if student_id.includes(search)}
              <tr
                class="nk-tb-item pointer"
                on:click={() =>
                  $goto("/app/results/" + examId + "/" + student_id)}
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
                    <div class="user-avatar bg-dim-primary d-none d-sm-flex">
                      <span>{100 * (page - 1) + (i + 1)}</span>
                    </div>
                  </div>
                </td>

                <td class="nk-tb-col tb-col-lg">
                  <span>{student_id}</span>
                </td>

                <td class="nk-tb-col tb-col-md">
                  <span>{firstname}</span>
                </td>
                <td class="nk-tb-col tb-col-md">
                  <span>{surname}</span>
                </td>
                <td class="nk-tb-col tb-col-md">
                  <span>{othername}</span>
                </td>
                <td class="nk-tb-col tb-col-md">
                  <span>{fullname}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{paper_1_score}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{paper_2_score}</span>
                </td>

                <td class="nk-tb-col tb-col-lg">
                  <span>{total}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{avg_total}</span>
                </td>

                <td class="nk-tb-col tb-col-lg">
                  <span
                    ><a class="image_url" target="_blank" href={passport_url}
                      >URL</a
                    >
                  </span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{formatDateString(date_of_birth)}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{gender}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{telephone}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{church_name}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{church_denomination}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{first_choice}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{second_choice}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{third_choice}</span>
                </td>
                <td class="nk-tb-col tb-col-lg">
                  <span>{center}</span>
                </td>
              </tr>
            {/if}
          {/each}
        {:else if students}
          {#each students[page - 1] as { firstname, othername, paper_1_score, passport_url, student_id, surname, total, avg_total, paper_2_score, first_choice, second_choice, third_choice, center, date_of_birth, gender, telephone, church_name, church_denomination, fullname }, i}
            <tr
              class="nk-tb-item pointer"
              on:click={() =>
                $goto("/app/results/" + examId + "/" + student_id)}
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
                  <div class="user-avatar bg-dim-primary d-none d-sm-flex">
                    <span>{100 * (page - 1) + (i + 1)}</span>
                  </div>
                </div>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{student_id}</span>
              </td>

              <td class="nk-tb-col tb-col-md">
                <span>{firstname}</span>
              </td>
              <td class="nk-tb-col tb-col-md">
                <span>{surname}</span>
              </td>
              <td class="nk-tb-col tb-col-md">
                <span>{othername}</span>
              </td>
              <td class="nk-tb-col tb-col-md">
                <span>{fullname}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{paper_1_score}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{paper_2_score}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{total}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{avg_total}</span>
              </td>

              <td class="nk-tb-col tb-col-lg">
                <span
                  ><a class="image_url" target="_blank" href={passport_url}
                    >URL</a
                  >
                </span>
              </td>

              <td class="nk-tb-col tb-col-lg">
                <span>{formatDateString(date_of_birth)}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{gender}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{telephone}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{church_name}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{church_denomination}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{first_choice}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{second_choice}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{third_choice}</span>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{center}</span>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
  {#if students && !search}
    <Pagination
      numOfPages={students.length}
      {range}
      current={page}
      {onChange}
    />
  {/if}
</div>

<!-- .card-preview -->
<style>
  .pointer {
    cursor: pointer;
  }

  .flex_display {
    display: flex;
    flex-direction: row;
  }

  .nk-block-head-content {
    flex: 1;
  }

  .image_url {
    text-decoration: underline;
    color: #3fbd9a;
  }

  .download_btn {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  .download_btn button {
    background-color: #3fbd9a;
    color: white;
    padding: 0.8rem 1.5rem;
    outline: none;
    border: none;
  }

  .download_btn button:focus {
    outline: none;
    border: none;
  }

  .card-inner {
    overflow: auto;
    width: 100%;
  }
</style>
