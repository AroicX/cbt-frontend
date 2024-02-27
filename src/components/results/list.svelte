<script>
    import { url } from "@roxi/routify";
    import { onMount } from "svelte";
    import { fetcher } from "../../actions";
    import { formatDateString } from "../../helpers";
    import Spinner from "../spinner.svelte";

    export let show;
    export let center;
    export let load;
    let exams;
    let loading = false;
    onMount(async () => {
        try {
            loading = true;
            const { data } = await fetcher.get("/exams");
            exams = data.data;
            loading = false;
        } catch (error) {}
    });
</script>

{#if !show}
    <div class="nk-block-head-content">
        <h3 class="nk-block-title page-title">All Exams</h3>
        <div class="nk-block-des text-soft">
            <p>Total Exams: {exams && exams.length}</p>
        </div>
    </div>
{/if}

{#if exams}
    {#each exams as exam}
        <div class="col-sm-6 col-lg-4 col-xxl-3">
            <div class="card card-bordered">
                <div class="card-inner">
                    <div class="team">
                        <div class="user-card user-card-s2">
                            <div class="user-info">
                                <h6>{exam.exam_name}</h6>
                            </div>
                        </div>
                        <div class="team-details">
                            <p>
                                Exam Date: {formatDateString(exam.exam_date)}
                            </p>
                        </div>

                        <div class="team-view">
                            <a
                                href={center
                                    ? $url("./" + exam.exam_id + "/results")
                                    : $url("./" + exam.exam_id)}
                                class="btn btn-round btn-outline-light w-150px"
                                ><span>View Results</span></a
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

{#if loading && !load}
    <Spinner />
{/if}

<style>
    .nk-block-des.text-soft {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
</style>
