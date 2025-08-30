// Show date and time
    function updateDateTime() {
      const now = new Date();
      document.getElementById('dateandtime').innerText = now.toLocaleString();
    }
    setInterval(updateDateTime, 1000);

    // Start camera
    function startCamera() {
      const video = document.getElementById('video');
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { video.srcObject = stream; })
        .catch(err => { alert("Error accessing camera: " + err); });
    }

    // Preview uploaded photo
    document.getElementById('photoUpload').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          document.getElementById('preview').src = event.target.result;
        }
        reader.readAsDataURL(file);
      }
    });

    // Export attendance data as CSV
    function exportCSV() {
      const rows = [
        ["Total Students", "Present", "Absent"],
        [50, 39, 11]
      ];
      let csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");

      const link = document.createElement("a");
      link.setAttribute("href", csvContent);
      link.setAttribute("download", "attendance.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }