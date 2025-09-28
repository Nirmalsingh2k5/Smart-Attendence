// Get sidebar links & all sections
const links = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll("main > section");

// Function to show selected section
function showSection(sectionId) {
  sections.forEach(sec => sec.classList.add("hidden")); // hide all
  document.getElementById(sectionId).classList.remove("hidden"); // show selected

  // Update active link highlight
  links.forEach(link => link.classList.remove("active"));
  const activeLink = document.querySelector(`[href="#"][id$="${sectionId.replace("Section","")}Link"]`);
  if (activeLink) activeLink.classList.add("active");
}

// Sidebar navigation
document.getElementById("dashboardLink").addEventListener("click", e => {
  e.preventDefault();
  showSection("dashboardSection");
});

document.getElementById("attendanceLink").addEventListener("click", e => {
  e.preventDefault();
  showSection("manualAttendanceSection");
});

document.getElementById("studentsLink").addEventListener("click", e => {
  e.preventDefault();
  showSection("studentsSection");
});

document.getElementById("classesLink").addEventListener("click", e => {
  e.preventDefault();
  showSection("classesSection");
});

document.getElementById("reportsLink").addEventListener("click", e => {
  e.preventDefault();
  showSection("reportsSection");
});

document.getElementById("announcementsLink").addEventListener("click", e => {
  e.preventDefault();
  showSection("announcementsSection");
});

document.getElementById("settingsLink").addEventListener("click", e => {
  e.preventDefault();
  showSection("settingsSection");
});

// Default: show Dashboard
showSection("dashboardSection");

// --- Modal handling (Logout / Subject) ---
const modals = document.querySelectorAll(".modal-overlay");
const closeBtns = document.querySelectorAll(".modal-close-btn");

closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal-overlay").classList.add("hidden");
  });
});

// Example logout modal trigger
document.getElementById("logoutLink").addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("logoutModal").classList.remove("hidden");
});

// Cancel logout
document.getElementById("cancelLogoutBtn").addEventListener("click", () => {
  document.getElementById("logoutModal").classList.add("hidden");
});
