function addOption() {
    const container = document.getElementById("optionsContainer");
    const optionCount = container.children.length + 1;

    const optionGroup = document.createElement("div");
    optionGroup.classList.add("option-group");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("option-input");
    input.placeholder = `Option ${optionCount}`;
    input.required = true;

    optionGroup.appendChild(input);


    container.appendChild(optionGroup);
}



// Handle form submission
document.getElementById("questionForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const questionText = document.getElementById("questionText").value;
    const correctAnswer = document.getElementById("correctAnswer").value;

    const sqloptions = Array.from(document.querySelectorAll(".option-input"))
        .map(input => input.value)
        .filter(option => option.trim() !== "");

    if (!sqloptions.includes(correctAnswer)) {
        alert("Correct answer must be one of the options.");
        return;
    }

    const payload = {
        questionText,
        correctAnswer,
        sqloptions
    };

    try {
        const response = await fetch('http://localhost:8092/api/sqlQuestionsave', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Question saved successfully!");
            document.getElementById("questionForm").reset();
            
        } else {
            const error = await response.json();
            alert("Failed to save question: " + error.message);
        }
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
});
