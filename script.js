const questions = [
    {
        question: "Unit of Electric Current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: "Ampere",
        chapter: "Current Electricity"
    },
    {
        question: "Speed of light?",
        options: ["3x10^8 m/s", "3x10^6 m/s", "3x10^5 m/s", "None"],
        answer: "3x10^8 m/s",
        chapter: "Ray Optics"
    }
];

let timeLeft = 60;

let timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time Left: " + timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        submitQuiz();
    }
}, 1000);

const quizDiv = document.getElementById("quiz");

questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");

    div.innerHTML = `
        <p><strong>${q.question}</strong></p>
        ${q.options.map(opt => `
            <label>
                <input type="radio" name="q${index}" value="${opt}">
                ${opt}
            </label><br>
        `).join("")}
    `;

    quizDiv.appendChild(div);
});

function submitQuiz() {
    clearInterval(timer);

    let score = 0;
    let chapterPerformance = {};

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);

        if (!chapterPerformance[q.chapter]) {
            chapterPerformance[q.chapter] = { correct: 0, total: 0 };
        }

        chapterPerformance[q.chapter].total++;

        if (selected && selected.value === q.answer) {
            score++;
            chapterPerformance[q.chapter].correct++;
        }
    });

    let resultHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;

    let predicted = (score / questions.length) * 100;
    resultHTML += `<p>Predicted Board Score: ${predicted.toFixed(0)}%</p>`;

    for (let chapter in chapterPerformance) {
        let data = chapterPerformance[chapter];
        let percent = (data.correct / data.total) * 100;

        let status = "";
        if (percent < 50) status = "Weak ❌";
        else if (percent < 75) status = "Average ⚠️";
        else status = "Strong ✅";

        resultHTML += `<p>${chapter}: ${percent.toFixed(0)}% - ${status}</p>`;
    }

    document.getElementById("result").innerHTML = resultHTML;
}
