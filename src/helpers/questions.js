export default class Questions {
  constructor(text, choices, answer, passage, sample) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.passage = passage;
    this.sample = sample;
  }

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}
