<script>
  import {
    goto
  } from "@roxi/routify";

  import {
    SINGLE_EXAM,
    UPDATE_EXAM
  } from "../../../../../actions/exams";
  import Toastr from 'toastr'


  export let slug
  let exam = null

  let data = {
    name: '',
    type: '',
    subject: '',
    date: '',
    duration: ''
  }

  $: if (slug) {
    getExam(slug.slug)
    // console.log(slug.slug);
  }


  function getExam(slug) {
    const callback = (response) => {
      exam = response[0];
      data = {
        name: exam.exam_name,
        type: exam.exam_type,
        date: exam.exam_date,
        duration: exam.exam_duration
      }

    }
    const onError = (error) => {
      console.log(error);
    }

    SINGLE_EXAM(slug, callback, onError);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
   
    const callback = (response) => {
      Toastr.success('Exam has been updated.')

      $goto('/app/exams')
    }
    const onError = (error) => {
      if (error.data) {
        Toastr.error(error.data.message)
        return false;
      }
    }

    UPDATE_EXAM(exam.exam_id, data, callback, onError);
  }
</script>




<div class="card card-bordered card-full my-10">
  <div class="card-inner border-bottom">
    <div class="card-title-group">
      <div class="card-title">
        <h6 class="title">Edit Exam</h6>
      </div>

    </div>
  </div>
  <div class="card-body">
    <form on:submit={handleSubmit}>
      <div class="row">
        <div class="col-md-12">
          <div class="preview-block">
            <!-- <span class="preview-title-lg overline-title">Create Exam</span> -->
            <div class="row gy-4">
              <div class="col-sm-6 col-lg-12">
                <div class="form-group">
                  <label class="form-label" for="default-01">Exam Name</label>
                  <div class="form-control-wrap">
                    <input type="text" class="form-control" name="exam-name" bind:value={data.name}
                      placeholder="English Language" required>
                  </div>
                </div>
              </div>


              <div class="col-sm-6">

                <div class="form-group">
                  <label class="form-label" for="default-06">Exam Type</label>
                  <div class="form-control-wrap ">
                    <div class="form-control-select">
                      <select class="form-control" id="default-06" bind:value={data.type} selected={data.type} required>
                        <option value="">Select Option</option>
                        <option value="cbt">CBT Exam</option>
                        <option value="paperbased">Paperbased Exam</option>

                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label" for="default-01">Date</label>
                  {data.date}
                  <div class="form-control-wrap">
                    <input type="date" class="form-control" name="date" bind:value={data.date} placeholder={data.date}
                      required>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label" for="default-01">Duration</label>
                  <div class="form-control-wrap">
                    <input type="number" class="form-control" name="duration" bind:value={data.duration} placeholder="2"
                      required>
                  </div>
                </div>
              </div>
            </div>
            <hr class="preview-hr">
            <button type="submit" class="btn btn-lg btn-primary">Save Exam</button>
          </div>
        </div>
      </div>
    </form>

  </div>
</div>