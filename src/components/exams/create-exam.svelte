<script>

  import {
    createEventDispatcher
  } from 'svelte';
import { CREATE_EXAM } from '../../actions/exams';
import Toastr from 'toastr'


  const dispatch = createEventDispatcher();

  let data = {
    name: '',
    type: '',
    subject: '',
    date: '',
    duration: ''
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const callback = (response) => {
      dispatch('formdata', response)
      Toastr.success('Exam has been Added.')


    }
    const onError = (error) => {
      if (error.data) {
        Toastr.error(error.data.message)
        return false;
      }
    }

    CREATE_EXAM(data, callback, onError);
  }
</script>

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
                  <select class="form-control" id="default-06" bind:value={data.type} required>
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
              <div class="form-control-wrap">
                <input type="date" class="form-control" name="date" bind:value={data.date} placeholder="02/3/2021"
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