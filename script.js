/* ==========================================
   1. MAIN PANEL NAVIGATION
   ========================================== */
function showPanel(panelId) {
    var targetPanel = document.getElementById(panelId);
    if (!targetPanel) return;

    // Safe helper to hide element by ID
    function hideIfExists(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = "none";
    }

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

    // Toggle off if clicking an already active panel
    if (targetPanel.style.display === "block") {
        targetPanel.style.display = "none";

        if (panelId === 'hero') hideHeroContainers();
        if (panelId === 'Journal') hideJournalContainers();
        if (panelId === 'citizen') hideCitizenContainers();
        return;
    }

    // Hide all panels
    var panels = document.getElementsByClassName("panel");
    for (var i = 0; i < panels.length; i++) {
        panels[i].style.display = "none";
    }

    // Show targeted main panel
    targetPanel.style.display = "block";

    // Clean up unrelated sub-containers
    if (panelId !== 'hero') hideHeroContainers();
    if (panelId !== 'Journal') hideJournalContainers();
    if (panelId !== 'citizen') hideCitizenContainers();

    // Update nav link active state
    var navLinks = document.querySelectorAll('.nav-bar > .nav-item > a');
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
function toggleContainer(id) {
    var el = document.getElementById(id);
    if (el) {
        el.style.display = (el.style.display === "none" || el.style.display === "") ? "block" : "none";
    }
}

function toggleCharacter() { toggleContainer("characterContainer"); }
function toggleTravel() { toggleContainer("travelContainer"); }
function toggleMusic() { toggleContainer("musicContainer"); }
function togglePrint() { toggleContainer("printContainer"); }
function toggleGlobal() { toggleContainer("globalContainer"); }
function toggleUnit1() { toggleContainer("Unit1Container"); }
function toggleUnit2() { toggleContainer("Unit2Container"); }
function toggleUnit3() { toggleContainer("Unit3Container"); }

/* ==========================================
   3. DOM INTERACTIVITIES
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {

    // Open default home tab on load
    showPanel('hero');

    // --- CHARACTER SHEET TAB SWITCHING ---
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

    // --- TOOLTIP INFO BUTTONS ---
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
