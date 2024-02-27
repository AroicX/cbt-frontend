<script>
    import { url } from "@roxi/routify";

    import { onMount } from "svelte";
    import { fetcher } from "../actions";
    import Spinner from "./spinner.svelte";
    let centers;
    let loading = false;
    let search;
    export let type;
    onMount(async () => {
        try {
            loading = true;
            const { data } = await fetcher.get("/centers");
            centers = data.data;
            loading = false;
        } catch (error) {
            // loading = false;
        }
    });
</script>

<div class="nk-content ">
    <div class="container-fluid">
        <div class="nk-content-inner">
            <div class="nk-content-body">
                <div class="flex__">
                    <div style="flex:1" class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-between">
                            <div class="nk-block-head-content">
                                <h3 class="nk-block-title page-title">
                                    Centers
                                </h3>
                                <div class="nk-block-des text-soft">
                                    <p>
                                        {centers &&
                                            `You have total ${centers.length} centers.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- .nk-block-between -->
                    </div>
                    <div class="nk-header-search ml-3 ml-xl-0">
                        <em class="icon ni ni-search" />
                        <input
                            type="text"
                            class="form-control border-transparent form-focus-none"
                            placeholder="Search for center with Center ID"
                            bind:value={search}
                        />
                    </div>
                </div>

                <!-- .nk-block-head -->
                <div class="nk-block nk-block-lg">
                    <div class="row g-gs">
                        {#if centers && search}
                            {#each centers as { state, name, address, id }, i}
                                {#if id === parseInt(search)}
                                    <div class="col-sm-6 col-lg-4 col-xxl-3">
                                        <div class="card card-bordered">
                                            <div class="card-inner">
                                                <div class="team">
                                                    <div
                                                        class="user-card user-card-s2"
                                                    >
                                                        <div class="user-info">
                                                            <h6>{name}</h6>
                                                        </div>
                                                    </div>
                                                    <ul class="team-info">
                                                        <li>
                                                            <span
                                                                style="margin-right: 30px;"
                                                                class="space"
                                                                >State:</span
                                                            ><span>{state}</span
                                                            >
                                                        </li>
                                                        <li>
                                                            <span
                                                                class="space__address"
                                                                >Address:</span
                                                            ><span
                                                                >{address}</span
                                                            >
                                                        </li>
                                                    </ul>
                                                    <div class="team-view">
                                                        {#if type === "dashboard"}
                                                            <a
                                                                href={$url(
                                                                    "/app/" + id
                                                                )}
                                                                class="btn btn-block btn-dim btn-primary"
                                                                ><span
                                                                    >View Center</span
                                                                ></a
                                                            >
                                                        {:else}
                                                            <a
                                                                href={$url(
                                                                    "/app/results/centers/" +
                                                                        id
                                                                )}
                                                                class="btn btn-block btn-dim btn-primary"
                                                                ><span
                                                                    >View Center</span
                                                                ></a
                                                            >
                                                        {/if}
                                                    </div>
                                                </div>
                                                <!-- .team -->
                                            </div>
                                            <!-- .card-inner -->
                                        </div>
                                        <!-- .card -->
                                    </div>
                                {/if}
                            {/each}
                        {:else if centers}
                            {#each centers as { state, name, address, id }, i}
                                <div class="col-sm-6 col-lg-4 col-xxl-3">
                                    <div class="card card-bordered">
                                        <div class="card-inner">
                                            <div class="team">
                                                <div
                                                    class="user-card user-card-s2"
                                                >
                                                    <div class="user-info">
                                                        <h6>{name}</h6>
                                                    </div>
                                                </div>
                                                <ul class="team-info">
                                                    <li>
                                                        <span
                                                            style="margin-right: 30px;"
                                                            class="space"
                                                            >State:</span
                                                        ><span>{state}</span>
                                                    </li>
                                                    <li>
                                                        <span
                                                            class="space__address"
                                                            >Address:</span
                                                        ><span>{address}</span>
                                                    </li>
                                                </ul>
                                                <div class="team-view">
                                                    {#if type === "dashboard"}
                                                        <a
                                                            href={$url(
                                                                "/app/" + id
                                                            )}
                                                            class="btn btn-block btn-dim btn-primary"
                                                            ><span
                                                                >View Center</span
                                                            ></a
                                                        >
                                                    {:else}
                                                        <a
                                                            href={$url(
                                                                "/app/results/centers/" +
                                                                    id
                                                            )}
                                                            class="btn btn-block btn-dim btn-primary"
                                                            ><span
                                                                >View Center</span
                                                            ></a
                                                        >
                                                    {/if}
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

                        <!-- .col -->
                    </div>
                </div>
                <!-- .nk-block -->
            </div>
        </div>
    </div>
</div>

{#if loading}
    <Spinner />
{/if}

<style>
    .space {
        /* margin-right: 30px; */
        flex: unset;
    }

    .space__address {
        margin-right: 10px;
    }
    .team-info li {
        justify-content: unset;
    }
    .nk-content {
        margin-left: 0px;
        margin-top: 0px;
        padding-left: 0px;
        padding-top: 0px;
    }
    .flex__ {
        display: flex;
        flex-direction: row;
        margin-bottom: 1.5rem;
    }
</style>
