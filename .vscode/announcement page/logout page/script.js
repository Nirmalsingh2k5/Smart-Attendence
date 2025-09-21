document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('.logout-button');
  const cancelButton = document.querySelector('.cancel-button');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Simulate a logout process. In a real application, you would
      // send a request to a server to destroy the session.
      console.log('User is logging out...');
      alert('You have been logged out!'); // A simple alert for demonstration

      // Redirect the user to the login page after a short delay
      setTimeout(() => {
        window.location.href = 'login.html'; // Replace with your actual login page URL
      }, 500);
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      // Redirect the user back to the student dashboard
      console.log('Logout cancelled. Returning to dashboard...');
      window.location.href = 'dashboard.html'; // Replace with your actual dashboard URL
    });
  }
});