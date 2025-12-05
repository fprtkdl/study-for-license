const resultSet = JSON.parse(localStorage.getItem("resultSet"));
localStorage.clear();

document.querySelector(".img-case").addEventListener("click", () => {
  location.replace("../index.html");
});
document.querySelector(".go-home-button").addEventListener("click", () => {
  location.replace("../index.html");
});

const printSpan = document.querySelector(".print-span");
const correctAnswerCase = document.querySelector(".correct-count-case");
const correctRateCase = document.querySelector(".correct-rate-case");

const correctAnswer = resultSet["correctAnswer"];
const maxNumber = resultSet["maxNumber"];
const correctRateNumber = (correctAnswer / maxNumber) * 100;
const checkState = correctAnswer >= maxNumber * 0.6 ? "기합" : "기열";

function createElement(className, innerText) {
  const result = document.createElement("span");
  result.setAttribute("class", className);
  result.innerHTML = innerText;
  return result;
}

const stateTextArray = {
  기합: {
    stateText: ["기", "합"],
    text: "아주 짜세로운 기합해병지능을 가진 아쎄이로군, 앞으로도 정진하도록!!!",
  },
  기열: {
    stateText: ["기", "열"],
    text: "이런 기열찐빠해병지능이라니... 오도짜세 아쎄이는 당장 재입대를 할 수 있도록!!!",
  },
};

function createStateText(state) {
  const info = stateTextArray[state];
  printSpan.prepend(
    createElement("print-span-child-1", info.stateText[0]),
    createElement("print-span-child-2", info.stateText[1])
  );

  correctRateCase.prepend(
    createElement("print-result dfcc", `${correctAnswer}/${maxNumber}`),
    createElement("how-correct-rate", info.text)
  );
}

function createCheckState(state) {
  createStateText(state);
  correctAnswerCase.replaceChildren(
    createElement(
      "how-correct-answer",
      `총 ${maxNumber} 문제 중 <b>${correctAnswer}개</b>의 정답을 맞춰 ${correctRateNumber}%의 정답률을 기록하였군..`
    )
  );
}

createCheckState(checkState);
