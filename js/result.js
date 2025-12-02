const resultSet = JSON.parse(localStorage.getItem("resultSet"));
localStorage.clear();

document.querySelector(".img-case").addEventListener("click", () => {
  location.replace("../index.html");
});

document.querySelector(".button").addEventListener("click", () => {
  location.replace("../index.html");
});

function createElement(className, innerText) {
  const result = document.createElement("span");
  result.setAttribute("class", className);
  result.innerHTML = innerText;
  return result;
}
const correctAnswerCase = document.querySelector(".correct-count-case");
const correctRateCase = document.querySelector(".correct-rate-case");

const correctAnswer = resultSet["correctAnswer"];
const maxNumber = resultSet["maxNumber"];
const correctRateNumber = (correctAnswer / maxNumber) * 100;

correctAnswerCase.append(
  createElement(
    "how-correct-answer",
    `<b>${correctAnswer}개</b>의 정답을 맞췄군`
  )
);

if (correctAnswer >= maxNumber * 0.6) {
  correctRateCase.prepend(
    createElement("print-result dfcc", `${correctAnswer}/${maxNumber}`),
    createElement(
      "how-correct-rate",
      `정답률 <b>${correctRateNumber}%</b> 해병...기합!!!`
    )
  );
} else {
  correctRateCase.prepend(
    createElement("print-result dfcc", `${correctAnswer}/${maxNumber}`),
    createElement(
      "how-correct-rate",
      `정답률 <b>${correctRateNumber}%</b> 아쎄이...기열!!!`
    )
  );
}
