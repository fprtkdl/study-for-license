/** @type {JSON} json 데이터 */
let quectionList;
/** @type {number} json 길이 */
let quectionListLength = 0;
/** @type {number} json 데이터 추출용 난수 */
let randomIndex = 0;

/** @type {String} 문제 지문 */
let correctPassage;
/** @type {String} 문제 정답 */
let correctAnswer;

/** @type {number} 풀이한 문제의 수 */
let countSolveQuestion = 0;
/** @type {number} 정답을 맞춘 문제의 수 */
let countCorrectAnswer = 0;

/** @type {boolean} 화면 이동 여부 */
let isNext = true;

/** @type {number} 풀이할 문제 비율 */
let ratioToSolve = Number(location.href.split("?")[1]);
/** @type {number} 풀이할 문제 수 */
let numberOfSolveQuestion = 0;

const answer = document.querySelector(".answer");
const nextButton = document.querySelector(".next-btn");
const passageBox = document.querySelector(".passage-box");
const resultCase = document.querySelector(".result-case");
const testScoreButton = document.querySelector(".test-score-btn");
const imgCase = document.querySelector(".img-case");

/**실행 흐름 시작: window.onload */
/** json 불러오기 및 첫 문제 출력 */
window.addEventListener("load", () => {
  fetch("../json/fullPower.json")
    .then((response) => response.json())
    .then((json) => {
      quectionList = json.QL;
      numberOfSolveQuestion = quectionListLength =
        Object.keys(quectionList).length;

      console.log(numberOfSolveQuestion);
      numberOfSolveQuestion = Math.floor(numberOfSolveQuestion * ratioToSolve);
      console.log(ratioToSolve);
      console.log(numberOfSolveQuestion);

      if (numberOfSolveQuestion === 0) {
        numberOfSolveQuestion = quectionListLength;
      }

      printTest();
    });
});

/**버튼 이벤트 핸들러 */
/** 왼쪽 상단의 아이콘 이미지 클릭 시 홈으로 이동 */
imgCase.addEventListener("click", () => {
  location.replace("../index.html");
});

/** 다음으로 이동 */
nextButton.addEventListener("click", () => {
  nextButton.classList.toggle("ma");
  nextButtonClickEvent();
});

/** 모든 문제를 풀면 나오는 버튼, 클릭 시 종합 점수 화면으로 이동 */
testScoreButton.addEventListener("click", (e) => {
  e.preventDefault();

  const resultSet = {
    countCorrectAnswer: countCorrectAnswer,
    numberOfSolveQuestion: numberOfSolveQuestion,
  };

  localStorage.setItem("resultSet", JSON.stringify(resultSet));
  location.replace("/page/result.html");
});

/** 문제 진행 흐름 관련 함수들 */
/** 새로운 문제 또는 문제 채점 화면으로 이동 */
function nextButtonClickEvent() {
  isNext = !isNext;

  if (!isNext) {
    printResult();
    console.log("성공");
  } else if (isNext) {
    console.log("실패");
    printTest();
    answer.value = "";
    answer.classList.remove("dn");
    resultCase.replaceChildren();

    console.log(`현재 풀이한 문제의 수 : ${countSolveQuestion}`);
    console.log(`현재 정답을 맞힌 문제의 수 : ${countCorrectAnswer}`);
    console.log(`풀기로한 문제의 수 : ${numberOfSolveQuestion}`);
  }
}

/** 문제 생성 및 화면에 출력 */
function printTest() {
  passageBox.replaceChildren();
  randomIndex = Math.floor(Math.random() * quectionListLength);

  correctPassage = quectionList[randomIndex].passage;
  correctAnswer = quectionList[randomIndex].answer;

  passageBox.append(
    createElement("number fwb", `no.${randomIndex + 1}`),
    createElement("passage", correctPassage)
  );

  answer.focus();
}

/** 문제 채점 후 화면에 풀력 */
function printResult() {
  countSolveQuestion++;
  answer.classList.toggle("dn");

  const isCorrect = removeSpaces(answer.value) === removeSpaces(correctAnswer);

  if (isCorrect) countCorrectAnswer++;

  resultCase.classList.remove("correctPassage", "result");
  resultCase.replaceChildren();

  resultCase.append(
    createElement("result fwb", isCorrect ? "정답!" : "오답!"),
    createElement("correctPassage fwb", correctAnswer)
  );

  if (countSolveQuestion === numberOfSolveQuestion) {
    nextButton.classList.add("dn");
    testScoreButton.classList.remove("dn");
  }
}

/**보조 함수들 */
/**
 * elements 생성
 * @param {string} className 클래스 이름
 * @param {string} innerText 삽입될 텍스트
 * @returns {Element} className라는 이름에 innerText라는 내용을 가진 span
 */
function createElement(className, innerText) {
  const result = document.createElement("span");
  result.setAttribute("class", className);
  result.innerText = innerText;
  return result;
}

/**
 * 공백 제거
 * @param {string} targetText 공백을 제거할 텍스트
 * @returns {string} 공백이 제거된 텍스트
 */
function removeSpaces(targetText) {
  return targetText.replace(/ /g, "").toLowerCase();
}
