document.addEventListener("DOMContentLoaded", () => {
    // --- State Management ---
    let progress = { phishing: false, passwords: false, quiz: 0 };
    const updateProgress = () => {
        let score = 0;
        if (progress.phishing) score += 33;
        if (progress.passwords) score += 33;
        if (progress.quiz === 2) score += 34; // 2 questions

        document.getElementById("progress-bar").style.width = score + "%";
        document.getElementById("progress-text").innerText = score + "%";

        if (score === 100) {
            const badge = document.getElementById("status-badge");
            badge.innerText = "Complete";
            badge.className = "badge complete";
            document.querySelector("h1").innerText = "Training Complete! 🎉";
        }
    };

    // --- Navigation Logic ---
    const navButtons = document.querySelectorAll(".nav-btn");
    const views = document.querySelectorAll(".view");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            navButtons.forEach(b => b.classList.remove("active"));
            views.forEach(v => v.classList.remove("active-view"));
            
            btn.classList.add("active");
            document.getElementById(btn.dataset.target).classList.add("active-view");
        });
    });

    // --- Module 1: Phishing ---
    document.getElementById("btn-report").addEventListener("click", () => {
        const fb = document.getElementById("feedback-phishing");
        fb.innerHTML = "<strong>Correct!</strong> You spotted the typo in the email domain and the false sense of urgency.";
        fb.className = "feedback success";
        progress.phishing = true;
        document.getElementById("card-phishing").classList.add("done");
        document.getElementById("card-phishing").innerHTML = 'Module 1: Phishing <i class="fa-solid fa-check text-success"></i>';
        updateProgress();
    });

    document.getElementById("bad-link").addEventListener("click", (e) => {
        e.preventDefault();
        const fb = document.getElementById("feedback-phishing");
        fb.innerHTML = "<strong>Oops!</strong> You clicked a suspicious link. Always verify the sender first.";
        fb.className = "feedback error";
    });

    // --- Module 2: Password Coach ---
    const pwdInput = document.getElementById("password-input");
    const pwdMeter = document.getElementById("password-meter");
    const pwdFeedback = document.getElementById("password-feedback");
    const pwdBtn = document.getElementById("btn-complete-pwd");

    pwdInput.addEventListener("input", (e) => {
        const val = e.target.value;
        if (val.length === 0) {
            pwdMeter.style.width = "0%";
            pwdFeedback.innerText = "Waiting for input...";
            pwdBtn.classList.add("hidden");
        } else if (val.length < 8) {
            pwdMeter.style.width = "25%";
            pwdMeter.style.background = "#EF4444";
            pwdFeedback.innerText = "Weak! A hacker could crack this instantly.";
            pwdBtn.classList.add("hidden");
        } else if (val.length >= 8 && val.length < 16) {
            pwdMeter.style.width = "60%";
            pwdMeter.style.background = "#F59E0B"; // Yellow
            pwdFeedback.innerText = "Getting better, but still vulnerable to brute force.";
            pwdBtn.classList.add("hidden");
        } else if (val.length >= 16) {
            pwdMeter.style.width = "100%";
            pwdMeter.style.background = "#10B981"; // Green
            pwdFeedback.innerHTML = "<strong>Strong Passphrase!</strong> It would take centuries to crack.";
            pwdBtn.classList.remove("hidden");
        }
    });

    pwdBtn.addEventListener("click", () => {
        progress.passwords = true;
        document.getElementById("card-passwords").classList.add("done");
        document.getElementById("card-passwords").innerHTML = 'Module 2: Passwords <i class="fa-solid fa-check text-success"></i>';
        pwdInput.disabled = true;
        pwdBtn.innerText = "Module Passed!";
        updateProgress();
    });

    // --- Module 3: Quiz Logic ---
    window.checkQuiz = function(btn, isCorrect) {
        const siblings = btn.parentElement.querySelectorAll(".btn-quiz");
        siblings.forEach(s => { s.disabled = true; s.classList.remove("correct", "wrong"); });
        
        if (isCorrect) {
            btn.classList.add("correct");
            progress.quiz += 1;
        } else {
            btn.classList.add("wrong");
        }

        if (document.querySelectorAll('.btn-quiz.correct').length === 2) {
            const fb = document.getElementById("feedback-quiz");
            fb.innerText = "Assessment Passed!";
            fb.className = "feedback success";
            document.getElementById("card-quiz").classList.add("done");
            document.getElementById("card-quiz").innerHTML = 'Module 3: Assessment <i class="fa-solid fa-check text-success"></i>';
            updateProgress();
        }
    };

    // --- Floating AI Widget ---
    const aiToggle = document.getElementById("ai-toggle");
    const aiWindow = document.getElementById("ai-window");
    const btnAsk = document.getElementById("btn-ask");
    const aiInput = document.getElementById("ai-input");
    const aiChat = document.getElementById("ai-chat");

    aiToggle.addEventListener("click", () => {
        aiWindow.classList.toggle("hidden");
    });

    btnAsk.addEventListener("click", () => {
        const question = aiInput.value.trim();
        if (!question) return;

        aiChat.innerHTML += `<div class="user-msg">${question}</div>`;
        aiInput.value = "";

        setTimeout(() => {
            let answer = "I'm a demo AI. In the final version, I will connect to an API!";
            if (question.toLowerCase().includes("password")) answer = "A passphrase is best! String together 3 or 4 random words.";
            if (question.toLowerCase().includes("phishing")) answer = "Look for bad grammar, fake email addresses, and urgency.";
            
            aiChat.innerHTML += `<div class="ai-msg">${answer}</div>`;
            aiChat.scrollTop = aiChat.scrollHeight;
        }, 800);
    });
});
