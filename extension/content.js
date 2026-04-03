document.addEventListener("focusin", function(event) {
    const target = event.target;

    // Detect if user clicks into a password field
    if (target.tagName === "INPUT" && target.type === "password") {
        if (!document.getElementById("cyber-tooltip")) {
            showPasswordGuidance(target);
        }
    }
});

function showPasswordGuidance(inputElement) {
    const tooltip = document.createElement("div");
    tooltip.id = "cyber-tooltip";
    tooltip.innerHTML = "<strong>Security Nudge:</strong> Use a passphrase (e.g., <em>Correct-Horse-Battery-Staple</em>).";
    
    // Add tooltip to page
    document.body.appendChild(tooltip);
    
    // Position it
    const rect = inputElement.getBoundingClientRect();
    tooltip.style.position = "absolute";
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    tooltip.style.zIndex = "999999";

    // Remove tooltip when user clicks away
    inputElement.addEventListener("focusout", () => {
        const existingTooltip = document.getElementById("cyber-tooltip");
        if (existingTooltip) existingTooltip.remove();
    });
}
