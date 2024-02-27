<script>
  import {
    onMount
  } from "svelte";
  import {
    GET_EXAMS
  } from "../../../actions/exams";


  import CreateExam from "../../../components/exams/create-exam.svelte";




  let exam_data = []



  onMount(() => {
    getExams();
  })

  function getExams() {
    const callback = (response) => {
      exam_data = response;
    }
    const onError = (error) => {
      console.log(error);
    }

    GET_EXAMS( callback, onError);
  }


  const handleResponse = (e) => {
    const {
      detail
    } = e;
    console.log(detail);
  }
</script>

<div class="dashbord__component">
  <!--  -->
  <div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
      <div class="nk-block-head-content">
        <h3 class="nk-block-title page-title">Exams</h3>
        <div class="nk-block-des text-soft">
          <p>Welcome to DashLite Dashboard Template.</p>
        </div>
      </div><!-- .nk-block-head-content -->
      <div class="nk-block-head-content">
        <div class="toggle-wrap nk-block-tools-toggle">
          <a href={`#`} class="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em
              class="icon ni ni-more-v"></em></a>
          <div class="toggle-expand-content" data-content="pageMenu">
            <ul class="nk-block-tools g-3">

              <li class="nk-block-tools-opt"><a href={`#`} class="btn btn-primary" data-toggle="collapse"
                  data-target="#accordion-item-1"><em class="icon ni ni-reports"></em><span>Create Exam</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="nk-block">


    <!-- accordion -->
    <div id="accordion" class="accordion">
      <div class="accordion-item">
        <a href={`#`} class="accordion-head" data-toggle="collapse" data-target="#accordion-item-1">
          <h6 class="title">Create Exam </h6>
          <span class="accordion-icon"></span>
        </a>
        <div class="accordion-body collapse hide" id="accordion-item-1" data-parent="#accordion">
          <div class="accordion-inner">
            <CreateExam on:response={(e)=> handleResponse(e)} exams={exam_data ? exam_data : ''} />


          </div>
        </div>
      </div>

    </div>

    <slot />




  </div>

</div>