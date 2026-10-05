/* ==========================================
   1. EXPLICIT TOGGLE & TAB FUNCTIONS
   ========================================== */

/**
 * Toggles visibility of the characterContainer element
 * using the 'hidden-sheet' class and display property.
 */
function toggleCharacter() {
    const charContainer = document.getElementById('characterContainer');
    if (charContainer) {
        charContainer.classList.toggle('hidden-sheet');
        if (!charContainer.classList.contains('hidden-sheet')) {
            charContainer.style.display = 'block';
        } else {
            charContainer.style.display = 'none';
        }
    }
}

/**
 * Switches character sheet pages (tabs) based on element ID.
 * @param {string} tabId - ID of the page to activate (e.g., 'sheet-main', 'sheet-middle')
 */
function switchSheetTab(tabId) {
    const pages = document.querySelectorAll('.sheet-page');
    pages.forEach(page => page.classList.remove('active'));
    
    const activePage = document.getElementById(tabId);
    if (activePage) {
        activePage.classList.add('active');
    }
}

/* ==========================================
   2. DOM CONTENT LOADED & INITIALIZATION
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSheetControls();
    initDiceRoller();
    initSkillNoteToggles();
});

/* ==========================================
   3. EVENT LISTENERS & SETUP
   ========================================== */
function initNavigation() {
    const navLinks = document.querySelectorAll('[data-target="characterContainer"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCharacter();
        });
    });
}

function initSheetControls() {
    const btnOverview = document.getElementById('btn-sheet-main');
    const btnBackstory = document.getElementById('btn-sheet-middle');

    if (btnOverview) {
        btnOverview.addEventListener('click', () => {
            switchSheetTab('sheet-main');
        });
    }

    if (btnBackstory) {
        btnBackstory.addEventListener('click', () => {
            switchSheetTab('sheet-middle');
        });
    }
}

/* ==========================================
   4. DICE ROLLING & DYNAMIC STAT SYSTEM
   ========================================== */

function initDiceRoller() {
    const rollableElements = document.querySelectorAll('.rollable-text');
    const closeBtn = document.querySelector('.close-btn');

    rollableElements.forEach(elem => {
        elem.addEventListener('click', () => {
            const rollNotation = elem.getAttribute('data-roll') || '1d20';
            const rollLabel = elem.getAttribute('data-label') || 'Dice Roll';
            const statKey = elem.getAttribute('data-stat');

            executeRoll(rollNotation, rollLabel, statKey);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeRollModal);
    }
}

/**
 * Gets the current numerical modifier value for a specific stat (e.g. "STR") from the sheet.
 */
function getStatModifier(statKey) {
    if (!statKey) return 0;

    const modInput = document.querySelector(`.mod-input[data-ability="${statKey.toUpperCase()}"]`) 
                  || document.getElementById(`mod-${statKey.toLowerCase()}`);
    if (modInput && modInput.value) {
        const parsedVal = parseInt(modInput.value.replace('+', ''), 10);
        return isNaN(parsedVal) ? 0 : parsedVal;
    }

    return 0;
}

/**
 * Parses dice strings like "1d20", "2d6+2", adds the character stat modifier, and displays result.
 */
function executeRoll(notation, label, statKey = null) {
    let numDice = 1;
    let dieSides = 20;
    let baseModifier = 0;

    const match = notation.match(/^(\d+)d(\d+)(?:([+-]\d+))?$/i);
    if (match) {
        numDice = parseInt(match[1], 10);
        dieSides = parseInt(match[2], 10);
        baseModifier = match[3] ? parseInt(match[3], 10) : 0;
    } else if (/^[+-]\d+$/.test(notation)) {
        baseModifier = parseInt(notation, 10);
    }

    const statMod = getStatModifier(statKey);
    const totalModifier = baseModifier + statMod;

    let rolls = [];
    let diceTotal = 0;

    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * dieSides) + 1;
        rolls.push(roll);
        diceTotal += roll;
    }

    const grandTotal = diceTotal + totalModifier;
    const displayTitle = statKey ? `${label} (${statKey.toUpperCase()} ${statMod >= 0 ? '+' : ''}${statMod})` : label;

    showRollModal(displayTitle, rolls, totalModifier, grandTotal);
}

function showRollModal(title, rolls, modifier, total) {
    const modalBox = document.getElementById('dice-result-box');
    const titleElem = document.getElementById('roll-title');
    const detailsElem = document.querySelector('.roll-details');
    const totalElem = document.querySelector('.roll-total');

    if (!modalBox) return;

    if (titleElem) titleElem.textContent = title;
    
    let modString = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;
    if (detailsElem) {
        detailsElem.textContent = `Rolls: [${rolls.join(', ')}] ${modString}`;
    }
    
    if (totalElem) totalElem.textContent = total;

    modalBox.style.display = 'block';
}

function closeRollModal() {
    const modalBox = document.getElementById('dice-result-box');
    if (modalBox) {
        modalBox.style.display = 'none';
    }
}

/* ==========================================
   5. SKILL & ACTION INFO TOGGLES
   ========================================== */
function initSkillNoteToggles() {
    const infoButtons = document.querySelectorAll('.info-btn');

    infoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Toggle 'active' styling on the button
            btn.classList.toggle('active');

            // Find parent item (either attack <li> or skill <li>)
            const parent = btn.closest('li, .attack-item');
            if (parent) {
                const note = parent.querySelector('.skill-note');
                if (note) {
                    note.classList.toggle('show');
                }
            }
        });
    });
}
function toggleWard() {
    const wardContainer = document.getElementById('wardContainer');
    if (wardContainer) {
        wardContainer.classList.toggle('hidden-sheet');
        if (!wardContainer.classList.contains('hidden-sheet')) {
            wardContainer.style.display = 'block';
        } else {
            wardContainer.style.display = 'none';
        }
    }
}
