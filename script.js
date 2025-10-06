// If we're on the home page, render the course list
if (document.getElementById("course-list")) {
  const courseList = document.getElementById("course-list");

  // Loop through courses and add to the page
  courses.forEach(course => {
    const div = document.createElement("div");
    div.className = "course-card";
    div.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <button onclick="viewCourse(${course.id})">View Details</button>
    `;
    courseList.appendChild(div);
  });
}

// Redirect user to course detail page
function viewCourse(id) {
  window.location.href = `course.html?id=${id}`;
}

// If we're on the course detail page, render specific course data
if (document.getElementById("course-detail")) {
  const params = new URLSearchParams(window.location.search);
  const courseId = parseInt(params.get("id"));
  const course = courses.find(c => c.id === courseId);

  if (course) {
    const container = document.getElementById("course-detail");

    // Check if course was marked as completed using localStorage
    const isCompleted = localStorage.getItem(`course_${courseId}_completed`) === "true";

    // Render course detail content
    container.innerHTML = `
      <div class="course-detail">
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <h4>Lessons:</h4>
        <ul>${course.lessons.map(lesson => `<li>${lesson}</li>`).join('')}</ul>
        <p><strong>Status:</strong> ${isCompleted ? "✅ Completed" : "In Progress"}</p>
        <button onclick="markCompleted(${courseId})">
          ${isCompleted ? "Mark Again" : "Mark as Completed"}
        </button>
        <br/><br/>
        <button onclick="goBack()">← Back to Courses</button>
      </div>
    `;
  }
}

// Mark course as completed using localStorage
function markCompleted(id) {
  localStorage.setItem(`course_${id}_completed`, "true");
  alert("Course marked as completed!");
  location.reload(); // Refresh page to update status
}

// Navigate back to home page
function goBack() {
  window.location.href = "index.html";
}
