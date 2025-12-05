let jsonPassage, jsonAnswer, printJsonAnswer;
let count = 0;
let correctAnswer = 0;
const answer = document.querySelector(".answer");
const nextBtn = document.querySelector(".next-btn");
const maxNumber = Number(location.href.split("?")[1]);
// const maxNumber = 3; // 점수 확인 버튼 테스트용
const passageBox = document.querySelector(".passage-box");
const resultCase = document.querySelector(".result-case");
const testScoreBtn = document.querySelector(".test-score-btn");

document.querySelector(".img-case").addEventListener("click", () => {
  location.replace("../index.html");
});

testScoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let resultSet = {
    correctAnswer: correctAnswer,
    maxNumber: maxNumber,
  };
  localStorage.setItem("resultSet", JSON.stringify(resultSet));
  location.replace("/page/result.html");
});

function generateRandomNumber() {
  return Math.floor(Math.random() * 588);
}

function createElement(className, innerText) {
  const result = document.createElement("span");
  result.setAttribute("class", className);
  result.innerText = innerText;
  return result;
}

function printTest() {
  passageBox.replaceChildren();
  fetch("../json/question.json")
    .then((response) => response.json())
    .then((json) => {
      const data = json.QL;
      const index = generateRandomNumber();
      // const index = ; 특정 문제 출력용

      jsonPassage = data[index].passage;
      printJsonAnswer = data[index].answer;
      jsonAnswer = printJsonAnswer.replace(/ /g, "").toLowerCase();

      passageBox.append(
        createElement("number fwb", `no.${index + 1}`),
        createElement("passage", jsonPassage)
      );

      answer.focus();
    });
}

printTest();

function checkAnswer() {
  count++;
  answer.classList.toggle("dn");

  const isAnswer = answer.value.replace(/ /g, "").toLowerCase();
  const isCorrect = isAnswer === jsonAnswer;
  if (isCorrect) correctAnswer++;

  printResult(isCorrect, printJsonAnswer);
}

function printResult(isCorrect, printJsonAnswer) {
  resultCase.classList.remove("printPassage", "result");
  resultCase.replaceChildren();

  const result = isCorrect ? "정답!" : "오답!";

  resultCase.append(
    createElement("result fwb", result),
    createElement("printPassage fwb", printJsonAnswer)
  );

  if (count == maxNumber) {
    nextBtn.classList.add("dn");
    testScoreBtn.classList.remove("dn");
  }
}

let nextBtnClickCount = 0;

function next() {
  nextBtnClickCount++;

  if (nextBtnClickCount === 1) {
    checkAnswer();
  } else if (nextBtnClickCount === 2) {
    printTest();
    answer.classList.remove("dn");
    answer.value = "";
    resultCase.replaceChildren();
    nextBtnClickCount = 0;

    console.log(`현재 풀이한 문제의 수 : ${count}`);
    console.log(`현재 정답을 맞힌 문제의 수${correctAnswer}`);
    console.log(`풀기로한 문제의 수 : ${maxNumber}`);
  }
}

function triggerNext() {
  next();
}

nextBtn.addEventListener("click", () => {
  nextBtn.classList.toggle("ma");
  triggerNext();
});
