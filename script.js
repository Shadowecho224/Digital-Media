document.addEventListener("DOMContentLoaded", () => {
    // Nav Elements
    const navHero = document.getElementById("nav-hero");
    const navCitizen = document.getElementById("nav-citizen");
    const navJournal = document.getElementById("nav-journal");

    // Main Section Elements
    const heroPanel = document.getElementById("hero");
    const citizenPanel = document.getElementById("citizen");
    const journalPanel = document.getElementById("Journal");

    // Dynamic Container Panels
    const characterContainer = document.getElementById("characterContainer");
    const travelContainer = document.getElementById("travelContainer");
    const journal1 = document.getElementById("JournalEntry1Container");
    const journal2 = document.getElementById("JournalEntry2Container");
    const journal3 = document.getElementById("JournalEntry3Container");

    const navLinks = [navHero, navCitizen, navJournal];

    function clearActiveNav() {
        navLinks.forEach(link => {
            if (link) link.classList.remove("active");
        });
    }

    function hideAllSections() {
        const sections = [
            heroPanel, citizenPanel, journalPanel,
            characterContainer, travelContainer,
            journal1, journal2, journal3
        ];
        sections.forEach(sec => {
            if (sec) sec.classList.remove("active-section");
        });
    }

    // Default Initialization
    hideAllSections();
    if (heroPanel) heroPanel.classList.add("active-section");

    // Navigation Click Handlers
    if (navHero) {
        navHero.addEventListener("click", () => {
            hideAllSections();
            clearActiveNav();
            navHero.classList.add("active");
            heroPanel.classList.add("active-section");
        });
    }

    if (navCitizen) {
        navCitizen.addEventListener("click", () => {
            hideAllSections();
            clearActiveNav();
            navCitizen.classList.add("active");
            citizenPanel.classList.add("active-section");
        });
    }

    if (navJournal) {
        navJournal.addEventListener("click", () => {
            hideAllSections();
            clearActiveNav();
            navJournal.classList.add("active");
            journalPanel.classList.add("active-section");
        });
    }

    // Toggle Content Buttons
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

    // Character Sheet Page Switching
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

    // Info Question Mark Buttons
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

    // Dice Roller Logic
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
