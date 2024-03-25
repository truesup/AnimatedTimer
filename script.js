const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");
const inputtedTime = document.getElementById("timeInput");
const startButton = document.getElementById("startButton");

timer.innerHTML = `
  <div>00</div>
  <div class="colon">:</div>
  <div>00</div>
`;

let setTime = 0;
let futureTime = 0;
let timerLoop = null;

startButton.addEventListener("click", startTimer);

function startTimer() {
  if (timerLoop) {
    return;
  }

  const min = parseInt(inputtedTime.value);
  const sec = 0;

  if (isNaN(min) || min <= 0) {
    alert("Please enter a valid positive number for minutes");
    return;
  }

  const minutes = min * 60000;
  const seconds = sec * 1000;
  setTime = minutes + seconds;
  const startTime = Date.now();
  futureTime = startTime + setTime;

  timerLoop = setInterval(countDownTimer, 1000);

  startButton.disabled = true;
  inputtedTime.disabled = true;
}

function countDownTimer() {
  const currentTime = Date.now();
  const remainingTime = futureTime - currentTime;
  const angle = (remainingTime / setTime) * 360;

  if (angle > 180) {
    semicircles[2].style.display = "none";
    semicircles[0].style.transform = "rotate(180deg)";
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircles[2].style.display = "block";
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  }

  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGroup: false,
    }
  );
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGroup: false,
  });

  timer.innerHTML = `
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
  `;

  if (remainingTime <= 6000) {
    semicircles[0].style.background = "red";
    semicircles[1].style.background = "red";
    timer.style.color = "red";
  }

  if (remainingTime < 0) {
    clearInterval(timerLoop);
    semicircles.forEach((semicircle) => (semicircle.style.display = "none"));

    timer.innerHTML = `
      <div>00</div>
      <div class="colon">:</div>
      <div>00</div>
    `;
    timer.style.color = "lightgrey";

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
