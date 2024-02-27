<script>
  import {
    onMount
  } from "svelte";
  import {
    GET_EXAMS
  } from "../../../actions/exams";
  import {
    formatDateString
  } from "../../../helpers";







  let exams = []




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

    GET_EXAMS( callback, onError);
  }



</script>

<div class="row">

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
              <!-- <th class="nk-tb-col tb-col-mb"><span class="sub-text">Exam Id</span></th> -->
              <th class="nk-tb-col tb-col-md"><span class="sub-text">Exam Name</span></th>
              <th class="nk-tb-col tb-col-lg"><span class="sub-text">Exam Type</span></th>
              <th class="nk-tb-col tb-col-lg"><span class="sub-text">Subject</span></th>
              <th class="nk-tb-col tb-col-md"><span class="sub-text">Duration</span></th>
              <th class="nk-tb-col tb-col-md"><span class="sub-text">Date</span></th>
              <th class="nk-tb-col tb-col-md"><span class="sub-text">Status</span></th>
              <th class="nk-tb-col nk-tb-col-tools text-right">
              </th>
            </tr>
          </thead>
          <tbody>
            {#each exams as exam, i }
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

              <td class="nk-tb-col tb-col-md">
                <span>{exam.exam_name}</span>
              </td>
              <td class="nk-tb-col tb-col-lg" data-order="Email Verified - Kyc Unverified">
                       <span>{exam.exam_type}</span>
              </td>
              <td class="nk-tb-col tb-col-lg" data-order="Email Verified - Kyc Unverified">
                <ul class="list-status">
                  <li><em class="icon text-success ni ni-check-circle"></em> <span>Mathematics</span></li>
                </ul>
              </td>
              <td class="nk-tb-col tb-col-lg">
                <span>{exam.exam_duration} Mins</span>
              </td>
            
              <td class="nk-tb-col tb-col-lg">
                <span>{formatDateString(exam.exam_date)}</span>
              </td>
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

                          <li><a href={`/app/exams/edit/${exam.exam_id}`}><em class="icon ni ni-repeat"></em><span>Edit</span></a></li>

                          <li class="divider"></li>

                          <li><a href={`#`}><em class="icon ni ni-na"></em><span>Deactivate Pape</span></a></li>
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
</div>