<script>
  import { params } from "@roxi/routify/runtime/helpers";
  import { onMount } from "svelte";
  import { fetcher } from "../../../../../actions";
  import Spinner from "../../../../../components/spinner.svelte";
  import { formatDateString } from "../../../../../helpers";

  let resData;
  let loading = false;
  onMount(async () => {
    try {
      loading = true;
      const { data } = await fetcher.get(
        "/result/student/1/" + $params.studentId
      );
      loading = false;
      resData = data.data[0];
    } catch (error) {}
  });
</script>

<div class="card-inner card-inner-lg">
  <div class="nk-block-head nk-block-head-lg">
    <div class="nk-block-between">
      <div class="nk-block-head-content">
        <h4 class="nk-block-title">Student Result</h4>
      </div>
    </div>
  </div>
  <div class="nk-block">
    <div class="nk-data data-list">
      <div class="data-head">
        <h6 class="overline-title">Result</h6>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Firstname</span>
          <span class="data-value text-soft"
            >{resData && resData.firstname}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Surname</span>
          <span class="data-value text-soft">{resData && resData.surname}</span>
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Othername</span>
          <span class="data-value text-soft"
            >{resData && resData.othername}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Fullname</span>
          <span class="data-value text-soft">{resData && resData.fullname}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Paper 1 score</span>
          <span class="data-value">{resData && resData.paper_1_score}</span>
        </div>
      </div>
      <!-- data-item -->
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Paper 2 score</span>
          <span class="data-value">{resData && resData.paper_2_score}</span>
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Total</span>
          <span class="data-value text-soft">{resData && resData.total}</span>
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Average total</span>
          <span class="data-value text-soft"
            >{resData && resData.avg_total}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Date of Birth</span>
          <span class="data-value text-soft"
            >{resData && formatDateString(resData.date_of_birth)}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Gender</span>
          <span class="data-value text-soft">{resData && resData.gender}</span>
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Telephone</span>
          <span class="data-value text-soft"
            >{resData && resData.telephone}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Church Name</span>
          <span class="data-value text-soft"
            >{resData && resData.church_name}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Church Denomination</span>
          <span class="data-value text-soft"
            >{resData && resData.telephone}</span
          >
        </div>
      </div>

      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">First Choice</span>
          <span class="data-value text-soft"
            >{resData && resData.first_choice}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Second Choice</span>
          <span class="data-value text-soft"
            >{resData && resData.second_choice}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Third Choice</span>
          <span class="data-value text-soft"
            >{resData && resData.third_choice}</span
          >
        </div>
      </div>
      <div class="data-item" data-toggle="modal" data-target="#profile-edit">
        <div class="data-col">
          <span class="data-label">Center</span>
          <span class="data-value text-soft">{resData && resData.center}</span>
        </div>
      </div>
    </div>
    <!-- data-list -->

    <!-- data-list -->
  </div>

  <!-- .nk-block -->
</div>

{#if loading}
  <Spinner />
{/if}

<style>
  .nk-block-title {
    margin-top: 4rem;
  }

  .card-inner.card-inner-lg {
    margin-top: 0px;
    padding-top: 0px;
  }
  .nk-block-between {
    margin-top: 0px;
  }
  .nk-block-title {
    margin-top: 0px;
    font-size: 20px;
    font-weight: 700;
  }
</style>
