<script>
import { goto } from "@roxi/routify";

  import { onMount } from "svelte";
  import { fetcher } from "../../actions";

  import { __deserialize } from "../../helpers";

  let user = __deserialize("adminUser")?.data;
  let details;
  onMount(async () => {
    const { data } = await fetcher.get("/dashboard");
    details = data.data;
  });
</script>

<div class="dashbord__component">
  <!--  -->
  <div class="nk-block-head nk-block-head-sm">
    <div class="nk-block-between">
      <div class="nk-block-head-content">
        <h3 class="nk-block-title page-title">Overview</h3>
        <div class="nk-block-des text-soft">
          <p>Welcome {user?.fullname}, SchoolMo CBT.</p>
        </div>
      </div>
      <!-- .nk-block-head-content -->
      <div class="nk-block-head-content">
        <div class="toggle-wrap nk-block-tools-toggle">
          <a
            href={`#`}
            class="btn btn-icon btn-trigger toggle-expand mr-n1"
            data-target="pageMenu"><em class="icon ni ni-more-v" /></a
          >
          <div class="toggle-expand-content" data-content="pageMenu">
            <ul class="nk-block-tools g-3">
              <li>
                <div class="drodown">
                  <a
                    href={`#`}
                    class="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                    data-toggle="dropdown"
                    ><em
                      class="d-none d-sm-inline icon ni ni-calender-date"
                    /><span
                      ><span class="d-none d-md-inline">Last</span>
                      30 Days</span
                    ><em class="dd-indc icon ni ni-chevron-right" /></a
                  >
                  <div class="dropdown-menu dropdown-menu-right">
                    <ul class="link-list-opt no-bdr">
                      <li><a href={`#`}><span>Last 30 Days</span></a></li>
                      <li><a href={`#`}><span>Last 6 Months</span></a></li>
                      <li><a href={`#`}><span>Last 1 Years</span></a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="nk-block-tools-opt">
                <a href={`#`} class="btn btn-primary"
                  ><em class="icon ni ni-reports" /><span>Reports</span></a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- .nk-block-head-content -->
    </div>
    <!-- .nk-block-between -->
  </div>
  <!-- .nk-block-head -->
  <div class="nk-block">
    <div class="row g-gs">
      <div on:click={() => $goto("/app/centers")} class="col-sm-6 pointer">
        <div class="card card-bordered">
          <div class="card-inner">
            <div class="align-end flex-sm-wrap g-4 flex-md-nowrap">
              <div class="nk-sale-data">
                <span class="amount">{details && details.centers}</span>
                <span class="sub-title">Total Number of Centers</span>
              </div>
              <div class="nk-sales-ck">
                <canvas class="sales-bar-chart" id="activeSubscription" />
              </div>
            </div>
          </div>
        </div>
        <!-- .card -->
      </div>
      <div class="col-sm-6">
        <div class="card card-bordered">
          <div class="card-inner">
            <div class="align-end flex-sm-wrap g-4 flex-md-nowrap">
              <div class="nk-sale-data">
                <span class="amount">{details && details.exams}</span>
                <span class="sub-title">Total Number of Exams</span>
              </div>
              <div class="nk-sales-ck">
                <canvas class="sales-bar-chart" id="activeSubscription" />
              </div>
            </div>
          </div>
        </div>
        <!-- .card -->
      </div>
      <!-- .col -->
    </div>
    <!-- .row -->
  </div>
  <!-- .nk-block -->
  <!--  -->
</div>


<style>
  .pointer {
    cursor: pointer;
  }
</style>