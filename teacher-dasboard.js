document.addEventListener('DOMContentLoaded', () => {
    const dashboardLink = document.getElementById('dashboardLink');
    const attendanceLink = document.getElementById('attendanceLink');
    const studentsLink = document.getElementById('studentsLink');
    const classesLink = document.getElementById('classesLink');
    const reportsLink = document.getElementById('reportsLink');
    const announcementsLink = document.getElementById('announcementsLink');
    const settingsLink = document.getElementById('settingsLink');
    const logoutLink = document.getElementById('logoutLink');

    const dashboardSection = document.getElementById('dashboardSection');
    const manualAttendanceSection = document.getElementById('manualAttendanceSection');
    const studentsSection = document.getElementById('studentsSection');
    const classesSection = document.getElementById('classesSection');
    const reportsSection = document.getElementById('reportsSection');
    const announcementsSection = document.getElementById('announcementsSection');
    const settingsSection = document.getElementById('settingsSection');

    const sections = document.querySelectorAll('.main-content .content-section, .main-content .dashboard-section');
    const navLinks = document.querySelectorAll('.sidebar ul li a');

    const cameraInput = document.getElementById('cameraInput');
    const previewImage = document.getElementById('preview');

    const subjectModal = document.getElementById('subjectModal');
    const continueSubjectBtn = document.getElementById('continueSubjectBtn');

    function hideAllSections() {
        sections.forEach(section => section.classList.add('hidden'));
    }

    function deactivateAllNavLinks() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    function showSection(sectionElement, linkElement) {
        hideAllSections();
        deactivateAllNavLinks();
        sectionElement.classList.remove('hidden');
        linkElement.classList.add('active');
    }

    // Initial load: show dashboard
    showSection(dashboardSection, dashboardLink);

    dashboardLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(dashboardSection, dashboardLink);
    });

    attendanceLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you might want to show a sub-menu or directly manual attendance
        // For simplicity, let's show manual attendance for now
        showSection(manualAttendanceSection, attendanceLink);
    });

    studentsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(studentsSection, studentsLink);
    });

    classesLink.addEventListener('click', (e) => {
        e.preventDefault();
        subjectModal.classList.remove('hidden'); // Show subject modal
        // After selecting subject, you would then navigate to classesSection
    });

    reportsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(reportsSection, reportsLink);
    });

    announcementsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(announcementsSection, announcementsLink);
    });

    settingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(settingsSection, settingsLink);
    });

    // Logout link will just navigate to home2.html, no JS needed here.

    // Camera Input Handling
    cameraInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block'; // Show the image
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = '';
            previewImage.style.display = 'none'; // Hide if no file selected
        }
    });

    // Modal Interaction
    continueSubjectBtn.addEventListener('click', () => {
        const selectedSubject = document.getElementById('subjectSelect').value;
        if (selectedSubject !== '-- Choose Subject --') {
            subjectModal.classList.add('hidden');
            // You can now use `selectedSubject` to load class data, etc.
            console.log("Selected Subject:", selectedSubject);
            showSection(classesSection, classesLink); // Assuming you want to go to classes after selecting subject
        } else {
            alert('Please select a subject to continue.');
        }
    });

// (Removed duplicate updateDateTime function and extra closing bracket)

    // Update Date & Time
    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('attendanceTime').textContent = `📅 Date & Time: ${now.toLocaleDateString('en-IN', options)}`;
    }
    setInterval(updateDateTime, 1000); // Update every second
    updateDateTime(); // Call immediately to set initial time
});