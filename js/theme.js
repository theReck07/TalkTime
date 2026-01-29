function toggleTheme() {
  document.body.classList.toggle("dark");

  const toggle = document.querySelector(".theme-toggle");
  toggle.textContent = document.body.classList.contains("dark") ? "⚪" : "⚫️";
}
