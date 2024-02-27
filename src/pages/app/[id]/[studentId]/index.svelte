<script>
  import { params, url } from "@roxi/routify";
  import { onMount } from "svelte";
  import Spinner from "../../../../components/spinner.svelte";
  import { fetcher } from "../../../../actions";
  let userData;
  let loading = false;
  let state = 0;
  let papers;

  onMount(async () => {
    try {
      loading = true;
      const { data } = await fetcher.get("/students/" + $params.studentId);
      const papersData = await fetcher.get("/papers");
      papers = papersData.data.data;
      userData = data.data[0];
      loading = false;
    } catch (error) {
      // loading = false;
    }
  });
</script>

<div class="card-inner card-inner-lg">
  <div class="nk-block-head nk-block-head-lg">
    <div class="nk-block-between">
      <div class="nk-block-head-content">
        <h4 class="nk-block-title">Personal Information</h4>
      </div>
    </div>
  </div>
  <!-- .nk-block-head -->
  <ul class="nav nav-tabs">
    <li on:click={() => (state = 0)} class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#tabItem1"
        >Personal Details</a
      >
    </li>
    <!-- <li on:click={() => (state = 2)} class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#tabItem2">Result</a>
    </li> -->
    <!-- <li on:click={() => (state = 1)} class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#tabItem2">Papers</a>
    </li> -->
  </ul>

  {#if state === 0}
    <div class="nk-block">
      <div class="nk-data data-list">
        <div class="data-head">
          <h6 class="overline-title">Basics</h6>
        </div>
        <div class="data-item" data-toggle="modal" data-target="#profile-edit">
          <div class="data-col">
            <span class="data-label">Surname</span>
            <span class="data-value">{userData && userData.surname}</span>
          </div>
        </div>
        <!-- data-item -->
        <div class="data-item" data-toggle="modal" data-target="#profile-edit">
          <div class="data-col">
            <span class="data-label">Firstname</span>
            <span class="data-value">{userData && userData.firstname}</span>
          </div>
        </div>
        <div class="data-item" data-toggle="modal" data-target="#profile-edit">
          <div class="data-col">
            <span class="data-label">Othername</span>
            <span class="data-value text-soft"
              >{userData && userData.othername}</span
            >
          </div>
        </div>
        <!-- data-item -->
        <!-- data-item -->
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">Application ID</span>
            <span class="data-value">{userData && userData.application_id}</span
            >
          </div>
        </div>
        <!-- data-item -->
        <!-- <div class="data-item">
          <div class="data-col">
            <span class="data-label">Exam Score</span>
            <span class="data-value"
              >{scoreData && scoreData.data.data.score}</span
            >
          </div>
        </div> -->
        <!-- data-item -->
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">Gender</span>
            <span class="data-value">{userData && userData.gender}</span>
          </div>
        </div>
        <!-- data-item -->
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">Religion</span>
            <span class="data-value">{userData && userData.religion}</span>
          </div>
        </div>
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">Nationality</span>
            <span class="data-value">{userData && userData.nationality}</span>
          </div>
        </div>
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">State</span>
            <span class="data-value"
              >{userData && userData.state_of_origin}</span
            >
          </div>
        </div>
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">LGA</span>
            <span class="data-value"
              >{userData && userData.local_govt_area}</span
            >
          </div>
        </div>
        <!-- data-item -->
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">Passport ID</span>
            <span class="data-value">{userData && userData.passport_id}</span>
          </div>
        </div>
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">Passport URL</span>
            <span class="data-value">
              <a
                class="image_url"
                target="_blank"
                href={userData && userData.passport_url}>Image</a
              >
            </span>
          </div>
        </div>
        <div class="data-item">
          <div class="data-col">
            <span class="data-label">Date of Birth</span>
            <span class="data-value">{userData && userData.date_of_birth}</span>
          </div>
        </div>
      </div>
      <!-- data-list -->

      <!-- data-list -->
    </div>
  {/if}

  {#if state === 1}
    <div class="nk-block">
      <div class="row g-gs">
        {#if papers}
          {#each papers as paper}
            <div class="col-sm-6 col-lg-4 col-xxl-3">
              <div class="card card-bordered">
                <div class="card-inner">
                  <div class="team">
                    <div class="user-card user-card-s2">
                      <div class="user-info">
                        <h6>{paper.name}</h6>
                      </div>
                    </div>
                    <div class="team-details">
                      <p>
                        Duration: {paper.duration}
                        {paper.duration > 1 ? "hrs" : "hr"}
                      </p>
                    </div>

                    <div class="team-view">
                      <a
                        href={$url("./" + paper.id)}
                        class="btn btn-round btn-outline-light w-150px"
                        ><span>View Center</span></a
                      >
                    </div>
                  </div>
                  <!-- .team -->
                </div>
                <!-- .card-inner -->
              </div>
              <!-- .card -->
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}

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
  .image_url {
    text-decoration: underline;
    color: #3fbd9a;
  }
</style>
