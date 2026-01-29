const plusBtn = document.querySelector(".plus-btn");
const emojiBox = document.querySelector(".emoji-box");
const input = document.getElementById("messageInput");

// Toggle emoji picker
plusBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  emojiBox.classList.toggle("show");
});

// Insert emoji
emojiBox.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    input.value += e.target.textContent;
  }
});

// Close when clicking outside
document.addEventListener("click", () => {
  emojiBox.classList.remove("show");
});
