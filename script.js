/* ==========================================================================
   NAVIGATION & UI CONTROLLER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const charSheetLink = document.getElementById('nav-char-sheet');
  const charSheetContainer = document.getElementById('character-sheet-container');
  const panelBtns = document.querySelectorAll('.nav-panel-btn');
  const panels = document.querySelectorAll('.panel');
  const diceBox = document.getElementById('dice-result-box');
  const closeDiceBtn = document.getElementById('close-dice-btn');

  // Toggle Character Sheet Visibility from Header Nav
  if (charSheetLink && charSheetContainer) {
    charSheetLink.addEventListener('click', (e) => {
      e.preventDefault();

      // Close open navigation panels first
      panels.forEach(panel => panel.classList.remove('active'));
      panelBtns.forEach(btn => btn.classList.remove('active'));

      // Toggle character sheet display and active class
      if (charSheetContainer.style.display === 'none' || charSheetContainer.style.display === '') {
        charSheetContainer.style.display = 'block';
        charSheetLink.classList.add('active');
      } else {
        charSheetContainer.style.display = 'none';
        charSheetLink.classList.remove('active');
      }
    });
  }

  // Handle Sub-Header Panel Dropdowns
  panelBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);

      // Hide character sheet when opening lore/rules panels
      if (charSheetContainer) {
        charSheetContainer.style.display = 'none';
      }
      if (charSheetLink) {
        charSheetLink.classList.remove('active');
      }

      // Close other active panels
      panels.forEach(p => {
        if (p !== targetPanel) p.classList.remove('active');
      });

      // Toggle current panel and active link status
      if (targetPanel) {
        targetPanel.classList.toggle('active');
      }
      btn.classList.toggle('active');
    });
  });

  // Close Dice Overlay Event Handler
  if (closeDiceBtn) {
    closeDiceBtn.addEventListener('click', closeDiceBox);
  }
});

/* ==========================================================================
   PAGE & CONTENT TOGGLE FUNCTIONS
   ========================================================================== */
function toggleSkillNote(buttonElement) {
  var note = buttonElement.nextElementSibling;
  if (!note) return;
  if (note.style.display === "none" || note.style.display === "") {
    note.style.display = "block";
  } else {
    note.style.display = "none";
  }
}

function hideAllMainContent() {
  var contents = document.getElementsByClassName("main-page-content");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
}

function showPanel(panelId) {
  var targetPanel = document.getElementById(panelId);
  if (!targetPanel) return;
  
  var isCurrentlyOpen = (targetPanel.style.display === "block");
  var panels = document.getElementsByClassName("panel");
  for (var i = 0; i < panels.length; i++) {
    panels[i].style.display = "none";
  }
  hideAllMainContent();
  if (!isCurrentlyOpen) {
    targetPanel.style.display = "block";
  }
}

function toggleCharacter() {
  var hero = document.getElementById('hero');
  if (hero) hero.style.display = "none";
  hideAllMainContent();
  var container = document.getElementById("characterContainer");
  if (container) container.style.display = "block";
}

function toggleGlobalCitizen() {
  var citizen = document.getElementById('citizen');
  if (citizen) citizen.style.display = "none";
  hideAllMainContent();
  var container = document.getElementById("travelContainer");
  if (container) container.style.display = "block";
}

function toggleUnit1() {  
  var journal = document.getElementById('Journal');
  if (journal) journal.style.display = "none";
  hideAllMainContent();
  var container = document.getElementById("JournalEntry1Container");
  if (container) container.style.display = "block";
}

function toggleUnit2() {  
  var journal = document.getElementById('Journal');
  if (journal) journal.style.display = "none";
  hideAllMainContent();
  var container = document.getElementById("JournalEntry2Container");
  if (container) container.style.display = "block";
}

function toggleUnit3() {  
  var journal = document.getElementById('Journal');
  if (journal) journal.style.display = "none";
  hideAllMainContent();
  var container = document.getElementById("JournalEntry3Container");
  if (container) container.style.display = "block";
}

function showSheetPage(pageId) {
  var pages = document.getElementsByClassName('sheet-page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }
  var targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.classList.add('active');
}

function toggleMiddle() { 
  showSheetPage('sheet-middle'); 
}

/* ==========================================================================
   DICE ROLLER LOGIC
   ========================================================================== */
function rollCheck(label, modString) {
  var mod = parseInt(modString) || 0;
  var d20 = Math.floor(Math.random() * 20) + 1;
  var total = d20 + mod;
  
  var modDisplay = mod >= 0 ? "+" + mod : mod;
  
  var titleEl = document.getElementById('roll-title');
  var detailsEl = document.getElementById('roll-details');
  var totalEl = document.getElementById('roll-total');
  var boxEl = document.getElementById('dice-result-box');

  if (titleEl) titleEl.innerText = label;
  if (detailsEl) detailsEl.innerText = "d20 (" + d20 + ") " + modDisplay;
  if (totalEl) totalEl.innerText = total;
  if (boxEl) boxEl.style.display = "block";
}

function rollAttack(attackName, dmgFormula) {
  var match = dmgFormula.match(/(\d+)d(\d+)\+(\d+)/);
  if (match) {
    var numDice = parseInt(match[1]);
    var dieSides = parseInt(match[2]);
    var mod = parseInt(match[3]);
    var total = mod;
    var rolls = [];
    
    for (var i = 0; i < numDice; i++) {
      var roll = Math.floor(Math.random() * dieSides) + 1;
      rolls.push(roll);
      total += roll;
    }

    var titleEl = document.getElementById('roll-title');
    var detailsEl = document.getElementById('roll-details');
    var totalEl = document.getElementById('roll-total');
    var boxEl = document.getElementById('dice-result-box');

    if (titleEl) titleEl.innerText = attackName + " Damage";
    if (detailsEl) detailsEl.innerText = numDice + "d" + dieSides + " (" + rolls.join(", ") + ") +" + mod;
    if (totalEl) totalEl.innerText = total;
    if (boxEl) boxEl.style.display = "block";
  }
}

function closeDiceBox() {
  var boxEl = document.getElementById('dice-result-box');
  if (boxEl) boxEl.style.display = "none";
}