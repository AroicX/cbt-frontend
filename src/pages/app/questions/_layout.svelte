<script>

  import AddQuestion from "../../../components/questions/add-questions.svelte";






  let data = null

  $: if (data) {
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    // const callback = (response) => {
    //   console.log(response);
    // }
    // const onError = (error) => {
    //   console.log(error);
    // }

    // CREATE_EXAM(data,callback,onError);
  }
</script>

<div class="dashbord__component">
  <!--  -->
  <div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
      <div class="nk-block-head-content">
        <h3 class="nk-block-title page-title">Manage Questions</h3>
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
                  data-target="#accordion-item-1"><em class="icon ni ni-reports"></em><span>Add Questions</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div><!-- .nk-block-head-content -->
    </div><!-- .nk-block-between -->
  </div><!-- .nk-block-head -->
  <div class="nk-block">


    <!-- accordion -->
    <div id="accordion" class="accordion">
      <div class="accordion-item">
        <a href={`#`} class="accordion-head" data-toggle="collapse" data-target="#accordion-item-1">
          <h6 class="title">Add Questions</h6>
          <span class="accordion-icon"></span>
        </a>
        <div class="accordion-body collapse hide" id="accordion-item-1" data-parent="#accordion">
          <div class="accordion-inner">
            <AddQuestion on:formdata={(e)=> {
              console.log(e.detail)
              }} />


          </div>
        </div>
      </div>

    </div>
    <!-- accordion -->

    <slot></slot>

  </div><!-- .nk-block -->
  <!--  -->
</div>