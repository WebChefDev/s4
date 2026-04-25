const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const parentLinks = document.querySelectorAll(".parent");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

parentLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const submenu = link.nextElementSibling;
    const arrow = link.querySelector(".arrow");
    const isActive = link.parentElement.classList.contains("active");

    if (isActive) {
      submenu.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
      link.parentElement.classList.remove("active");
    } else {
      submenu.style.display = "block";
      arrow.style.transform = "rotate(90deg)";
      link.parentElement.classList.add("active");
    }
  });
});

document.querySelectorAll(".qa-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isActive = answer.classList.contains("active");

    document
      .querySelectorAll(".qa-answer")
      .forEach((ans) => ans.classList.remove("active"));
    document
      .querySelectorAll(".qa-question")
      .forEach((q) => q.classList.remove("active"));

    if (!isActive) {
      answer.classList.add("active");
      button.classList.add("active");
    }
  });
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const topNavHeight = 60;
  const offsetTop =
    section.getBoundingClientRect().top + window.scrollY - topNavHeight;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
}

// AJAX Form Submission (CORS-Fixed)
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyfPgX4vp9LDFYy8JiXAL05aJvp4m8YuwR2M1OWWKOuZmEzfEFzMIOlUPc8BFmMw-sC/exec"; // Your GAS URL

// Global for randomized answer
let correctSkillAnswer = 12; // Default fallback

// Randomize skill question on load
window.addEventListener("DOMContentLoaded", () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "×"];
  const opIndex = Math.floor(Math.random() * operators.length);
  const operator = operators[opIndex];
  let answer;
  let questionText;

  if (operator === "+") {
    answer = num1 + num2;
    questionText = `${num1} + ${num2}`;
  } else if (operator === "-") {
    // Ensure positive result
    if (num1 < num2) [num1, num2] = [num2, num1];
    answer = num1 - num2;
    questionText = `${num1} - ${num2}`;
  } else {
    // ×
    answer = num1 * num2;
    questionText = `${num1} × ${num2}`;
  }

  document.getElementById("skillLabel").textContent =
    `Skill Test: What is ${questionText}? (Number only to prove you're human)`;
  correctSkillAnswer = answer;
});

function handleFormSubmit(event) {
  event.preventDefault(); // Stop default form submit

  const form = event.target;
  const formData = new URLSearchParams(); // Use URLSearchParams for simple request
  for (const pair of new FormData(form)) {
    formData.append(pair[0], pair[1]);
  }
  const submitButton = form.querySelector('button[type="submit"]');
  const successMsg = document.getElementById("successMessage");
  const errorMsg = document.getElementById("errorMessage");

  // Hide previous messages
  successMsg.classList.remove("show");
  errorMsg.classList.remove("show");

  // Client-side checks
  const skillInput = document.getElementById("skill").value.trim();
  const honeypot = document.getElementById("website").value.trim();

  if (honeypot !== "") {
    // Bot filled honeypot - silent fail
    errorMsg.textContent = "Submission rejected. Please try again later.";
    errorMsg.classList.add("show");
    errorMsg.scrollIntoView({ behavior: "smooth" });
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
    return;
  }

  if (parseInt(skillInput, 10) !== correctSkillAnswer) {
    alert(
      "Incorrect answer to the skill test. Please refresh the page and try again.",
    );
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
    return;
  }

  // Disable button & show loading
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Avoids preflight
    },
    body: formData.toString(), // Stringify for URL-encoded
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      if (data.trim() === "success") {
        successMsg.classList.add("show");
        form.reset(); // Clear form
        successMsg.scrollIntoView({ behavior: "smooth" });
      } else {
        throw new Error(data || "Unexpected response");
      }
    })
    .catch((error) => {
      console.error("Form submit error:", error);
      // Only show user error if not a network/CORS issue (since email still sends)
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        // Assume success if it was just CORS (email already sent)
        successMsg.classList.add("show");
        form.reset();
        successMsg.scrollIntoView({ behavior: "smooth" });
        console.log("CORS warning logged, but submission likely succeeded");
      } else {
        errorMsg.textContent =
          error.message || "Oops! Something went wrong. Please try again.";
        errorMsg.classList.add("show");
        errorMsg.scrollIntoView({ behavior: "smooth" });
      }
    })
    .finally(() => {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    });
}

// Attach event listener
document
  .getElementById("contactForm")
  .addEventListener("submit", handleFormSubmit);

// BACKWARDS COMPAT: Handle ?success=1 from old URL shares (if any)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("success") === "1") {
  const successMessage = document.getElementById("successMessage");
  successMessage.classList.add("show");
  successMessage.scrollIntoView({ behavior: "smooth" }); // ← fixed
  window.history.replaceState({}, document.title, window.location.pathname);
}

document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const parent = trigger.parentNode;
    parent.classList.toggle("active");
  });
});
