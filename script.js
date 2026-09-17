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
    function showPanel(panelId) {
        var targetPanel = document.getElementById(panelId);
        if (!targetPanel) return;
        
        if (targetPanel.style.display === "block") {
            targetPanel.style.display = "none";
            
            if (panelId === 'hero') {
                document.getElementById("characterContainer").style.display = "none";
                document.getElementById("travelContainer").style.display = "none";
                document.getElementById("musicContainer").style.display = "none";
                document.getElementById("printContainer").style.display = "none";
                document.getElementById("globalContainer").style.display = "none";
                document.getElementById("charityContainer").style.display = "none";
            }
             if (panelId !== 'Journal') {
                document.getElementById("Unit1Container").style.display = "none";
                document.getElementById("Unit2Container").style.display = "none";
                document.getElementById("Unit3Container").style.display = "none";
            }
            if (panelId === 'citizen') {
                document.getElementById("GlobalcitizenContainer").style.display = "none";
            }
            return; 
        }

        var panels = document.getElementsByClassName("panel");
        for (var i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
        }
        
        targetPanel.style.display = "block";
        
        if (panelId !== 'hero') {
            document.getElementById("characterContainer").style.display = "none";
            document.getElementById("travelContainer").style.display = "none";
            document.getElementById("musicContainer").style.display = "none";
            document.getElementById("printContainer").style.display = "none";
            document.getElementById("globalContainer").style.display = "none";
            document.getElementById("charityContainer").style.display = "none";
        }
        if (panelId !== 'Journal') {
            document.getElementById("Unit1Container").style.display = "none";
            document.getElementById("Unit2Container").style.display = "none";
            document.getElementById("Unit3Container").style.display = "none";
        }
    }


    function toggleCharacter() {
        var characterContainer = document.getElementById("characterContainer");
        if (characterContainer.style.display === "none" || characterContainer.style.display === "") {
            characterContainer.style.display = "block";
        } else {
            characterContainer.style.display = "none";
        }
    }

    function toggleTravel() {
        var travelBox = document.getElementById("travelContainer");
        if (travelBox.style.display === "none" || travelBox.style.display === "") {
            travelBox.style.display = "block";
        } else {
            travelBox.style.display = "none";
        }
    }

    function toggleMusic() {
        var musicBox = document.getElementById("musicContainer");
        if (musicBox.style.display === "none" || musicBox.style.display === "") {
            musicBox.style.display = "block";
        } else {
            musicBox.style.display = "none";
        }
    }

    function togglePrint(){  
        var printBox = document.getElementById("printContainer");
        if (printBox.style.display === "none" || printBox.style.display === "") {
            printBox.style.display = "block";
        } else {
           printBox.style.display = "none";
        }
    }

    function toggleGlobal(){  
        var globalBox = document.getElementById("globalContainer");
        if (globalBox.style.display === "none" || globalBox.style.display === "") {
            globalBox.style.display = "block";
        } else {
           globalBox.style.display = "none";
        }
    }
    // Optional: Update active navigation highlight if nav bar links exist
    var navLinks = document.querySelectorAll('.nav-bar a');
    navLinks.forEach(function(link) {
        var onClickAttr = link.getAttribute('onclick');
        if (onClickAttr && onClickAttr.includes(`'${panelId}'`)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


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
