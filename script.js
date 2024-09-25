// Show the course modal when the page loads
window.onload = function() {
    openCourseModal();
};

function openCourseModal() {
    document.getElementById('courseModal').style.display = 'block';
}

function closeCourseModal() {
    document.getElementById('courseModal').style.display = 'none';
}

function submitCourses() {
    const selectedCourses = document.getElementById('courses').value;
    
    // Close course modal and open learning level modal
    closeCourseModal();
    openLevelModal();
}

function openLevelModal() {
    document.getElementById('levelModal').style.display = 'block';
}

function closeLevelModal() {
    document.getElementById('levelModal').style.display = 'none';
}

function submitLevel() {
    const selectedLevel = document.getElementById('level').value;
    
    // Close the level modal
    closeLevelModal();

    // Process and send course and level data
    console.log('Selected Level:', selectedLevel);
    alert("Course selection and level submitted successfully!");
}

// Toggle navbar links on small screens
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Handle course selection form submission
const courseForm = document.getElementById('courseForm');

courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get selected courses
    const selectedCourses = Array.from(courseForm.querySelectorAll('input[name="course"]:checked'))
                                  .map(checkbox => checkbox.value);

    if (selectedCourses.length === 0) {
        alert('Please select at least one course.');
        return;
    }

    // Proceed to the next step: choosing the learning level
    alert(`Courses selected: ${selectedCourses.join(', ')}`);
    // Here we will redirect to the next form for selecting learning level
});

// Handle learning level form submission
const levelForm = document.getElementById('levelForm');

levelForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get selected learning level
    const selectedLevel = levelForm.querySelector('input[name="level"]:checked').value;

    if (!selectedLevel) {
        alert('Please select a learning level.');
        return;
    }

    // Proceed to fetching course content from the Gemini API
    alert(`Learning level selected: ${selectedLevel}`);
    
    // At this point, you would make an API call to the Gemini API to fetch the course content based on the selected courses and level.
    // For now, we'll just simulate it.
    fetchCourseContent(selectedLevel);
});

function fetchCourseContent(level) {
    // Simulating fetching content from the Gemini API based on the learning level
    alert(`Fetching course content for ${level} level...`);
    
    // Make API call here in the future
    // Example:
    // fetch(`https://api.gemini.com/courses?level=${level}`)
    //    .then(response => response.json())
    //    .then(data => console.log(data));
}

// Simulating API response with course content
const courseContent = {
    title: "Introduction to Programming",
    text: `
        In this course, we will cover the basics of programming using Python. 
        Programming is the process of creating a set of instructions that tell a computer how to perform a task. 
        We will go through variables, loops, functions, and object-oriented programming concepts.
    `,
    audioUrl: "audio/programming_intro.mp3"
};

// Simulating API call and dynamically inserting course content
document.addEventListener("DOMContentLoaded", () => {
    const courseTitle = document.querySelector(".textual-content h3");
    const courseText = document.getElementById("courseText");
    const courseAudio = document.getElementById("courseAudio");

    // Insert fetched content
    courseTitle.textContent = courseContent.title;
    courseText.textContent = courseContent.text;
    courseAudio.querySelector("source").src = courseContent.audioUrl;

    // Reload the audio element to reflect the new source
    courseAudio.load();
});

// Simulated quiz questions (ideally, these would come from the Gemini API)
const quizQuestions = [
    {
        question: "What is a variable in programming?",
        choices: [
            "A data storage unit",
            "A function",
            "An input method",
            "None of the above"
        ],
        correctAnswer: 0 // Index of correct answer
    },
    {
        question: "Which of the following is a loop in programming?",
        choices: [
            "if-else",
            "for",
            "try-catch",
            "print"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the main purpose of a function?",
        choices: [
            "To display output",
            "To define a sequence of operations",
            "To handle errors",
            "None of the above"
        ],
        correctAnswer: 1
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quizForm");
    const submitQuizButton = document.getElementById("submitQuiz");
    const resultContainer = document.getElementById("result");

    // Generate quiz questions
    quizQuestions.forEach((questionObj, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = `${index + 1}. ${questionObj.question}`;
        questionElement.appendChild(questionTitle);

        questionObj.choices.forEach((choice, choiceIndex) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = choiceIndex;

            label.appendChild(input);
            label.appendChild(document.createTextNode(choice));
            questionElement.appendChild(label);
            questionElement.appendChild(document.createElement("br"));
        });

        quizForm.appendChild(questionElement);
    });

    // Handle quiz submission
    submitQuizButton.addEventListener("click", () => {
        let score = 0;

        quizQuestions.forEach((questionObj, index) => {
            const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedAnswer && parseInt(selectedAnswer.value) === questionObj.correctAnswer) {
                score += 1;
            }
        });

        // Display result
        const totalQuestions = quizQuestions.length;
        resultContainer.textContent = `You scored ${score} out of ${totalQuestions}.`;
        if (score === totalQuestions) {
            resultContainer.style.color = "green";
        } else {
            resultContainer.style.color = "red";
        }
    });
});
