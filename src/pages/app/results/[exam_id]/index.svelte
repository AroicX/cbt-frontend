<script>
    import { params } from "@roxi/routify";
    import { onMount } from "svelte";
    import { fetcher } from "../../../../actions";
    import Spinner from "../../../../components/spinner.svelte";
    import Results from "../../../../components/results/index.svelte";

    let data;
    const getData = async () => {
        const studentData = await fetcher.get(
            "/result/exams/" + $params.exam_id
        );
        data = studentData.data;
        return studentData.data;
    };

    const promise = getData();

    onMount(async () => {});
</script>

{#await promise}
    <Spinner />
{:then res}
    <Results
        examId={$params.exam_id}
        data={res}
        title={"Exams " + $params.exam_id}
    />
{/await}
