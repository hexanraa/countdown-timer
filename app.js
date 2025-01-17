const realDateEl = document.getElementById("rdate");
const realTimeEl = document.getElementById("rtime");

setInterval(() => {
  const currentDate = new Date();
  realDateEl.textContent = `${currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}`;
  realTimeEl.textContent = `${currentDate.toLocaleTimeString("en-GB")}`;
}, 250);

const countToDate = new Date("April 19, 2025 07:00:00");
let previousTimeBetweenDates;

setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);

  if (timeBetweenDates < 0) {
    flipAllCards(0);
  } else {
    flipAllCards(timeBetweenDates);
  }

  previousTimeBetweenDates = timeBetweenDates;
}, 250);

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600) % 24;
  const days = Math.floor(time / 86400);

  flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10));
  flip(document.querySelector("[data-days-ones]"), days % 10);
  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]"), hours % 10);
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return;

  const bottomHalf = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  topHalf.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", () => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", () => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });
  flipCard.append(topFlip, bottomFlip);
}
