/* ==========================================
   1. MAIN PANEL NAVIGATION
   ========================================== */
function showPanel(panelId) {
    var targetPanel = document.getElementById(panelId);
    if (!targetPanel) return;

    // Helper function to safely hide elements if they exist
    function hideIfExists(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = "none";
    }

    // Helper functions for hiding grouped containers
    function hideHeroContainers() {
        hideIfExists("characterContainer");
        hideIfExists("travelContainer");
        hideIfExists("musicContainer");
        hideIfExists("printContainer");
        hideIfExists("globalContainer");
        hideIfExists("charityContainer");
    }

    function hideJournalContainers() {
        hideIfExists("Unit1Container");
        hideIfExists("Unit2Container");
        hideIfExists("Unit3Container");
    }

    function hideCitizenContainers() {
        hideIfExists("GlobalcitizenContainer");
    }

    // If the clicked panel is already visible, toggle it off and hide its sub-containers
    if (targetPanel.style.display === "block") {
        targetPanel.style.display = "none";

        if (panelId === 'hero') hideHeroContainers();
        if (panelId === 'Journal') hideJournalContainers();
        if (panelId === 'citizen') hideCitizenContainers();
        return;
    }

    // Hide all main panels first
    var panels = document.getElementsByClassName("panel");
    for (var i = 0; i < panels.length; i++) {
        panels[i].style.display = "none";
    }

    // Show the targeted panel
    targetPanel.style.display = "block";

    // Clean up sub-containers belonging to other main tabs
    if (panelId !== 'hero') hideHeroContainers();
    if (panelId !== 'Journal') hideJournalContainers();
    if (panelId !== 'citizen') hideCitizenContainers();

    // Highlight active link in the navigation bar
    var navLinks = document.querySelectorAll('.nav-bar a');
    navLinks.forEach(function (link) {
        var onClickAttr = link.getAttribute('onclick');
        if (onClickAttr && onClickAttr.includes("'" + panelId + "'")) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ==========================================
   2. GLOBAL TOGGLE FUNCTIONS
   ========================================== */
function toggleCharacter() {
    var el = document.getElementById("characterContainer");
    if (el) el.style.display = (el.style.display === "none" || el.style.display === "") ? "block" : "none";
}

function toggleTravel() {
    var el = document.getElementById("travelContainer");
    if (el) el.style.display = (el.style.display === "none" || el.style.display === "") ? "block" : "none";
}

function toggleMusic() {
    var el = document.getElementById("musicContainer");
    if (el) el.style.display = (el.style.display === "none" || el.style.display === "") ? "block" : "none";
}

function togglePrint() {
    var el = document.getElementById("printContainer");
    if (el) el.style.display = (el.style.display === "none" || el.style.display === "") ? "block" : "none";
}

function toggleGlobal() {
    var el = document.getElementById("globalContainer");
    if (el) el.style.display = (el.style.display === "none" || el.style.display === "") ? "block" : "none";
}

/* ==========================================
   3. DOM INTERACTIVITIES
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {

    // Set default active panel on page load
    showPanel('hero');

    // --- CHARACTER SHEET PAGE SWITCHING ---
    var btnSheetMain = document.getElementById("btn-sheet-main");
    var btnSheetMiddle = document.getElementById("btn-sheet-middle");
    var sheetMain = document.getElementById("sheet-main");
    var sheetMiddle = document.getElementById("sheet-middle");

    if (btnSheetMain && btnSheetMiddle && sheetMain && sheetMiddle) {
        btnSheetMain.addEventListener("click", function () {
            sheetMain.classList.add("active");
            sheetMiddle.classList.remove("active");
        });

        btnSheetMiddle.addEventListener("click", function () {
            sheetMiddle.classList.add("active");
            sheetMain.classList.remove("active");
        });
    }

    // --- TOOLTIP INFO (?) BUTTONS ---
    var infoButtons = document.querySelectorAll(".info-btn");
    infoButtons.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            var note = btn.nextElementSibling;
            if (note && note.classList.contains("skill-note")) {
                note.classList.toggle("show");
            }
        });
    });

    // --- DICE ROLLER SYSTEM ---
    var diceBox = document.getElementById("dice-result-box");
    var closeDiceBtn = document.getElementById("close-dice-btn");
    var rollTitle = document.getElementById("roll-title");
    var rollDetails = document.getElementById("roll-details");
    var rollTotal = document.getElementById("roll-total");

    if (closeDiceBtn && diceBox) {
        closeDiceBtn.addEventListener("click", function () {
            diceBox.classList.remove("active");
        });
    }

    var rollables = document.querySelectorAll(".rollable-label, .rollable-text");
    rollables.forEach(function (item) {
        item.addEventListener("click", function () {
            var label = item.getAttribute("data-label") || item.getAttribute("data-name") || "Roll";
            var modStr = item.getAttribute("data-mod") || "+0";
            var formula = item.getAttribute("data-formula");

            var d20 = Math.floor(Math.random() * 20) + 1;
            var modVal = parseInt(modStr, 10) || 0;
            var total = d20 + modVal;

            if (rollTitle) rollTitle.textContent = label;

            if (formula) {
                var d6 = Math.floor(Math.random() * 6) + 1;
                if (rollDetails) rollDetails.textContent = "Formula: " + formula + " (Rolled " + d6 + " + 18)";
                if (rollTotal) rollTotal.textContent = d6 + 18;
            } else {
                if (rollDetails) rollDetails.textContent = "d20 (" + d20 + ") " + (modVal >= 0 ? '+' : '') + modVal;
                if (rollTotal) rollTotal.textContent = total;
            }

            if (diceBox) diceBox.classList.add("active");
        });
    });
});
