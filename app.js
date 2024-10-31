const form = document.querySelector("form");
const repOut = document.querySelector(".repout");
const overTime = document.querySelector(".overTime");
const textPlaceholder = document.querySelector(".placeholder");
const resultT = document.querySelector(".results");
window.addEventListener("DOMContentLoaded", () => {
  textPlaceholder.classList.remove("hidden");
  resultT.classList.add("hidden");
});

let total = 0;
let totalRepayment = 0;

// Main functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let amount = parseInt(document.querySelector(".amount").value);
  let term = parseInt(document.querySelector(".term").value);
  let interest = parseFloat(document.querySelector(".interest").value);
  const Opt = document.querySelector(
    'input[name="mortgageType"]:checked'
  ).value;
  const termCal = term * 12;
  const calInterest = interest / 100 / 12;

  if (Opt === "repayment") {
    total =
      (amount * (calInterest * Math.pow(1 + calInterest, termCal))) /
      (Math.pow(1 + calInterest, termCal) - 1);
    totalRepayment = termCal * total;
    overTime.textContent = `$${totalRepayment.toFixed(2)}`;
    repOut.textContent = `$${total.toFixed(2)}`;
  } else if (Opt === "InterestOnly") {
    total = amount * calInterest;
    repOut.textContent = `$${total.toFixed(2)}`;
    totalRepayment = interest * total;
    overTime.textContent = `$${totalRepayment.toFixed(2)}`;
  }
  textPlaceholder.classList.add("hidden");
  resultT.classList.remove("hidden");
});

/// clear results

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  document.querySelector(".amount").value = "";
  document.querySelector(".term").value = "";
  document.querySelector(".interest").value = "";

  const mortgageTypes = document.querySelectorAll('input[name="mortgageType"]');
  mortgageTypes.forEach((radio) => (radio.checked = false));
  repOut.textContent = "$0.00";
  overTime.textContent = "$0.00";
  textPlaceholder.classList.remove("hidden");
  resultT.classList.add("hidden");
  total = 0;
  totalRepayment = 0;
});
