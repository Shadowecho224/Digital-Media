/* ==========================================
   1. MAIN PANEL NAVIGATION
   ========================================== */

// Helper function to safely hide elements if they exist
function hideIfExists(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = "none";
}

// Helper function to toggle element display
function toggleDisplay(id) {
    var el = document.getElementById(id);
    if (el) {
        if (el.style.display === "none" || el.style.display === "") {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    }
}

function showPanel(panelId) {
    var targetPanel = document.getElementById(panelId);
    if (!targetPanel) return;

    // Helper lists for batch hiding
    var heroSubContainers = [
        "characterContainer", 
        "travelContainer", 
        "musicContainer", 
        "printContainer", 
        "globalContainer", 
        "charityContainer"
    ];
    var journalSubContainers = [
        "Unit1Container", 
        "Unit2Container", 
        "Unit3Container"
    ];

    // If the clicked panel is already visible, hide it and its contents
    if (targetPanel.style.display === "block") {
        targetPanel.style.display = "none";

        if (panelId === 'hero') {
            heroSubContainers.forEach(hideIfExists);
        }
        if (panelId === 'Journal') {
            journalSubContainers.forEach(hideIfExists);
        }
        if (panelId === 'citizen') {
            hideIfExists("GlobalcitizenContainer");
        }
        return; 
    }

    // Hide all panels to prepare for tab swap
    var panels = document.getElementsByClassName("panel");
    for (var i = 0; i < panels.length; i++) {
        panels[i].style.display = "none";
    }

    // Show targeted panel
    targetPanel.style.display = "block";

    // Hide unrelated sub-containers when switching tabs
    if (panelId !== 'hero') {
        heroSubContainers.forEach(hideIfExists);
    }
    if (panelId !== 'Journal') {
        journalSubContainers.forEach(hideIfExists);
    }
    if (panelId !== 'citizen') {
        hideIfExists("GlobalcitizenContainer");
    }

    // Update active navigation link styles
    var navLinks = document.querySelectorAll('.nav-bar a');
    navLinks.forEach(function(link) {
        var onClickAttr = link.getAttribute('onclick');
        if (onClickAttr && onClickAttr.includes("'" + panelId + "'")) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ==========================================
   2. CONTENT TOGGLE FUNCTIONS
   ========================================== */
function toggleCharacter() { toggleDisplay("characterContainer"); }
function toggleTravel()    { toggleDisplay("travelContainer"); }
function toggleMusic()     { toggleDisplay("musicContainer"); }
function togglePrint()     { toggleDisplay("printContainer"); }
function toggleGlobal()    { toggleDisplay("globalContainer"); }
function toggleCharity()   { toggleDisplay("charityContainer"); }

function toggleUnit1()     { toggleDisplay("Unit1Container"); }
function toggleUnit2()     { toggleDisplay("Unit2Container"); }
function toggleUnit3()     { toggleDisplay("Unit3Container"); }

/* ==========================================
   3. DOM INTERACTIVITIES (D&D / Dice Roller)
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {

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
