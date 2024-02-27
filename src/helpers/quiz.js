import Questions from "./questions";

import { tick } from "svelte";

let clicked = false;
$: if (clicked) {
  console.log("cliked");
}

export default class Quiz extends Questions {
  constructor(questions) {
    super();
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    this.populate();
    // console.log(questions);
  }

  populate() {
    if (this.isEnded()) {
      this.showScores();
    } else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = this.getQuestionIndex().text;

      // show options
      var choices = this.getQuestionIndex().choices;
      for (var i = 0; i < choices.length; i++) {
        // console.log(choices[i]);
        // console.log(i);
        var element = document.getElementById("choice" + i);
        element.innerHTML = choices[i];
        // this.userGuess("btn" + i, choices[i]);
      }

      this.showProgress();
    }
  }

  guess(guess) {
    // var button = document.getElementById(id);
    // button.onclick = function () {
    this.quizGuess(guess);
    this.populate();
    // }
  }

  showProgress() {
    var currentQuestionNumber = this.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML =
      "Question " + currentQuestionNumber + " of " + this.questions.length;
  }

  showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + this.score + "</h2>";
    gameOverHTML +=
      "<br><br><a href='' class='text-center' style='text-decoration:none;'><button id='btn3' class='btn btn-info'>Back to Home</button></a>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  }
  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  quizGuess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }

    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}
