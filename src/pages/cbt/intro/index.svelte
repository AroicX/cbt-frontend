<script>
  import {
    onMount
  } from "svelte";
  import introJs from "intro.js";
  import {
    GET_PAPERS
  } from "../../../actions/papers";
  import {
    goto
  } from "@roxi/routify";
import { __deserialize } from "../../../helpers";


  let view = false;
  let questions = null;
  let papers = []
  let paper_id = null;
  let selectedPaper = null;


  let user = __deserialize('student')?.data;


  $: if (selectedPaper) {
    localStorage.setItem('currentPaper', JSON.stringify({
      paper_id: selectedPaper.id,
      exam_name: selectedPaper.exam_name,
      paper_name: selectedPaper.name
    }))
    $goto('/cbt/start')
  }

  onMount(() => {
    getPapers();
    setTimeout(() => {
      // introJs().start();
    }, 100);
  })



  const fullscreen = () => {
    view = true;
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();

    }

    document.body.style.background = 'white'
  }

  function getPapers() {
    const callback = (response) => {
      papers = response;
    }
    const onError = (error) => {
      console.log(error);
    }

    GET_PAPERS(callback, onError);
  }
</script>



<main>

  {#if !view}
  
  <div class="w-full container bg-gray-100 rounded mt-32 mx-32 my-10 p-3" style="margin-top: 50px"> 

    <div class="absolute top-10 right-10 flex flex-col">
      <div class="relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span class="text-md font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Completed
            </span>
          </div>
          <div class="text-right">
            <span class="text-lg font-12 font-semibold inline-block text-blue-600">
              20%
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200" style="width: 300px">
          <div style="width:30%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
        </div>
      </div>
    </div>
    
    <br>
    <br>

  <div class="question" data-intro="Question Block">
    <div class="flex flex-col mx-5">
      <h1 class="font-16 text-black font-bold" data-title="Instructions"
      data-intro="Read through questions carefully">Question 1</h1>
 
      <br>
      <img class="user-image"  src={user.passport_url} alt={user.passport_url}>
 
      <p class="font-14 text-black"> ______ Can be defined as an unpleasant occurrence that happens unexpectedly and cause injury And damage</p>


       <div class="flex flex-wrap justify-between  w-full my-10">
        <button class="button button--option" data-title="Instructions"
        data-intro="Select desired Answer">Option One </button>
        <button class="button button--option">Option Two </button>
        <button class="button button--option">Option Three </button>
        <button class="button button--option">Option Four </button>
      </div>
  
      </div>
    
   
  </div>

  </div>


  <div class="w-full container rounded mx-32 p-3">
   <div class="flex flex-wrap">
    <button class="button button--paginated button--paginated__active ">1</button>
    <button class="button button--paginated">2</button>
   </div>
   <br>
   <br>
   <br>
   <button class="px-5 py-2 bg-blue-500 text-white my-10 right pull-right" data-title="Instructions"
   data-intro="Click to start exam, select paper to beign" on:click={() => fullscreen()}>Start Exam</button>
  </div>
  {:else}

  <div class="row">
    <div class="col-sm-3 my-2">
  
      <div class="form-group">
        <label class="form-label" for="default-06">Select Paper</label>
        <div class="form-control-wrap ">
          <div class="form-control-select">
            <select class="form-control px-2" id="default-06" bind:value={selectedPaper}  required>
              <option value="">Select Option</option>
              {#each papers as paper}
              <option value={paper}>{paper.name} - {paper.exam_name}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    </div>
    </div>
  

  {/if}
  
</main>


<style style="scss">

  .liquid{
    transition: all 0.8s ease-in-out;
  }
  
  .center-box{
    position: relative;
    top: 1rem;
    right: 3rem;
  }
  
  .font-10 {
    font-size: 1rem;
  }
  
  .font-12 {
    font-size: .6rem;
  }
  
  .font-14 {
    font-size: 1rem;
  }
  
  .font-15 {
    font-size: 1rem;
  }
  
  .font-16 {
    font-size: 1.2rem;
  }
  
  .font-24 {
    font-size: 2.5rem;
  }
  
  .text-blue {
    color: #3c82f6;
  }
  
  .text--red {
    color: red;
  }
  
  button{
    outline: none !important;
  }
  .button {
    display: block;
    min-width: 140px;
    padding: .5rem 1.5rem;
    background: #3c82f6;
    color: #fff;
    font-size: 1rem;
    border-radius: .2rem;
    outline: none !important;
  }
  
  .button--bordered {
    background: #fff;
    border: 1px solid #3c82f6;
    color: #3c82f6;
  }
  
  .button--option {
    width: 48%;
    height: 50px !important;
    margin: 1rem 0;
  }
  .button--option:hover {
  background: #1a5dca;
  box-shadow: 0px 5px 15px rgba(106, 127, 130, 0.09);
  }
  .button--option--active {
  background: #002a6d;
  box-shadow: 0px 5px 15px rgba(17, 18, 19, 0.09);
  }
  
  .button--paginated {
    width: 40px;
    min-width: auto;
    padding: .5rem ;
    margin: .5rem;
    text-align: center;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    font-size: .8rem;
    font-weight: bolder;
    background: #aaaaaa;
  }
  
  
  .button--paginated:hover {
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-transform: translateY(0.2rem);
            transform: translateY(0.2rem);
    -webkit-box-shadow: 0px 5px 15px rgba(106, 127, 130, 0.09);
            box-shadow: 0px 5px 15px rgba(106, 127, 130, 0.09);
  }
  
  .button--paginated__active {
    background: #3c82f6;
  }
  .button--paginated__answered {
    background: #0bb64c !important;
  }
  
  
  
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: inherit;
            box-sizing: inherit;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    line-height: 1.7;
    color: #777;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }
  
  .header {
    width: 100%;
    border-bottom: 0.02rem solid #d6d6d6;
  }
  
  .header progress {
    width: 100%;
    padding: 1rem;
  }
  
  .container {
    position: relative;
    background: aliceblue;
  }
  
  .container .question {
    margin: 5rem 2rem;
  }
  .user-image{
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
  
  
  /*# sourceMappingURL=main.css.map */
  </style>