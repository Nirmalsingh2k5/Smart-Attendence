document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENT SELECTIONS (All elements in one place) ---
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    const contentSections = document.querySelectorAll('.main-content > section');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const summaryText = document.getElementById('ai-summary-text');
    const cameraInput = document.getElementById('cameraInput');
    const previewImage = document.getElementById('preview');
    const subjectModal = document.getElementById('subjectModal');
    const continueSubjectBtn = document.getElementById('continueSubjectBtn');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const announcementForm = document.getElementById("announcementForm");
    const announcementList = document.querySelector(".announcement-list");
    const timeElement = document.getElementById('attendanceTime');

    // === LOGOUT ELEMENTS ADDED BELOW ===
    const logoutLink = document.getElementById('logoutLink');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    const logoutModalCloseBtn = logoutModal ? logoutModal.querySelector('.modal-close-btn') : null;

    // --- 2. NAVIGATION LOGIC ---
    function showSection(targetId) {
        contentSections.forEach(section => section.classList.add('hidden'));
        sidebarLinks.forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        const activeLink = document.querySelector(`.sidebar a[id="${targetId.replace('Section', 'Link')}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        } else if (targetId === 'manualAttendanceSection') {
            document.getElementById('attendanceLink').classList.add('active');
        }
    }

    sidebarLinks.forEach(link => {
        if (link.id && link.id !== 'logoutLink') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                let targetSectionId = link.id.replace('Link', 'Section');

                if (link.id === 'attendanceLink') {
                    targetSectionId = 'manualAttendanceSection';
                } else if (link.id === 'classesLink') {
                    if (subjectModal) subjectModal.classList.remove('hidden');
                    return;
                }
                showSection(targetSectionId);
            });
        }
    });

    // --- 3. MODAL LOGIC ---
    if (continueSubjectBtn) {
        continueSubjectBtn.addEventListener('click', () => {
            const selectedSubject = document.getElementById('subjectSelect').value; // Corrected ID from your file
            if (selectedSubject && selectedSubject !== '-- Choose Subject --') {
                subjectModal.classList.add('hidden');
                console.log("Selected Subject:", selectedSubject);
                showSection('classesSection');
            } else {
                alert('Please select a subject to continue.');
            }
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            if (subjectModal) subjectModal.classList.add('hidden');
        });
    }

    if (subjectModal) {
        subjectModal.addEventListener('click', (event) => {
            if (event.target === subjectModal) {
                subjectModal.classList.add('hidden');
            }
        });
    }

    // --- 4. ANNOUNCEMENT PAGE LOGIC ---
    if (announcementForm) {
        announcementForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const message = document.getElementById("message").value;
            const newCard = document.createElement("article");
            newCard.className = "announcement-item-card";
            const postDate = new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY

            newCard.innerHTML = `
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="meta">
                    <p class="small">Posted on: ${postDate}</p>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            announcementList.prepend(newCard);
            announcementForm.reset();
        });
    }

    if (announcementList) {
        announcementList.addEventListener('click', function (e) {
            if (e.target.classList.contains('delete-btn')) {
                e.target.closest('.announcement-item-card').remove();
            }
        });
    }

    // --- 5. CAMERA PREVIEW LOGIC ---
    if (cameraInput) {
        cameraInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (previewImage) {
                        previewImage.src = e.target.result;
                        previewImage.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 6. AI SUMMARY LOGIC ---
    if (summarizeBtn) {
        summarizeBtn.addEventListener('click', () => {
            const total = document.querySelector('.total-students-num')?.textContent || "0";
            const present = document.querySelector('.present-num')?.textContent || "0";
            const absent = document.querySelector('.absent-num')?.textContent || "0";
            // summaryText is already defined at the top

            if (!total || parseInt(total) === 0) {
                if (summaryText) summaryText.innerHTML = "No student data available to summarize.";
                return;
            }

            const percent = Math.round((parseInt(present) / parseInt(total)) * 100);
            let templates = [];

            // Check for 100% attendance first
            if (percent === 100) {
                templates = [
                    `🏆 **Perfect Attendance!** 100% of the class is present. Incredible!`,
                    `💯 **Full House!** Every single student is here today. Let's make it a great class!`,
                    `🎉 **Unstoppable!** We have 100% attendance. Amazing energy in the room!`
                ];
            } 
            // Excellent Attendance
            else if (percent >= 90) {
                templates = [
                    `🔥 **Fantastic!** Today’s attendance is <b>${percent}%</b> with only ${absent} absent. Great job, everyone!`,
                    `👏 **Superb turnout!** With <b>${percent}%</b> present, the class is buzzing with energy.`,
                    `✅ **Excellent work!** Only ${absent} student(s) missed out. We're almost at 100%!`
                ];
            } 
            // Good Attendance
            else if (percent >= 75) {
                templates = [
                    `👍 **Good attendance** today at <b>${percent}%</b>. Let's encourage the ${absent} absent students to join next time.`,
                    `⚡ **Solid numbers!** Attendance is <b>${percent}%</b>. Let's aim for an even better turnout tomorrow!`,
                    `📈 **Looking good!** With <b>${present} out of ${total}** students here, we're on the right track.`
                ];
            } 
            // Low Attendance
            else if (percent >= 50) {
                templates = [
                    `⚠️ **Attention needed.** Only <b>${percent}%</b> of students are present today.`,
                    `📉 **Low attendance alert:** <b>${absent} out of ${total}** students are absent. Let's check in with them.`,
                    `🤔 **Hmm...** Attendance is at <b>${percent}%</b>. A significant number of students are missing.`
                ];
            } 
            // Critically Low Attendance
            else {
                templates = [
                    `🚨 **Critically Low Attendance!** Only <b>${percent}%</b> of the class is here. It's important to follow up with the <b>${absent}</b> absent students.`,
                    `🔴 **Major concern.** With just <b>${present} out of ${total}** students present, learning could be impacted.`,
                    `📉 **Urgent:** Attendance has dropped to <b>${percent}%</b>. Let's investigate the reasons for the high number of absentees.`
                ];
            }

            if (summaryText) {
                summaryText.innerHTML = templates[Math.floor(Math.random() * templates.length)];
            }
        });
    }

    // --- 7. DATE & TIME UPDATE ---
    if (timeElement) {
        function updateDateTime() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            timeElement.textContent = `📅 ${now.toLocaleDateString('en-IN', options)}`;
        }
        setInterval(updateDateTime, 1000);
        updateDateTime();
    }

    // === LOGOUT LOGIC ADDED START ===
    // --- 8. LOGOUT LOGIC ---
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault(); // Stop the link from doing anything
            if (logoutModal) logoutModal.classList.remove('hidden'); // Show the modal
        });
    }
    const hideLogoutModal = () => {
        if (logoutModal) logoutModal.classList.add('hidden');
    };
    if (cancelLogoutBtn) {
        cancelLogoutBtn.addEventListener('click', hideLogoutModal);
    }
    if (logoutModalCloseBtn) {
        logoutModalCloseBtn.addEventListener('click', hideLogoutModal);
    }
    if (logoutModal) {
        logoutModal.addEventListener('click', (event) => {
            if (event.target === logoutModal) {
                hideLogoutModal();
            }
        });
    }
    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', () => {
            // Redirect to your home page
            window.location.href = 'index.html';
        });
    }
    // === LOGOUT LOGIC ADDED END ===

    // --- 8. INITIAL PAGE LOAD ---
    showSection('dashboardSection');

});