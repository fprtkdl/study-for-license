const buttons = document.querySelectorAll(".button");
document.querySelector(".img-case").addEventListener("click", () => {
  location.replace("../index.html");
});

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = `./page/test.html?${btn.id}`;
  });
});
