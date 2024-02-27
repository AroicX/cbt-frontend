<script>
  import { onMount } from "svelte";
  import { goto } from "@roxi/routify/runtime/helpers";

  import Questions from "../../../helpers/questions";
  import {
    ANSWER_QUESTION,
    GET_ANSWERED_QUESTIONS,
    START_EXAM,
    END_EXAM,
  } from "../../../actions/cbt";

  import Toastr from "toastr";
  import { convertTime, findIndex, __deserialize } from "../../../helpers";
  import { GET_PAPERS } from "../../../actions/papers";

  let currentPaper = __deserialize("currentPaper");
  let current_questions = __deserialize("current_questions")
    ? __deserialize("current_questions")?.questions
    : [];
  let arr =
    __deserialize("current_questions")?.paper_id ===
    __deserialize("answers_to_questions")?.paper_id
      ? __deserialize("answers_to_questions")?.answers
      : [];
  let questionId = null;
  let loading = false;
  let pages = [];
  let anwsered =
    __deserialize("current_questions")?.paper_id ===
    __deserialize("answers_to_questions")?.paper_id
      ? __deserialize("answers_to_questions")?.answers
      : [];
  let questionIndex = 0;
  let questions = null;
  let questionCount = 0;
  let selectedAnswer = null;
  let timer = null;
  let passage = false;
  let message = null;

  //
  let papers = [];
  let paper_id = null;
  let selectedPaper = null;

  $: if (selectedPaper) {
    localStorage.setItem(
      "currentPaper",
      JSON.stringify({
        paper_id: selectedPaper.id,
        exam_name: selectedPaper.exam_name,
        paper_name: selectedPaper.name,
      })
    );
    window.location.reload();
  }

  $: if (questions) {
    loading = false;
    let empty = [];
    questions.map((elem) => {
      var data = new Questions(
        elem["question"], // text
        [
          elem["option_a"],
          elem["option_b"],
          elem["option_c"],
          elem["option_d"],
        ], //choice
        elem["id"], // answer
        elem["content"] ? elem["content"] : null, // content
        elem["sample"] ? elem["content"] : null // sample
      );
      empty.push(data);
    });

    localStorage.current_questions = JSON.stringify({
      paper_id: currentPaper.paper_id,
      questions: questions,
    });

    questions = empty;
    questionCount = questions.length;
    populate();
  }

  onMount(() => {
    loading = true;
    startExam();
    getPapers();
  });

  function getPapers() {
    const callback = (response) => {
      papers = response;
    };
    const onError = (error) => {
      console.log(error);
    };

    GET_PAPERS(callback, onError);
  }

  function populate() {
    var sample_image = document.getElementById("sample_image");
    var sample_image_question = document.getElementById(
      "sample_image_question"
    );
    var read = document.getElementById("read");
    var element = document.getElementById("question");
    var content = document.getElementById("passage");
    element.innerHTML = getQuestionIndex().text;
    content.innerHTML = getQuestionIndex().passage;

    if (getQuestionIndex().passage === "undefined") {
      read.style.display = "none";
      content.style.display = "none";
    } else {
      read.style.display = "block";
      content.style.display = "block";
    }

    if (getQuestionIndex().text?.startsWith("data:image")) {
      sample_image.style.display = "block";
      sample_image_question.style.display = "block";
      sample_image.src = getQuestionIndex().passage;
      sample_image_question.src = getQuestionIndex().text;
      read.style.display = "none";
      element.style.display = "none";
      content.style.display = "none";
    } else {
      sample_image.style.display = "none";
      sample_image_question.style.display = "none";
      element.style.display = "block";
      read.style.display = "block";
    }

    var choices = getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
    }

    let find = arr?.filter(function (item) {
      return parseInt(item.question_id) === parseInt(getQuestionIndex().answer);
    });

    if (find.length > 0) {
      questionId = parseInt(find[0].question_id);
      selectedAnswer = find[0].selected.toLowerCase();
    }

    showProgress();
  }

  function showProgress() {
    var currentQuestionNumber = questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML =
      "Question " + currentQuestionNumber + " of " + questions.length;
  }

  function getQuestionIndex() {
    return questions[questionIndex];
  }

  const prev = (e) => {
    questionIndex--;
    populate();
  };

  const next = (e) => {
    if (selectedAnswer) {
      let data = {
        selected: selectedAnswer,
      };

      localStorage.answers_to_questions = JSON.stringify({
        paper_id: currentPaper.paper_id,
        answers: anwsered,
      });

      questionId = null;
      selectedAnswer = null;
      questionIndex++;
      populate();
    } else {
      questionId = null;
      selectedAnswer = null;
      questionIndex++;
      populate();
    }
  };

  const selected = (i) => {
    questionId = null;
    selectedAnswer = null;
    questionIndex = i;
    populate();
  };

  function getAnsweredQuestion() {
    const callback = (response) => {
      arr = response;
      anwsered = arr;
    };
    const onError = (error) => {
      console.log(error);
    };

    GET_ANSWERED_QUESTIONS(currentPaper.paper_id, callback, onError);
  }

  function handlePassage() {
    var content = document.getElementById("passage");

    if (passage) {
      passage = !passage;
      content.style.display = "none";
    } else {
      passage = !passage;
      content.style.display = "block";
    }
  }

  function startExam() {
    const callback = (response) => {
      let { data } = response;

      if (response.message === "Exams session has already ended") {
        message = response.message;
      } else {
        pages = data.questions;
        questions = data.questions;
      }
    };
    const onError = (error) => {
      console.log(error);
    };

    START_EXAM(currentPaper.paper_id, callback, onError);
  }

  function endExam() {
    Toastr.warning('Submitting exam ...');
    const callback = (response) => {
      localStorage.removeItem("current_questions");
      localStorage.removeItem("answers_to_questions");
      Toastr.success(response.message);
      message = "Exams session has already ended"
      // $goto("/cbt/intro");
    };
    const onError = (error) => {
      console.log(error);
    };

    END_EXAM(currentPaper.paper_id, anwsered, callback, onError);
  }

  const selectAnswer = (question_id, selected_answer) => {
    if (arr.length > 0) {
      const result = arr.find((item) => {
        if (parseInt(item.question_id) === parseInt(question_id)) {
          item.selected = selected_answer;
          return arr;
        }
      });
      if (!result) {
        arr.push({
          question_id: question_id,
          selected: selected_answer,
        });
      }
    } else {
      arr.push({
        question_id: question_id,
        selected: selected_answer,
      });
    }
    questionId = question_id;
    anwsered = arr;
    selectedAnswer = selected_answer;
  };
</script>

{#if message}
  <div class="row">
    <div class="col-lg-12">
      <p class="font-2xl font-16 text-orange">Exams session has ended, Please select the next paper.</p>
    </div>
    <div class="col-sm-3 my-2">
      <div class="form-group">
        <label class="form-label" for="default-06">Select Paper</label>
        <div class="form-control-wrap ">
          <div class="form-control-select">
            <select
              class="form-control px-2"
              id="default-06"
              bind:value={selectedPaper}
              required
            >
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
{:else}
  <main>
    <button
      id="read"
      class={`bg-blue-400 block p-3 text-white cursor-pointer absolute top-200 right-10`}
      style="z-index: 100;"
      on:click={() => handlePassage()}
      >{passage ? "Close Passage" : "Read Passage"}</button
    >

    <div class="w-full container rounded mt-32 mx-32 p-3 center-box">
      <div class="absolute top-0 right-10 flex flex-col ">
        <div class="relative pt-1">
          <br />
          <br />
          <br />

          <div class="flex mb-2 items-center justify-between">
            <div>
              <span
                class="text-sm font-12 font-semibold inline-block  py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200"
              >
                Completed
              </span>
            </div>
            <div class="text-right">
              <span
                class="text-lg font-12 font-semibold inline-block text-blue-600"
              >
                {Math.ceil((anwsered?.length / questions?.length) * 100)}%
              </span>
            </div>
          </div>
          <div
            class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200"
            style="width: 300px"
          >
            <div
              style={`${Math.ceil(
                (anwsered?.length / questions?.length) * 100
              )}`}
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 liquid"
            />
          </div>
        </div>
      </div>

      <br />
      <br />

      <div class="question" data-intro="Question Block">
        <div class="flex flex-col mx-5">
          <img
            id="sample_image"
            class="my-2"
            src
            width="500px"
            height="500px"
          />
          <p
            style="height: 200px; transition: all 0.5s ease-in-out"
            class="font-14 text-black overflow-y-scroll border border-black border-4 p-2 round-sm"
            id="passage"
          />
          <br />
          <br />
          <h1 class="font-16 text-black font-bold" id="progress">{""}</h1>
          <br />

          <p
            class="font-14 text-black"
            id="question"
            data-title="Instructions"
            data-intro="Read through questions carefully"
          />
          <img
            id="sample_image_question"
            class="my-2"
            src
            width="200px"
            height="200px"
          />

          <br />
          <br />
          <div class="flex flex-wrap justify-between ">
            <button
              class={`button button--option ${
                selectedAnswer === "a" ? "button--option--active" : ""
              }`}
              id="btn0"
              on:click={() => {
                selectAnswer(getQuestionIndex().answer, "a"), next();
              }}
              data-title="Instructions"
              data-intro="Select desired Answer"
            >
              <span id="choice0" />
            </button>
            <button
              class={`button button--option ${
                selectedAnswer === "b" ? "button--option--active" : ""
              }`}
              id="btn1"
              on:click={() => {
                selectAnswer(getQuestionIndex().answer, "b"), next();
              }}
            >
              <span id="choice1" />
            </button>
            <button
              class={`button button--option ${
                selectedAnswer === "c" ? "button--option--active" : ""
              }`}
              id="btn2"
              on:click={() => {
                selectAnswer(getQuestionIndex().answer, "c"), next();
              }}
            >
              <span id="choice2" />
            </button>
            <button
              class={`button button--option ${
                selectedAnswer === "d" ? "button--option--active" : ""
              }`}
              id="btn3"
              on:click={() => {
                selectAnswer(getQuestionIndex().answer, "d"), next();
              }}
            >
              <span id="choice3" />
            </button>
          </div>

          {#if parseInt(anwsered?.length) === parseInt(questions?.length)}
            <div class="flex justify-end">
              <button
                class={`bg-blue-500 text-white py-3 px-5
          rounded-sm outline-none cursor-pointer hover:bg-blue-700`}
                on:click={() => endExam()}>Finish Exam</button
              >
            </div>
          {:else}
            <div class="flex justify-between">
              <button
                class={`${
                  questionIndex < 1 ? "bg-gray-400" : "bg-blue-500"
                } text-white py-3 px-5 rounded-sm
          outline-none cursor-pointer`}
                on:click={() => prev()}
              >
                Previous</button
              >
              <button
                class={`${
                  questionCount - 1 > questionIndex
                    ? "bg-blue-500"
                    : "bg-gray-400"
                } text-white py-3 px-5
          rounded-sm outline-none cursor-pointer hover:bg-blue-600`}
                on:click={() => next()}>Next</button
              >
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="w-full container rounded mx-32 p-3 center-box">
      <div class="flex flex-wrap">
        {#each pages as page, i}
          <button
            class={`button button--paginated ${
              findIndex(anwsered, page.id) === page.id
                ? "button--paginated__answered "
                : ""
            }  ${questionIndex === i ? "button--paginated__active" : ""}`}
            on:click={() => selected(i)}>{i + 1}</button
          >
        {/each}
      </div>
    </div>

    <div class="flex py-5 mx-auto">
      <div class="flex">
        <button class="bg-blue-500 py-1 px-2 " />
        <span class="text-black mx-2">Primary Color</span>
      </div>
      <div class="flex">
        <button class="bg-green-500 py-1 px-2" />
        <span class="text-black mx-2">Answered Question</span>
      </div>
      <div class="flex">
        <button class="bg-gray-300 py-1 px-2" />
        <span class="text-black mx-2">Unanwered Questions</span>
      </div>
    </div>
  </main>
{/if}

<style style="scss">
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
  .liquid {
    transition: all 0.8s ease-in-out;
  }

  .center-box {
    position: relative;
    top: 1rem;
    right: 3rem;
  }

  .font-10 {
    font-size: 1rem;
  }

  .font-12 {
    font-size: 0.6rem;
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

  button {
    outline: none !important;
  }
  .button {
    display: block;
    min-width: 140px;
    padding: 0.5rem 1.5rem;
    background: #3c82f6;
    color: #fff;
    font-size: 1rem;
    border-radius: 0.2rem;
    outline: none !important;
  }

  .button--bordered {
    background: #fff;
    border: 1px solid #3c82f6;
    color: #3c82f6;
  }

  .button--option {
    width: 48%;
    height: 55px !important;
    margin: 1rem 0;
  }
  /* .button--option:hover { */
  /* background: #1a5dca; */
  /* border: 5px solid #001d4d; */
  /* } */
  .button--option--active {
    background: #002a6d;
    box-shadow: 0px 5px 15px rgba(17, 18, 19, 0.09);
    border: 5px solid #001d4d;
  }

  .button--paginated {
    width: 40px;
    min-width: auto;
    padding: 0.5rem;
    margin: 0.5rem;
    text-align: center;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    font-size: 0.8rem;
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
    background: #0bb64c;
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
    font-family: "IBM Plex Sans", sans-serif;
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
</style>
