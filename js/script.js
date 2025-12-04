let jsonPassage, jsonAnswer;
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
      jsonAnswer = data[index].answer.replace(/ /g, "").toLowerCase();

      passageBox.append(
        createElement("number fwb", `no.${index + 1}`),
        createElement("passage", jsonPassage)
      );
    });
}

printTest();

function checkAnswer(text) {
  answer.classList.toggle("dn");
  printAnswer(text === jsonAnswer);
}

function printAnswer(bool) {
  resultCase.classList.remove("printPassage", "result");

  const result = bool ? "정답!" : "오답!";
  if (bool) correctAnswer++;

  resultCase.append(
    createElement("result fwb", result),
    createElement("printPassage fwb", jsonAnswer)
  );
  if (count == maxNumber) {
    nextBtn.classList.toggle("dn");
    testScoreBtn.classList.toggle("dn");
  }
}

let nextBtnClickCount = 0;

function next() {
  nextBtnClickCount++;
  switch (nextBtnClickCount) {
    case 1:
      count++;
      checkAnswer(answer.value.replace(/ /g, "").toLowerCase());
      break;
    case 2:
      printTest();
      answer.classList.toggle("dn");
      resultCase.replaceChildren();
      nextBtnClickCount = 0;
      answer.value = null;
      // console.log(`현재 풀이한 문제의 수 : ${count}`);
      // console.log(`현재 정답을 맞힌 문제의 수${correctAnswer}`);
      // console.log(`풀기로한 문제의 수 : ${maxNumber}`);
      break;
    default:
      alert("오류가 발생하였습니다, 새로고침 후 재시도하세요.");
      break;
  }
}
nextBtn.addEventListener("click", () => {
  next();
});
window.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    next();
  } else if (e.code === "Space") {
    next();
  }
});
