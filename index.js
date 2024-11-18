const appointmentForm = document.getElementById("appointment-form");
const appointmentsList = document.getElementById("appointments-list");

// Load appointments from localStorage
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// Function to render appointments
function renderAppointments() {
    appointmentsList.innerHTML = ""; // Clear the list before re-rendering
    appointments.forEach((appointment, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
    <strong>${appointment.name}</strong><br>
    Email: ${appointment.email}<br>
    Time: ${appointment.time}<br>
    Purpose: ${appointment.purpose}
    <button onclick="deleteAppointment(${index})">Cancel</button>
`;

        appointmentsList.appendChild(li);
    });
}


// Add appointment on form submit
appointmentForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload on form submit

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const time = document.getElementById("appointment-time").value;
    const purpose = document.getElementById("purpose").value;

    const newAppointment = {
        name,
        email,
        time,
        purpose
    };
    appointments.push(newAppointment);

    localStorage.setItem("appointments", JSON.stringify(appointments)); // Save appointments to localStorage
    renderAppointments(); // Re-render appointments list

    // Clear form inputs
    appointmentForm.reset();
});

// Delete appointment
function deleteAppointment(index) {
    appointments.splice(index, 1); // Remove appointment from array
    localStorage.setItem("appointments", JSON.stringify(appointments)); // Update localStorage
    renderAppointments(); // Re-render appointments list
}

// Render appointments when page loads
renderAppointments();
