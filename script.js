// Function exposed globally to work directly with onclick="showPanel('...')" in HTML
function showPanel(panelId) {
    // List of all main top-level panels
    const mainPanels = ['hero', 'citizen', 'Journal'];

    // Hide all main panels and lower active navigation state
    mainPanels.forEach(id => {
        const panel = document.getElementById(id);
        if (panel) {
            panel.classList.remove('active-section');
        }
    });

    // Show the selected panel
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
        targetPanel.classList.add('active-section');
    }

    // Highlight the active link in the nav bar
    const navLinks = document.querySelectorAll('.nav-bar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(panelId)) {
            link.classList.add('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Set default visible panel on page load
    showPanel('hero');

    // ==========================================
    // TOGGLE CONTENT BUTTONS (Inner Sections)
    // ==========================================
    const characterContainer = document.getElementById("characterContainer");
    const travelContainer = document.getElementById("travelContainer");
    const journal1 = document.getElementById("JournalEntry1Container");
    const journal2 = document.getElementById("JournalEntry2Container");
    const journal3 = document.getElementById("JournalEntry3Container");

    const btnToggleCharacter = document.getElementById("btn-toggle-character");
    if (btnToggleCharacter && characterContainer) {
        btnToggleCharacter.addEventListener("click", () => {
            characterContainer.classList.toggle("active-section");
        });
    }

    const btnToggleCitizen = document.getElementById("btn-toggle-citizen");
    if (btnToggleCitizen && travelContainer) {
        btnToggleCitizen.addEventListener("click", () => {
            travelContainer.classList.toggle("active-section");
        });
    }

    const btnToggleUnit1 = document.getElementById("btn-toggle-unit1");
    if (btnToggleUnit1 && journal1) {
        btnToggleUnit1.addEventListener("click", () => {
            journal1.classList.toggle("active-section");
        });
    }

    const btnToggleUnit2 = document.getElementById("btn-toggle-unit2");
    if (btnToggleUnit2 && journal2) {
        btnToggleUnit2.addEventListener("click", () => {
            journal2.classList.toggle("active-section");
        });
    }

    const btnToggleUnit3 = document.getElementById("btn-toggle-unit3");
    if (btnToggleUnit3 && journal3) {
        btnToggleUnit3.addEventListener("click", () => {
            journal3.classList.toggle("active-section");
        });
    }

    // ==========================================
    // CHARACTER SHEET TAB SWITCHING
    // ==========================================
    const btnSheetMain = document.getElementById("btn-sheet-main");
    const btnSheetMiddle = document.getElementById("btn-sheet-middle");
    const sheetMain = document.getElementById("sheet-main");
    const sheetMiddle = document.getElementById("sheet-middle");

    if (btnSheetMain && btnSheetMiddle && sheetMain && sheetMiddle) {
        btnSheetMain.addEventListener("click", () => {
            sheetMain.classList.add("active");
            sheetMiddle.classList.remove("active");
        });

        btnSheetMiddle.addEventListener("click", () => {
            sheetMiddle.classList.add("active");
            sheetMain.classList.remove("active");
        });
    }

    // ==========================================
    // INFO QUESTION MARK BUTTONS
    // ==========================================
    const infoButtons = document.querySelectorAll(".info-btn");
    infoButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const note = btn.nextElementSibling;
            if (note && note.classList.contains("skill-note")) {
                note.classList.toggle("show");
            }
        });
    });

    // ==========================================
    // DICE ROLLER LOGIC
    // ==========================================
    const diceBox = document.getElementById("dice-result-box");
    const closeDiceBtn = document.getElementById("close-dice-btn");
    const rollTitle = document.getElementById("roll-title");
    const rollDetails = document.getElementById("roll-details");
    const rollTotal = document.getElementById("roll-total");

    if (closeDiceBtn) {
        closeDiceBtn.addEventListener("click", () => {
            diceBox.classList.remove("active");
        });
    }

    const rollables = document.querySelectorAll(".rollable-label, .rollable-text");
    rollables.forEach(item => {
        item.addEventListener("click", () => {
            const label = item.getAttribute("data-label") || item.getAttribute("data-name") || "Roll";
            const modStr = item.getAttribute("data-mod") || "+0";
            const formula = item.getAttribute("data-formula");

            let d20 = Math.floor(Math.random() * 20) + 1;
            let modVal = parseInt(modStr, 10) || 0;
            let total = d20 + modVal;

            if (rollTitle) rollTitle.textContent = label;

            if (formula) {
                let d6 = Math.floor(Math.random() * 6) + 1;
                rollDetails.textContent = `Formula: ${formula} (Rolled ${d6} + 18)`;
                rollTotal.textContent = d6 + 18;
            } else {
                rollDetails.textContent = `d20 (${d20}) ${modVal >= 0 ? '+' : ''}${modVal}`;
                rollTotal.textContent = total;
            }

            if (diceBox) diceBox.classList.add("active");
        });
    });
});
