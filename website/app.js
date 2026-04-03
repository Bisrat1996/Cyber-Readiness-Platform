document.addEventListener("DOMContentLoaded", () => {
    const btnReport = document.getElementById("btn-report");
    const badLink = document.getElementById("bad-link");
    const feedback = document.getElementById("feedback-banner");
    const statusBadge = document.getElementById("status-badge");

    // Simulation Logic
    btnReport.addEventListener("click", () => {
        feedback.textContent = "Excellent! You spotted the typo in the email domain ('0' instead of 'o') and the false sense of urgency.";
        feedback.className = "feedback success";
        statusBadge.textContent = "Complete";
        statusBadge.className = "badge complete";
    });

    badLink.addEventListener("click", (e) => {
        e.preventDefault();
        feedback.textContent = "Oops! You clicked a suspicious link. Always check the sender's email address carefully before clicking.";
        feedback.className = "feedback error";
    });

    // AI Chatbot Logic
    const btnAsk = document.getElementById("btn-ask");
    const aiInput = document.getElementById("ai-input");
    const aiChat = document.getElementById("ai-chat");

    btnAsk.addEventListener("click", () => {
        const question = aiInput.value.trim();
        if (!question) return;

        // Add user message
        aiChat.innerHTML += `<p class="user-msg">${question}</p>`;
        aiInput.value = "";

        // Simulate AI response
        setTimeout(() => {
            let answer = "I'm a demo AI. In a production environment, I'd use an API to give you a detailed answer!";
            if (question.toLowerCase().includes("password")) {
                answer = "A strong password is a passphrase! Try combining 3-4 random words, like 'Purple-Coffee-Desk-99'.";
            } else if (question.toLowerCase().includes("phishing")) {
                answer = "Phishing relies on urgency and deception. Always verify the sender's actual email address, not just their display name.";
            }
            aiChat.innerHTML += `<p class="ai-msg">${answer}</p>`;
            aiChat.scrollTop = aiChat.scrollHeight; // Scroll to bottom
        }, 1000);
    });
});
