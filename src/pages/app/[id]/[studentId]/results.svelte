<script>
    import { params } from "@roxi/routify";
    import { fetcher } from "../../../../actions";
    import Spinner from "../../../../components/spinner.svelte";
    import Results from "../../../../components/results/index.svelte";

    let data;
    const getData = async () => {
        const studentData = await fetcher.get(
            "/result/center/" + $params.id + "/" + $params.studentId
        );
        data = studentData.data;
        return studentData.data;
    };

    let promise = getData();
</script>

{#await promise}
    <Spinner />
{:then res}
    <Results
        examId={$params.studentId}
        {data}
        title={"Exams " + $params.studentId}
    />
{/await}
