let jsonPassage, jsonAnswer, count;
const maxNumber = location.href.split("?")[1];
const passageBox = document.querySelector(".passage-box");
const submitAnswer = document.querySelector(".submit-answer");
const answer = document.querySelector(".answer");
const answerInputBox = document.querySelector(".answer-input-box");

document.querySelector(".img-case").addEventListener("click", () => {
  location.replace("../index.html");
});

function randNum(max) {
  count++;
  return Math.floor(Math.random() * (max - 1)) + 1;
}

function printTest() {
  fetch("../json/question.json")
    .then((response) => response.json())
    .then((json) => {
      const data = json.QL;
      const idx = randNum(maxNumber);
      jsonPassage = data[idx].passage;
      jsonAnswer = data[idx].answer;

      const passage = document.createElement("span");
      passage.classList.add("passage");
      passageBox.innerHTML = jsonPassage;
    });
}
printTest();

function printAnswer(text) {
  answerInputBox.classList.remove("printPassage", "result");

  const printPassage = document.createElement("span");
  printPassage.innerHTML = jsonAnswer;
  printPassage.classList.add("printPassage");

  const result = document.createElement("span");
  result.innerHTML = text;
  result.classList.add("result");

  answerInputBox.prepend(printPassage);
  answerInputBox.prepend(result);
}

function checkAnswer(text) {
  answer.classList.add("dn");
  printAnswer(text === jsonAnswer ? "정답!" : "오답!");
}

submitAnswer.addEventListener("click", () => {
  checkAnswer();
});
