/* ==========================================
   1. NAVIGATION & PANEL TOGGLES
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Nav bar item clicks to toggle sub-panels
    const navLinks = document.querySelectorAll('.nav-item > a, .dropdown li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                togglePanel(targetId);
            }
        });
    });

    // Attach click events to sheet control buttons (Overview / Backstory)
    const btnMain = document.getElementById('btn-sheet-main');
    const btnMiddle = document.getElementById('btn-sheet-middle');

    if (btnMain) {
        btnMain.addEventListener('click', () => switchSheetPage('sheet-main'));
    }
    if (btnMiddle) {
        btnMiddle.addEventListener('click', () => switchSheetPage('sheet-middle'));
    }

    // Attach click events to rollable elements
    const rollables = document.querySelectorAll('.rollable-text');
    rollables.forEach(item => {
        item.addEventListener('click', () => {
            const rollFormula = item.getAttribute('data-roll') || item.innerText;
            const label = item.closest('.attack-item')?.querySelector('span')?.innerText || 'Dice Roll';
            executeRoll(label, rollFormula);
        });
    });

    // Close Modal Event
    const closeBtn = document.querySelector('#dice-result-box .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDiceModal);
    }
});

/**
 * Toggles a panel visible/hidden.
 * Specifically opens #characterContainer when its button is clicked.
 */
function togglePanel(panelId) {
    const targetPanel = document.getElementById(panelId);
    if (!targetPanel) return;

    // If opening characterContainer, display block; otherwise toggle
    if (targetPanel.style.display === 'none' || targetPanel.style.display === '') {
        targetPanel.style.display = 'block';
        targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        targetPanel.style.display = 'none';
    }
}

/**
 * Switches between character sheet sub-pages (Overview vs. Backstory)
 */
function switchSheetPage(pageId) {
    const pages = document.querySelectorAll('.sheet-page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
        activePage.style.display = 'block';
    }
}

/* ==========================================
   2. DICE ROLLER & MODAL POPUP
   ========================================== */

/**
 * Parses and executes standard D&D dice formulas (e.g., "1d20+5", "2d6+3")
 */
function executeRoll(title, formula) {
    const regex = /(\d+)d(\d+)(?:\+|-)?(\d+)?/i;
    const match = formula.match(regex);

    let total = 0;
    let detailText = '';

    if (match) {
        const numDice = parseInt(match[1]) || 1;
        const diceSides = parseInt(match[2]);
        const modifier = match[3] ? parseInt(match[3]) : 0;
        const rolls = [];

        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * diceSides) + 1;
            rolls.push(roll);
            total += roll;
        }

        total += modifier;
        
        const modString = modifier > 0 ? ` + ${modifier}` : (modifier < 0 ? ` - ${Math.abs(modifier)}` : '');
        detailText = `Rolls: [${rolls.join(', ')}]${modString}`;
    } else {
        // Fallback for flat numbers or unrecognized formulas
        total = Math.floor(Math.random() * 20) + 1;
        detailText = `Flat d20 Roll`;
    }

    showDiceModal(title, detailText, total);
}

/**
 * Displays the fixed bottom-right modal popup with roll details
 */
function showDiceModal(title, details, total) {
    const modal = document.getElementById('dice-result-box');
    const titleEl = document.getElementById('roll-title');
    const detailsEl = document.querySelector('.roll-details');
    const totalEl = document.querySelector('.roll-total');

    if (!modal) return;

    if (titleEl) titleEl.innerText = title;
    if (detailsEl) detailsEl.innerText = details;
    if (totalEl) totalEl.innerText = total;

    modal.style.display = 'block';
}

/**
 * Hides the dice result modal
 */
function closeDiceModal() {
    const modal = document.getElementById('dice-result-box');
    if (modal) {
        modal.style.display = 'none';
    }
}
