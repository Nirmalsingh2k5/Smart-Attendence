document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------
  // 1. DYNAMIC TIME & DATE
  // --------------------------------------------------------------------
  const attendanceTimeEl = document.getElementById('attendanceTime');

  function updateDateTime() {
    const now = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

    const dateStr = now.toLocaleDateString('en-US', dateOptions);
    const timeStr = now.toLocaleTimeString('en-US', timeOptions);

    attendanceTimeEl.textContent = `📅 ${dateStr} | 🕒 ${timeStr}`;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000); // Update every second


  // --------------------------------------------------------------------
  // 2. NAVIGATION & SECTION MANAGEMENT
  // --------------------------------------------------------------------
  const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
  const sections = document.querySelectorAll('.main-content section');
  const sidebar = document.querySelector('.sidebar');

  // Show initial section (Dashboard)
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById('dashboardSection').classList.remove('hidden');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.id;

      // Handle special links
      if (targetId === 'logoutLink') {
        showModal('logoutModal');
        return;
      }

      // Determine the target section ID (e.g., dashboardLink -> dashboardSection)
      const sectionId = targetId.replace('Link', 'Section');

      // Handle Attendance link via Subject Modal
      if (targetId === 'attendanceLink') {
        showModal('subjectModal');

        // Set the action for the modal's continue button
        document.getElementById('continueSubjectBtn').onclick = () => {
          if (document.getElementById('subjectSelect').value !== '-- Choose Subject --') {
            hideModal('subjectModal');
            switchSection('manualAttendanceSection', link);
          } else {
            alert("Please select a subject to mark attendance.");
          }
        };
        return;
      }

      switchSection(sectionId, link);
    });
  });

  function switchSection(targetSectionId, clickedLink) {
    // Hide all sections
    sections.forEach(section => section.classList.add('hidden'));

    // Show the target section
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }

    // Update active class on links
    sidebarLinks.forEach(l => l.classList.remove('active'));
    if (clickedLink) {
      clickedLink.classList.add('active');
    }

    // Close mobile menu after navigation
    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('active');
    }
  }


  // --------------------------------------------------------------------
  // 3. MODAL HANDLERS
  // --------------------------------------------------------------------
  function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('hidden');
      setTimeout(() => modal.classList.add('visible'), 10);
    }
  }

  function hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('visible');
      setTimeout(() => modal.classList.add('hidden'), 300);
    }
  }

  // Attach event listeners to close buttons and overlay clicks
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      hideModal(e.target.closest('.modal-overlay').id);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      // Close only if clicking the overlay itself, not the content
      if (e.target === overlay) {
        hideModal(overlay.id);
      }
    });
  });

  // Logout Modal Logic
  document.getElementById('cancelLogoutBtn').addEventListener('click', () => hideModal('logoutModal'));

  document.getElementById('confirmLogoutBtn').addEventListener('click', () => {
    // In a real app, this would make an AJAX call to log out
    alert('You have successfully logged out.');
    window.location.href = "index.html";
  });


  // --------------------------------------------------------------------
  // 4. CAMERA/IMAGE PREVIEW LOGIC
  // --------------------------------------------------------------------
  const cameraInput = document.getElementById('cameraInput');
  const preview = document.getElementById('preview');

  cameraInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);
      alert('Image loaded successfully! Click "Summarize Attendance" to process.');
    }
  });

  // --------------------------------------------------------------------
  // 5. AI SUMMARY SIMULATION
  // --------------------------------------------------------------------
  const summarizeBtn = document.getElementById('summarizeBtn');
  const aiSummaryText = document.getElementById('ai-summary-text');
  const totalStudentsNum = document.querySelector('.total-students-num').textContent;
  const presentNum = document.querySelector('.present-num');
  const absentNum = document.querySelector('.absent-num');

  summarizeBtn.addEventListener('click', () => {
    aiSummaryText.textContent = '🧠 AI is analyzing the class photo. Please wait...';
    summarizeBtn.disabled = true;

    setTimeout(() => {
      // Simulate results based on current numbers
      const present = 36;
      const absent = 14;
      const total = parseInt(totalStudentsNum);
      const attendanceRate = ((present / total) * 100).toFixed(1);

      // Update dashboard stats (optional, but shows interaction)
      presentNum.textContent = present;
      absentNum.textContent = absent;

      aiSummaryText.innerHTML = `
                <p><strong>Attendance successfully processed!</strong></p>
                <p>Total Students: ${total}</p>
                <p>Present: <span style="color:var(--clr-secondary); font-weight: bold;">${present}</span></p>
                <p>Absent: <span style="color:var(--clr-danger); font-weight: bold;">${absent}</span> (Roll Nos: 02, 05, 09, 11, 23, 40...)</p>
                <p>Overall Rate: ${attendanceRate}%.</p>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">*System identified low participation in the back row. Consider changing seating arrangement.</p>
            `;
      summarizeBtn.disabled = false;
    }, 2000); // Simulate network delay
  });

  // --------------------------------------------------------------------
  // 6. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------
  const header = document.querySelector('.main-header');

  header.addEventListener('click', (e) => {
    // Check if the click was near the hamburger (right side of header)
    const isHamburgerClick = window.innerWidth <= 1024 && e.clientX > header.offsetWidth - 70;

    if (isHamburgerClick) {
      sidebar.classList.toggle('active');
    }
  });
});
