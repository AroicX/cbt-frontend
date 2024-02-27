<script>
    import Header from "../../../components/Header-CBT.svelte";
</script>

<svelte:head>


</svelte:head>

<div class="nk-app-root">
    <!-- <Sidebar/> -->

    <!-- main @s -->
    <div class="nk-main ">
        <!-- wrap @s -->
        <div class="nk-wrap ">
            <!-- main header @s -->
            <Header />
            <!-- main header @e -->
            <!-- content @s -->
            <div class="nk-content ">
                <slot />
            </div>
            <!-- content @e -->
        </div>
        <!-- wrap @e -->
    </div>
    <!-- main @e -->
</div>


<style>
    .nk-wrap {
        /* background: red; */
        display: flex;
        width: 100% !important;
        flex-direction: column;
        min-height: 100vh;
    }
</style>