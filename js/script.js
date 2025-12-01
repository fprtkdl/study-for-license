let jsonPassage, jsonAnswer;
let count = 0;
const answer = document.querySelector(".answer");
const nextBtn = document.querySelector(".next-btn");
// const maxNumber = Number(location.href.split("?")[1]);
const maxNumber = 3;
const passageBox = document.querySelector(".passage-box");
const resultCase = document.querySelector(".result-case");
const testScoreBtn = document.querySelector(".test-score-btn");

document.querySelector(".img-case").addEventListener("click", () => {
  location.replace("../index.html");
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
  count++;
  passageBox.replaceChildren();
  fetch("../json/question.json")
    .then((response) => response.json())
    .then((json) => {
      const data = json.QL;
      const index = generateRandomNumber();
      // const index = ;
      jsonPassage = data[index].passage;
      jsonAnswer = data[index].answer;

      passageBox.append(
        createElement("number", `no.${index + 1}`),
        createElement("passage", jsonPassage)
      );
    });
}

printTest();

function printAnswer(text) {
  resultCase.classList.remove("printPassage", "result");

  resultCase.append(createElement("result", text));
  resultCase.append(createElement("printPassage", jsonAnswer));
}

function checkAnswer(text) {
  answer.classList.toggle("dn");
  printAnswer(text === jsonAnswer ? "정답!" : "오답!");
  if (count == maxNumber) {
    nextBtn.classList.toggle("dn");
    testScoreBtn.classList.toggle("dn");
  }
}

let nextBtnClickCount = 0;

nextBtn.addEventListener("click", () => {
  nextBtnClickCount++;
  switch (nextBtnClickCount) {
    case 1:
      checkAnswer(answer.value);
      break;
    case 2:
      printTest();
      answer.classList.toggle("dn");
      resultCase.replaceChildren();
      nextBtnClickCount = 0;
      console.log(count);
      console.log(maxNumber);

      break;
    default:
      alert("오류가 발생하였습니다, 새로고침 후 재시도하세요.");
      break;
  }
});
