document.addEventListener('DOMContentLoaded', () => {
  const charSheetLink = document.getElementById('nav-char-sheet');
  const charSheetContainer = document.getElementById('character-sheet-container');
  const panelBtns = document.querySelectorAll('.nav-panel-btn');
  const panels = document.querySelectorAll('.panel');
  const diceBox = document.getElementById('dice-result-box');
  const closeDiceBtn = document.getElementById('close-dice-btn');

  // Toggle Character Sheet Visibility
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

  // Handle Sub-Header Panel Dropdowns
  panelBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);

      // Hide character sheet when opening lore/rules panels
      charSheetContainer.style.display = 'none';
      charSheetLink.classList.remove('active');

      // Close other active panels
      panels.forEach(p => {
        if (p !== targetPanel) p.classList.remove('active');
      });

      // Toggle current panel and active link status
      targetPanel.classList.toggle('active');
      btn.classList.toggle('active');
    });
  });

  // Close Dice Overlay Event Handler
  if (closeDiceBtn) {
    closeDiceBtn.addEventListener('click', () => {
      diceBox.style.display = 'none';
    });
  }
});
