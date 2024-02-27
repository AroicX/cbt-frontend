<script>
    import {
        goto,
        params,
        url
    } from '@roxi/routify'
</script>

<div class="nk-sidebar" data-content="sidebarMenu">
    <div class="nk-sidebar-bar">
        <div class="nk-apps-brand">
            <a href="/app/" class="logo-link">
                <img class="logo-light logo-img" src="../../../../../images/fa-logo.jpeg" srcset="../../../../../images/fa-logo.jpeg" alt="logo">
                <img class="logo-dark logo-img" src="../../../../../images/fa-logo.jpeg" srcset="../../../../../images/fa-logo.jpeg" alt="logo-dark">
            </a>
        </div>
        <div class="nk-sidebar-element">
            <div class="nk-sidebar-body">
                <div class="nk-sidebar-content" data-simplebar>
                    <div class="nk-sidebar-menu">
                        <!-- Menu -->
                        <ul class="nk-menu apps-menu">
                            <li class="nk-menu-item active">
                                <a href="/app/" class="nk-menu-link nk-menu-switch" data-target="navDashboards"
                                    data-toggle="tooltip" data-placement="top" title="Dashboard">
                                    <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                                </a>
                            </li>
                            <li class="nk-menu-item" data-toggle="tooltip" data-placement="top" title="Examination">
                                <a href="/app/exams" class="nk-menu-link nk-menu-switch" data-target="navApps">
                                    <span class="nk-menu-icon"><em class="icon ni ni-menu-circled"></em></span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="/app/papers" class="nk-menu-link nk-menu-switch" data-target="navPages"
                                    data-toggle="tooltip" data-placement="top" title="Papers">
                                    <span class="nk-menu-icon"><em class="icon ni ni-files"></em></span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="/app/questions" class="nk-menu-link nk-menu-switch" data-target="navMisc"
                                    data-toggle="tooltip" data-placement="top" title="Questions">
                                    <span class="nk-menu-icon"><em class="icon ni ni-question"></em></span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="/app/centers" class="nk-menu-link nk-menu-switch" data-target="navMisc"
                                    data-toggle="tooltip" data-placement="top" title="Centers">
                                    <span class="nk-menu-icon"><em class="icon ni ni-alert-c"></em></span>
                                </a>
                            </li>
                            <li class="nk-menu-item">
                                <a href="/app/results" class="nk-menu-link nk-menu-switch" data-target="navMisc"
                                data-toggle="tooltip" data-placement="top" title="Results">
                                <span class="nk-menu-icon"><em class="icon ni ni-layers"></em></span>
                            </a>
                            </li>
                           
                            <!-- <li class="nk-menu-item">
                              <a href="/app/" class="nk-menu-link nk-menu-switch" data-target="navError">
                                  <span class="nk-menu-icon"><em class="icon ni ni-alert-c"></em></span>
                              </a>
                          </li>
                          <li class="nk-menu-hr"></li>
                          <li class="nk-menu-item">
                              <a href="/app/" class="nk-menu-link nk-menu-switch" data-target="navComponents">
                                  <span class="nk-menu-icon"><em class="icon ni ni-layers"></em></span>
                              </a>
                          </li> -->
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    </div>

</div>