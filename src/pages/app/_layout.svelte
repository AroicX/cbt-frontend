<script>
import { onMount } from "svelte";

    import Header from "../../components/Header.svelte";
    import Sidebar from "../../components/Sidebar.svelte";
    import {
        __deserialize
    } from "../../helpers";

    onMount(() => {
        if (!__deserialize('adminUser')) {
            return window.location.replace('/')
        }

    })
</script>

<svelte:head>
    <!-- <script type="module" src="../../assets/js/bundle.js?ver=2.2.0" ></script>
  <script type="module" src="../../assets/js/scripts.js?ver=2.2.0" ></script> -->
</svelte:head>

<div class="nk-app-root">
    <Sidebar />

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