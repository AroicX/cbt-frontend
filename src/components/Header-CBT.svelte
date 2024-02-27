<script>
  import { goto } from "@roxi/routify";

  import { getInitials, __deserialize } from "../helpers";

  let user = __deserialize("student")?.data;
  let currentPaper = __deserialize("currentPaper");

  const logOut = (e) => {
    localStorage.removeItem("student");
    localStorage.removeItem("answers_to_questions");
    localStorage.removeItem("current_questions");
    return $goto("/cbt");
  };
</script>

<!-- main header @s -->
<div class="nk-header nk-header-fixed nk-header-fluid is-light">
  <div class="container-fluid">
    <div class="nk-header-wrap">
      <div class="nk-menu-trigger d-xl-none ml-n1">
        <a
          href={`#`}
          class="nk-nav-toggle nk-quick-nav-icon"
          data-target="sidebarMenu"><em class="icon ni ni-menu" /></a
        >
      </div>
      <div class="nk-header-brand d-xl-none">
        <a href="/app/" class="logo-link">
          <img
            class="logo-light logo-img"
            src="../../images/logo.png"
            srcset="../../images/logo2x.png 2x"
            alt="logo"
          />
          <img
            class="logo-dark logo-img"
            src="../../images/logo-dark.png"
            srcset="../../images/logo-dark2x.png 2x"
            alt="logo-dark"
          />
        </a>
      </div>
      <!-- .nk-header-brand -->

      <div class="w-full flex flex-row justify-between ">
        <div class="flex flex-col mx-5 ">
          <h1 class="font-weight-bolder text-2xl">Name: {user?.name || ""}</h1>
          <span class="font-weight-bolder"
            >Examination No: <span class="text-uppercase"
              >{user?.exam_number || ""}</span
            ></span
          >
        </div>
        <div class="flex flex-col text-right mx-5">
          <h1 class="font-weight-bolder text-black text-lg">
            {currentPaper?.exam_name || ""}
          </h1>
          <span class="font-weight-bolder text-black text-lg"
            >{currentPaper?.paper_name || ""}</span
          >
        </div>
      </div>

      <div class="nk-header-tools">
        <ul class="nk-quick-nav">
          <li class="dropdown user-dropdown">
            <a href={`#`} class="dropdown-toggle mr-n1" data-toggle="dropdown">
              <div class="user-toggle">
                <div class="user-avatar sm">
                  <em class="icon ni ni-user-alt" />
                </div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-md dropdown-menu-right">
              <div class="dropdown-inner user-card-wrap bg-lighter">
                <div class="user-card">
                  <div class="user-avatar">
                    <span>{user ? getInitials(user?.name) : ""}</span>
                  </div>
                  <div class="user-info">
                    <span class="lead-text">{user?.name || ""}</span>
                    <span class="sub-text">{user?.user_id || ""}</span>
                  </div>
                </div>
              </div>
              <!-- <div class="dropdown-inner">
                                <ul class="link-list">
                                    <li><a href="html/user-profile-regular.html"><em class="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                                    <li><a href="html/user-profile-setting.html"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                    <li><a href="html/user-profile-activity.html"><em class="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                                    <li><a class="dark-switch" href={`#`}><em class="icon ni ni-moon"></em><span>Dark Mode</span></a></li>
                                </ul>
                            </div> -->
              <div class="dropdown-inner">
                <ul class="link-list">
                  <li>
                    <a href={`#`} on:click={() => logOut()}
                      ><em class="icon ni ni-signout" /><span>Sign out</span></a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- .nk-header-wrap -->
  </div>
  <!-- .container-fliud -->
</div>

<!-- main header @e -->
<style>
  .nk-header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 800;
    background: #fff;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
  }
</style>
