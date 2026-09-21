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

function switchSheetTab(tabId) {
    const pages = document.querySelectorAll('.sheet-page');
    pages.forEach(page => page.classList.remove('active'));
    
    const activePage = document.getElementById(tabId);
    if (activePage) {
        activePage.classList.add('active');
    }
}
