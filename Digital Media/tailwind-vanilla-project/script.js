//#region 1. Explicit Toggle & Tab Functions

// Toggles the character sheet container open/closed with cyberpunk typing animations
function toggleCharacter() { 

    const charContainer = document.getElementById('characterContainer'); 

    if (!charContainer || charContainer.dataset.animating === "true") return; 

    // Determine if the sheet is currently hidden
    const infHidden = charContainer.classList.contains('hidden-sheet') ||  
                     charContainer.style.display === 'none' ||  
                     !charContainer.style.display; 

    if (infHidden) { 

        // OPENING SEQUENCE: Trigger typing banner and cascading reveal
        charContainer.dataset.animating = "true"; 

        charContainer.classList.remove('hidden-sheet', 'sheet-typing-closing'); 

        charContainer.style.display = 'block'; 

        const existingBanner = charContainer.querySelector('.code-typing-banner'); 

        if (existingBanner) existingBanner.remove(); 

        const banner = document.createElement('div'); 

        banner.className = 'code-typing-banner'; 

        banner.innerHTML = `<span class="banner-text"></span><span class="code-typing-cursor"></span>`; 

        charContainer.prepend(banner); 

        const bannerTextElem = banner.querySelector('.banner-text'); 

        const commandStr = 'EXECUTE: compile_character_sheet.sh --render-ui'; 

        const streamTargets = Array.from(charContainer.querySelectorAll(
            '.dnd-sketch-header, .sheet-controls, .ability-box, .dnd-box, .attack-item, .checkbox-list li'
        )); 

        streamTargets.forEach(elem => { 

            elem.classList.add('code-stream-item'); 

            elem.classList.remove('typed-in', 'untyping', 'typing-glow'); 

        }); 

        charContainer.classList.add('sheet-typing-active'); 

        let charIndex = 0; 

        const typeInterval = setInterval(() => { 

            if (charIndex < commandStr.length) { 

                if (bannerTextElem) bannerTextElem.textContent += commandStr.charAt(charIndex); 

                charIndex++; 

            } else { 

                clearInterval(typeInterval); 

                streamTargets.forEach((elem, index) => { 

                    setTimeout(() => { 

                        elem.classList.add('typing-glow', 'typed-in'); 

                        setTimeout(() => elem.classList.remove('typing-glow'), 200); 

                        if (index === streamTargets.length - 1) { 

                            setTimeout(() => { 

                                banner.style.transition = 'opacity 0.3s ease'; 

                                banner.style.opacity = '0'; 

                                setTimeout(() => banner.remove(), 300); 

                                charContainer.classList.remove('sheet-typing-active'); 

                                charContainer.dataset.animating = "false"; 

                            }, 300); 

                        } 

                    }, index * 25); 

                }); 

            } 

        }, 10); 

    } else { 

        // CLOSING SEQUENCE: Trigger reverse terminal animation and hide sheet
        charContainer.dataset.animating = "true"; 

        charContainer.classList.remove('sheet-typing-active'); 

        charContainer.classList.add('sheet-typing-closing'); 

        const existingBanner = charContainer.querySelector('.code-typing-banner'); 

        if (existingBanner) existingBanner.remove(); 

        const banner = document.createElement('div'); 

        banner.className = 'code-typing-banner'; 

        banner.innerHTML = `<span class="banner-text"></span><span class="code-typing-cursor"></span>`; 

        charContainer.prepend(banner); 

        const bannerTextElem = banner.querySelector('.banner-text'); 

        const closeCommandStr = 'TERMINATE: purge_character_data.sh --unmount'; 

        const streamTargets = Array.from(charContainer.querySelectorAll('.code-stream-item')).reverse(); 

        let charIndex = 0; 

        const closeTypeInterval = setInterval(() => { 

            if (charIndex < closeCommandStr.length) { 

                if (bannerTextElem) bannerTextElem.textContent += closeCommandStr.charAt(charIndex); 

                charIndex++; 

            } else { 

                clearInterval(closeTypeInterval); 

                streamTargets.forEach((elem, index) => { 

                    setTimeout(() => { 

                        elem.classList.add('typing-glow', 'untyping'); 

                        elem.classList.remove('typed-in'); 

                        setTimeout(() => elem.classList.remove('typing-glow'), 150); 

                        if (index === streamTargets.length - 1) { 

                            setTimeout(() => { 

                                banner.style.transition = 'opacity 0.2s ease'; 

                                banner.style.opacity = '0'; 

                                setTimeout(() => { 

                                    banner.remove(); 

                                    charContainer.classList.add('hidden-sheet'); 

                                    charContainer.style.display = 'none'; 

                                    charContainer.classList.remove('sheet-typing-closing'); 

                                    streamTargets.forEach(el => el.classList.remove('untyping')); 

                                    charContainer.dataset.animating = "false"; 

                                }, 200); 

                            }, 250); 

                        } 

                    }, index * 20); 

                }); 

            } 

        }, 8); 

    } 

} 

// Toggles the security protocols / ward panel container
function toggleWard() { 

    const wardContainer = document.getElementById('wardContainer'); 

    if (wardContainer) toggleBookJacketPanel(wardContainer); 

} 

// Toggles the personal book jacket container
function toggleMe() { 

    const meContainer = document.getElementById('meContainer'); 

    if (meContainer) toggleBookJacketPanel(meContainer); 

} 

// Handles book jacket panel 3D sliding opening and closing transitions
function toggleBookJacketPanel(panelElem) { 

    if (!panelElem) return; 

    if (panelElem.parentElement && !panelElem.parentElement.classList.contains('book-jacket-container')) { 

        panelElem.parentElement.classList.add('book-jacket-container'); 

    } 

    panelElem.classList.add('book-jacket-panel'); 

    const isOpen = panelElem.style.display === 'block' && !panelElem.classList.contains('hidden-sheet'); 

    if (!isOpen) { 

        panelElem.classList.remove('hidden-sheet', 'book-closing'); 

        panelElem.style.display = 'block'; 

        panelElem.classList.add('book-opening'); 

    } else { 

        panelElem.classList.remove('book-opening'); 

        panelElem.classList.add('book-closing'); 

        panelElem.addEventListener('animationend', function handleClose() { 

            if (panelElem.classList.contains('book-closing')) { 

                panelElem.classList.add('hidden-sheet'); 

                panelElem.style.display = 'none'; 

                panelElem.classList.remove('book-closing'); 

            } 

            panelElem.removeEventListener('animationend', handleClose); 

        }); 

    } 

} 

// Debug logging helper for requested panels
function showPanel(panelName) { 

    console.log(`[CYBER-LOG] Panel requested: ${panelName}`); 

} 

// Handles active tab switching inside the character sheet terminal
function switchSheetTab(tabId) { 

    const pages = document.querySelectorAll('.sheet-page'); 

    pages.forEach(page => { 

        page.classList.remove('active'); 

        page.style.animation = 'none'; 

        void page.offsetHeight; 

    }); 
    
    const activePage = document.getElementById(tabId); 

    if (activePage) { 

        if (activePage.parentElement && !activePage.parentElement.classList.contains('sheet-page-container')) { 

            activePage.parentElement.classList.add('sheet-page-container'); 

        } 

        activePage.classList.add('active'); 

        activePage.style.animation = 'pageTurnFlip 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards'; 

    } 

} 

//#endregion


//#region 2. DOM Content Loaded & Initialization

document.addEventListener('DOMContentLoaded', () => { 

    try { 

        initNavigation(); 

        initSheetControls(); 

        initDiceRoller(); 

        initSkillNoteToggles(); 

        console.log("[CYBER-DICE] Initialization completed successfully."); 

    } catch (error) { 

        console.error("[CYBER-DICE] Initialization error:", error); 

    } 

}); 

// Binds navigation links to sheet toggles
function initNavigation() { 

    const navLinks = document.querySelectorAll('[data-target="characterContainer"]'); 

    navLinks.forEach(link => { 

        link.addEventListener('click', (e) => { 

            e.preventDefault(); 

            toggleCharacter(); 

        }); 

    }); 

} 

// Binds sheet control buttons to tab switcher functions
function initSheetControls() { 

    const btnOverview = document.getElementById('btn-sheet-main'); 

    const btnBackstory = document.getElementById('btn-sheet-middle'); 

    if (btnOverview) btnOverview.addEventListener('click', () => switchSheetTab('sheet-main')); 

    if (btnBackstory) btnBackstory.addEventListener('click', () => switchSheetTab('sheet-middle')); 

} 
//#endregion


//#region 3. Three.js 3D Cyberpunk Multi-Die Engine

let scene = null; 

let camera = null; 

let renderer = null; 

let diceGroup = null; 

let diceMesh = null; 

let wireframeMesh = null; 

let particleSystem = null; 

let isRolling = false; 

let rollStartTime = 0; 

let rollDuration = 3000; 

let tumbleDuration = 2200; 

let randomSpinAxis = null; 

let tumbleQuat = null; 

let startQuaternion = null; 

let targetQuaternion = null; 

let currentResult = 20; 

let currentDieSides = 20; 

let currentNotation = '1d20'; 

let currentStatKey = null; 

let currentLabel = 'DICE ROLL'; 

let isDragging = false; 

let previousMousePosition = { x: 0, y: 0 }; 

let autoRotate = true; 

let faceData = []; 

// Neon cyberpunk color scheme configurations for Three.js materials
const purpleTheme = { 
    primary: 0x120324, 
    wireframe: 0xa855f7, 
    glow: 0xc084fc, 
    particles: 0xa855f7, 
    light1: 0xa855f7, 
    light2: 0xe879f9 
}; 

// Initializes or resets the Three.js 3D dice rendering scene and environment
function initThreeDice(containerId = 'threeD20CanvasContainer', dieSides = 20) { 

    if (typeof THREE === 'undefined') { 

        console.warn("[CYBER-DICE] Three.js library not detected in global scope."); 

        return; 

    } 
    
    if (!randomSpinAxis) randomSpinAxis = new THREE.Vector3(1, 1, 1).normalize(); 

    if (!tumbleQuat) tumbleQuat = new THREE.Quaternion(); 

    if (!startQuaternion) startQuaternion = new THREE.Quaternion(); 

    if (!targetQuaternion) targetQuaternion = new THREE.Quaternion(); 

    const container = document.getElementById(containerId) || document.getElementById('canvas-container'); 

    if (!container) return; 

    while (container.firstChild) { 

        container.removeChild(container.firstChild); 

    } 

    const width = container.clientWidth || 280; 

    const height = container.clientHeight || 220; 

    scene = new THREE.Scene(); 

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000); 

    camera.position.set(0, 0, dieSides === 4 ? 5.2 : (dieSides === 6 ? 4.5 : (dieSides === 8 ? 5.2 : (dieSides === 10 ? 5.2 : 5.5)))); 

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 

    renderer.setSize(width, height); 

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 

    renderer.domElement.className = 'dice-canvas-element'; 

    container.appendChild(renderer.domElement); 

    scene.add(new THREE.AmbientLight(0xffffff, 0.8)); 

    const purpleLight = new THREE.PointLight(purpleTheme.light1, 2.5, 20); 

    purpleLight.position.set(4, 4, 4); 

    scene.add(purpleLight); 

    const fuchsiaLight = new THREE.PointLight(purpleTheme.light2, 2.0, 20); 

    fuchsiaLight.position.set(-4, -4, -4); 

    scene.add(fuchsiaLight); 

    diceGroup = new THREE.Group(); 

    scene.add(diceGroup); 

    createParticles(); 
    
    if (dieSides === 4) buildCyberD4(); 

    else if (dieSides === 6) buildCyberD6(); 

    else if (dieSides === 8) buildCyberD8(); 

    else if (dieSides === 10) buildCyberD10(); 

    else buildCyberD20(); 

    setupCanvasInteractions(container); 

    window.addEventListener('resize', onDiceWindowResize); 

    animate(0); 

} 

// Dynamically generates neon-glowing number textures using HTML5 Canvas
function createNeonNumberTexture(number) { 

    const canvas = document.createElement('canvas'); 

    canvas.width = 512; 

    canvas.height = 512; 

    const ctx = canvas.getContext('2d'); 

    ctx.clearRect(0, 0, 512, 512); 

    ctx.shadowColor = '#c084fc'; 

    ctx.shadowBlur = 35; 

    ctx.fillStyle = '#e879f9'; 

    ctx.font = '900 240px "Orbitron", "Cinzel", sans-serif'; 

    ctx.textAlign = 'center'; 

    ctx.textBaseline = 'middle'; 

    ctx.fillText(number.toString(), 256, 260); 

    if (number === 6 || number === 9) { 

        ctx.fillStyle = '#f0abfc'; 

        ctx.shadowColor = '#f0abfc'; 

        ctx.shadowBlur = 20; 

        ctx.beginPath(); 

        ctx.arc(256, 420, 20, 0, Math.PI * 2); 

        ctx.fill(); 

    } 

    const texture = new THREE.CanvasTexture(canvas); 

    texture.needsUpdate = true; 

    return texture; 

} 

// Builds a 4-sided tetrahedron die (D4)
function buildCyberD4() { 

    while (diceGroup.children.length > 0) diceGroup.remove(diceGroup.children[0]); 

    const baseGeo = new THREE.TetrahedronGeometry(2.0, 0); 

    const diceMat = new THREE.MeshStandardMaterial({ color: purpleTheme.primary, roughness: 0.2, metalness: 0.85 }); 

    diceMesh = new THREE.Mesh(baseGeo, diceMat); 

    diceGroup.add(diceMesh); 

    const wireGeo = new THREE.WireframeGeometry(baseGeo); 

    const wireMat = new THREE.LineBasicMaterial({ color: purpleTheme.wireframe, linewidth: 2, transparent: true, opacity: 0.95 }); 

    wireframeMesh = new THREE.LineSegments(wireGeo, wireMat); 

    diceGroup.add(wireframeMesh); 

    const posAttr = baseGeo.attributes.position; 

    const faceCount = baseGeo.index ? baseGeo.index.count / 3 : posAttr.count / 3; 

    for (let i = 0; i < faceCount; i++) { 

        let vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3(); 

        if (baseGeo.index) { 

            vA.fromBufferAttribute(posAttr, baseGeo.index.getX(i * 3)); 

            vB.fromBufferAttribute(posAttr, baseGeo.index.getY(i * 3 + 1)); 

            vC.fromBufferAttribute(posAttr, baseGeo.index.getZ(i * 3 + 2)); 

        } else { 

            vA.fromBufferAttribute(posAttr, i * 3); 

            vB.fromBufferAttribute(posAttr, i * 3 + 1); 

            vC.fromBufferAttribute(posAttr, i * 3 + 2); 

        } 

        const centroid = new THREE.Vector3().addVectors(vA, vB).add(vC).divideScalar(3); 

        const normal = new THREE.Vector3().crossVectors(new THREE.Vector3().subVectors(vB, vA), new THREE.Vector3().subVectors(vC, vA)).normalize(); 

        const number = i + 1; 

        const planeGeo = new THREE.PlaneGeometry(1.1, 1.1); 

        const planeMat = new THREE.MeshBasicMaterial({ map: createNeonNumberTexture(number), transparent: true, depthWrite: false }); 

        const numMesh = new THREE.Mesh(planeGeo, planeMat); 

        const planePos = centroid.clone().addScaledVector(normal, 0.05); 

        numMesh.position.copy(planePos); 

        numMesh.lookAt(planePos.clone().add(normal)); 

        diceGroup.add(numMesh); 

        faceData.push({ number, normal: normal.clone(), centroid: centroid.clone() }); 

    } 

} 

// Builds a 6-sided cube die (D6)
function buildCyberD6() { 

    while (diceGroup.children.length > 0) diceGroup.remove(diceGroup.children[0]); 

    const baseGeo = new THREE.BoxGeometry(2.0, 2.0, 2.0); 

    const diceMat = new THREE.MeshStandardMaterial({ color: purpleTheme.primary, roughness: 0.2, metalness: 0.85 }); 

    diceMesh = new THREE.Mesh(baseGeo, diceMat); 

    diceGroup.add(diceMesh); 

    const wireGeo = new THREE.WireframeGeometry(baseGeo); 

    const wireMat = new THREE.LineBasicMaterial({ color: purpleTheme.wireframe, linewidth: 2, transparent: true, opacity: 0.95 }); 

    wireframeMesh = new THREE.LineSegments(wireGeo, wireMat); 

    diceGroup.add(wireframeMesh); 

    const d6Faces = [ 
        { number: 1, normal: new THREE.Vector3(0, 0, 1), pos: new THREE.Vector3(0, 0, 1.02), rot: new THREE.Euler(0, 0, 0) }, 
        { number: 6, normal: new THREE.Vector3(0, 0, -1), pos: new THREE.Vector3(0, 0, -1.02), rot: new THREE.Euler(0, Math.PI, 0) }, 
        { number: 2, normal: new THREE.Vector3(1, 0, 0), pos: new THREE.Vector3(1.02, 0, 0), rot: new THREE.Euler(0, Math.PI / 2, 0) }, 
        { number: 5, normal: new THREE.Vector3(-1, 0, 0), pos: new THREE.Vector3(-1.02, 0, 0), rot: new THREE.Euler(0, -Math.PI / 2, 0) }, 
        { number: 3, normal: new THREE.Vector3(0, 1, 0), pos: new THREE.Vector3(0, 1.02, 0), rot: new THREE.Euler(-Math.PI / 2, 0, 0) }, 
        { number: 4, normal: new THREE.Vector3(0, -1, 0), pos: new THREE.Vector3(0, -1.02, 0), rot: new THREE.Euler(Math.PI / 2, 0, 0) } 
    ]; 

    d6Faces.forEach(f => { 

        const planeGeo = new THREE.PlaneGeometry(1.4, 1.4); 

        const planeMat = new THREE.MeshBasicMaterial({ map: createNeonNumberTexture(f.number), transparent: true, depthWrite: false }); 

        const numMesh = new THREE.Mesh(planeGeo, planeMat); 

        numMesh.position.copy(f.pos); 

        numMesh.rotation.copy(f.rot); 

        diceGroup.add(numMesh); 

        faceData.push({ number: f.number, normal: f.normal.clone(), centroid: f.pos.clone() }); 

    }); 

} 

// Builds an 8-sided octahedron die (D8)
function buildCyberD8() { 

    while (diceGroup.children.length > 0) diceGroup.remove(diceGroup.children[0]); 

    const baseGeo = new THREE.OctahedronGeometry(1.8, 0); 

    const diceMat = new THREE.MeshStandardMaterial({ color: purpleTheme.primary, roughness: 0.2, metalness: 0.85 }); 

    diceMesh = new THREE.Mesh(baseGeo, diceMat); 

    diceGroup.add(diceMesh); 

    const wireGeo = new THREE.WireframeGeometry(baseGeo); 

    const wireMat = new THREE.LineBasicMaterial({ color: purpleTheme.wireframe, linewidth: 2, transparent: true, opacity: 0.95 }); 

    wireframeMesh = new THREE.LineSegments(wireGeo, wireMat); 

    diceGroup.add(wireframeMesh); 

    const posAttr = baseGeo.attributes.position; 

    const faceCount = baseGeo.index ? baseGeo.index.count / 3 : posAttr.count / 3; 

    for (let i = 0; i < faceCount; i++) { 

        let vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3(); 

        if (baseGeo.index) { 

            vA.fromBufferAttribute(posAttr, baseGeo.index.getX(i * 3)); 

            vB.fromBufferAttribute(posAttr, baseGeo.index.getY(i * 3 + 1)); 

            vC.fromBufferAttribute(posAttr, baseGeo.index.getZ(i * 3 + 2)); 

        } else { 

            vA.fromBufferAttribute(posAttr, i * 3); 

            vB.fromBufferAttribute(posAttr, i * 3 + 1); 

            vC.fromBufferAttribute(posAttr, i * 3 + 2); 

        } 

        const centroid = new THREE.Vector3().addVectors(vA, vB).add(vC).divideScalar(3); 

        const normal = new THREE.Vector3().crossVectors(new THREE.Vector3().subVectors(vB, vA), new THREE.Vector3().subVectors(vC, vA)).normalize(); 

        const number = i + 1; 

        const planeGeo = new THREE.PlaneGeometry(1.1, 1.1); 

        const planeMat = new THREE.MeshBasicMaterial({ map: createNeonNumberTexture(number), transparent: true, depthWrite: false }); 

        const numMesh = new THREE.Mesh(planeGeo, planeMat); 

        const planePos = centroid.clone().addScaledVector(normal, 0.05); 

        numMesh.position.copy(planePos); 

        numMesh.lookAt(planePos.clone().add(normal)); 

        diceGroup.add(numMesh); 

        faceData.push({ number, normal: normal.clone(), centroid: centroid.clone() }); 

    } 

} 

// Builds a 10-sided pentagonal trapezohedron die (D10)
function buildCyberD10() { 

    while (diceGroup.children.length > 0) diceGroup.remove(diceGroup.children[0]); 

    const d10GroupGeo = new THREE.BufferGeometry(); 

    const radius = 1.8, height = 1.6; 

    const vertices = [0, height, 0, 0, -height, 0]; 

    for (let i = 0; i < 5; i++) { 

        const angleUpper = (i * Math.PI * 2) / 5; 

        vertices.push(Math.cos(angleUpper) * radius, 0.4, Math.sin(angleUpper) * radius); 

        const angleLower = ((i + 0.5) * Math.PI * 2) / 5; 

        vertices.push(Math.cos(angleLower) * radius, -0.4, Math.sin(angleLower) * radius); 

    } 

    const d10Faces = []; 

    for (let i = 0; i < 5; i++) { 

        const u1 = 2 + (i * 2), l1 = 3 + (i * 2); 

        const u2 = 2 + (((i + 1) % 5) * 2), l2 = 3 + (((i + 1) % 5) * 2); 

        d10Faces.push({ num: (i * 2) + 1, pts: [0, u1, l1, u2] }); 

        d10Faces.push({ num: (i * 2) + 2, pts: [1, l1, u2, l2] }); 

    } 

    const posFloat = []; 

    d10Faces.forEach((f) => { 

        const p0 = new THREE.Vector3(vertices[f.pts[0]*3], vertices[f.pts[0]*3+1], vertices[f.pts[0]*3+2]); 

        const p1 = new THREE.Vector3(vertices[f.pts[1]*3], vertices[f.pts[1]*3+1], vertices[f.pts[1]*3+2]); 

        const p2 = new THREE.Vector3(vertices[f.pts[2]*3], vertices[f.pts[2]*3+1], vertices[f.pts[2]*3+2]); 

        const p3 = new THREE.Vector3(vertices[f.pts[3]*3], vertices[f.pts[3]*3+1], vertices[f.pts[3]*3+2]); 

        posFloat.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z, p2.x, p2.y, p2.z); 

        posFloat.push(p0.x, p0.y, p0.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z); 

        const centroid = new THREE.Vector3().add(p0).add(p1).add(p2).add(p3).divideScalar(4); 

        const normal = new THREE.Vector3().crossVectors(new THREE.Vector3().subVectors(p1, p0), new THREE.Vector3().subVectors(p2, p0)).normalize(); 

        const planeGeo = new THREE.PlaneGeometry(1.1, 1.1); 

        const planeMat = new THREE.MeshBasicMaterial({ map: createNeonNumberTexture(f.num), transparent: true, depthWrite: false }); 

        const numMesh = new THREE.Mesh(planeGeo, planeMat); 

        const planePos = centroid.clone().addScaledVector(normal, 0.05); 

        numMesh.position.copy(planePos); 

        numMesh.lookAt(planePos.clone().add(normal)); 

        diceGroup.add(numMesh); 

        faceData.push({ number: f.num, normal: normal.clone(), centroid: centroid.clone() }); 

    }); 

    d10GroupGeo.setAttribute('position', new THREE.Float32BufferAttribute(posFloat, 3)); 

    d10GroupGeo.computeVertexNormals(); 

    const diceMat = new THREE.MeshStandardMaterial({ color: purpleTheme.primary, roughness: 0.2, metalness: 0.85, side: THREE.DoubleSide }); 

    diceMesh = new THREE.Mesh(d10GroupGeo, diceMat); 

    diceGroup.add(diceMesh); 

    const wireGeo = new THREE.WireframeGeometry(d10GroupGeo); 

    const wireMat = new THREE.LineBasicMaterial({ color: purpleTheme.wireframe, linewidth: 2, transparent: true, opacity: 0.95 }); 

    wireframeMesh = new THREE.LineSegments(wireGeo, wireMat); 

    diceGroup.add(wireframeMesh); 

} 

// Builds a 20-sided icosahedron die (D20)
function buildCyberD20() { 

    while (diceGroup.children.length > 0) diceGroup.remove(diceGroup.children[0]); 

    const baseGeo = new THREE.IcosahedronGeometry(1.8, 0); 

    const posAttr = baseGeo.attributes.position; 

    const diceMat = new THREE.MeshStandardMaterial({ color: purpleTheme.primary, roughness: 0.2, metalness: 0.85 }); 

    diceMesh = new THREE.Mesh(baseGeo, diceMat); 

    diceGroup.add(diceMesh); 

    const wireGeo = new THREE.WireframeGeometry(baseGeo); 

    const wireMat = new THREE.LineBasicMaterial({ color: purpleTheme.wireframe, linewidth: 2, transparent: true, opacity: 0.95 }); 

    wireframeMesh = new THREE.LineSegments(wireGeo, wireMat); 

    diceGroup.add(wireframeMesh); 

    const faceCount = baseGeo.index ? baseGeo.index.count / 3 : posAttr.count / 3; 

    for (let i = 0; i < faceCount; i++) { 

        let vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3(); 

        if (baseGeo.index) { 

            vA.fromBufferAttribute(posAttr, baseGeo.index.getX(i * 3)); 

            vB.fromBufferAttribute(posAttr, baseGeo.index.getY(i * 3 + 1)); 

            vC.fromBufferAttribute(posAttr, baseGeo.index.getZ(i * 3 + 2)); 

        } else { 

            vA.fromBufferAttribute(posAttr, i * 3); 

            vB.fromBufferAttribute(posAttr, i * 3 + 1); 

            vC.fromBufferAttribute(posAttr, i * 3 + 2); 

        } 

        const centroid = new THREE.Vector3().addVectors(vA, vB).add(vC).divideScalar(3); 

        const normal = new THREE.Vector3().crossVectors(new THREE.Vector3().subVectors(vB, vA), new THREE.Vector3().subVectors(vC, vA)).normalize(); 

        const number = i + 1; 

        const planeGeo = new THREE.PlaneGeometry(1.35, 1.35); 

        const planeMat = new THREE.MeshBasicMaterial({ map: createNeonNumberTexture(number), transparent: true, depthWrite: false }); 

        const numMesh = new THREE.Mesh(planeGeo, planeMat); 

        const planePos = centroid.clone().addScaledVector(normal, 0.04); 

        numMesh.position.copy(planePos); 

        numMesh.lookAt(planePos.clone().add(normal)); 

        diceGroup.add(numMesh); 

        faceData.push({ number, normal: normal.clone(), centroid: centroid.clone() }); 

    } 

} 

// Creates floating cyber background particles
function createParticles() { 

    const count = 150; 

    const pGeo = new THREE.BufferGeometry(); 

    const positions = new Float32Array(count * 3); 

    for (let i = 0; i < count * 3; i += 3) { 

        positions[i] = (Math.random() - 0.5) * 16; 

        positions[i + 1] = (Math.random() - 0.5) * 16; 

        positions[i + 2] = (Math.random() - 0.5) * 16; 

    } 

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3)); 

    const pMat = new THREE.PointsMaterial({ color: purpleTheme.particles, size: 0.06, transparent: true, opacity: 0.75 }); 

    particleSystem = new THREE.Points(pGeo, pMat); 

    scene.add(particleSystem); 

} 

// Sets up mouse/touch dragging listeners to rotate the 3D die manually
function setupCanvasInteractions(container) { 

    if (!container) return; 

    container.addEventListener('mousedown', (e) => { 

        isDragging = true; 

        autoRotate = false; 

        previousMousePosition = { x: e.clientX, y: e.clientY }; 

    }); 

    window.addEventListener('mousemove', (e) => { 

        if (!isDragging || !diceGroup) return; 

        const deltaX = e.clientX - previousMousePosition.x; 

        const deltaY = e.clientY - previousMousePosition.y; 

        diceGroup.rotation.y += deltaX * 0.008; 

        diceGroup.rotation.x += deltaY * 0.008; 

        previousMousePosition = { x: e.clientX, y: e.clientY }; 

    }); 

    window.addEventListener('mouseup', () => { 

        isDragging = false; 

        autoRotate = false; 

    }); 

} 

// Calculates the target quaternion orientation to face a specific die outcome toward the camera
function computeQuaternionForFace(faceIndex) { 

    const face = faceData[faceIndex]; 

    if (!face || typeof THREE === 'undefined') return new THREE.Quaternion(); 

    const targetVector = new THREE.Vector3(0, 0, 1); 

    const q = new THREE.Quaternion(); 

    q.setFromUnitVectors(face.normal, targetVector); 

    const divFactor = currentDieSides === 4 ? 3 : (currentDieSides === 6 ? 4 : (currentDieSides === 8 ? 3 : (currentDieSides === 10 ? 2 : 3))); 

    const randomZRot = new THREE.Quaternion(); 

    randomZRot.setFromAxisAngle(targetVector, (Math.floor(Math.random() * divFactor) * (Math.PI * 2 / divFactor))); 

    q.premultiply(randomZRot); 

    return q; 

} 

// Continuous requestAnimationFrame render loop for the 3D scene and physics animations
function animate(currentTime) { 

    requestAnimationFrame(animate); 

    if (particleSystem) particleSystem.rotation.y += 0.001; 

    if (isRolling && diceGroup) { 

        const elapsed = currentTime - rollStartTime; 

        const totalProgress = Math.min(elapsed / rollDuration, 1); 

        if (elapsed < tumbleDuration) { 

            const tumbleProgress = elapsed / tumbleDuration; 

            const speedMultiplier = (1 - Math.pow(tumbleProgress, 2)) * 3 + 6; 
            
            randomSpinAxis.x += (Math.random() - 0.5) * 0.1; 

            randomSpinAxis.y += (Math.random() - 0.5) * 0.1; 

            randomSpinAxis.z += (Math.random() - 0.5) * 0.1; 

            randomSpinAxis.normalize(); 

            const stepQuat = new THREE.Quaternion().setFromAxisAngle(randomSpinAxis, 0.016 * speedMultiplier); 

            diceGroup.quaternion.multiply(stepQuat); 

            tumbleQuat.copy(diceGroup.quaternion); 

        } else { 

            const alignProgress = (elapsed - tumbleDuration) / (rollDuration - tumbleDuration); 

            const easeOut = 1 - Math.pow(1 - alignProgress, 3); 

            diceGroup.quaternion.slerpQuaternions(tumbleQuat, targetQuaternion, easeOut); 

        } 

        if (totalProgress >= 1) { 

            diceGroup.quaternion.copy(targetQuaternion); 

            finishRoll(); 

        } 

    } else if (autoRotate && diceGroup) { 

        diceGroup.rotation.y += 0.005; 

        diceGroup.rotation.x += 0.002; 

    } 

    if (renderer && scene && camera) renderer.render(scene, camera); 

} 

// Window resize handler to scale the 3D canvas correctly
function onDiceWindowResize() { 

    const container = document.getElementById('threeD20CanvasContainer') || document.getElementById('canvas-container'); 

    if (!container || !renderer || !camera) return; 

    const width = container.clientWidth || 280; 

    const height = container.clientHeight || 220; 

    camera.aspect = width / height; 

    camera.updateProjectionMatrix(); 

    renderer.setSize(width, height); 

} 

//#endregion


//#region 4. Dice Rolling Logic & Modifier Math

// Initializes click handlers for rollable text elements across the sheet
function initDiceRoller() { 

    const rollableElements = document.querySelectorAll('.rollable-text'); 

    const closeBtn = document.querySelector('.close-btn'); 

    const reRollBtn = document.getElementById('roll-btn'); 

    rollableElements.forEach(elem => { 

        elem.addEventListener('click', (e) => { 

            e.stopPropagation(); 

            const label = elem.getAttribute('data-label') || elem.innerText.trim(); 

            const rollNotation = elem.getAttribute('data-roll') || '1d20'; 

            const statKey = elem.getAttribute('data-stat') || null; 

            const titleElem = document.getElementById('roll-title'); 

            if (titleElem) titleElem.innerText = `CHECK: ${label.toUpperCase()} [${rollNotation}]`; 

            executeRoll(rollNotation, label, statKey); 

        }); 

    }); 

    if (closeBtn) closeBtn.addEventListener('click', closeRollModal); 

    if (reRollBtn) { 

        reRollBtn.addEventListener('click', (e) => { 

            e.stopPropagation(); 

            executeRoll(currentNotation, currentLabel, currentStatKey); 

        }); 

    } 

} 

// Retrieves character attribute modifier values from DOM inputs
function getStatModifier(statKey) { 

    if (!statKey) return 0; 

    const modInput = document.querySelector(`.mod-input[data-ability="${statKey.toUpperCase()}"]`) || document.getElementById(`mod-${statKey.toLowerCase()}`); 

    if (modInput && 'value' in modInput && typeof modInput.value === 'string') { 

        const parsedVal = parseInt(modInput.value.replace('+', ''), 10); 

        return isNaN(parsedVal) ? 0 : parsedVal; 

    } 

    return 0; 

} 

// Parses dice notation strings (e.g., "1d20+2" or "+3") into structured parameters
function parseNotation(notation) { 

    let numDice = 1, dieSides = 20, baseModifier = 0; 

    const match = notation.match(/^(\d+)d(\d+)(?:([+-]\d+))?$/i); 

    if (match) { 

        numDice = parseInt(match[1], 10); 

        dieSides = parseInt(match[2], 10); 

        baseModifier = match[3] ? parseInt(match[3], 10) : 0; 

    } else if (/^[+-]\d+$/.test(notation)) { 

        baseModifier = parseInt(notation, 10); 

    } 

    return { numDice, dieSides, baseModifier }; 

} 

// Triggers the complete dice rolling animation and result calculation sequence
function executeRoll(notation = '1d20', label = 'DICE ROLL', statKey = null) { 

    currentNotation = notation; 

    currentLabel = label; 

    currentStatKey = statKey; 

    const parsed = parseNotation(notation); 

    currentDieSides = parsed.dieSides; 

    const modalBox = document.getElementById('dice-result-box'); 

    if (modalBox) { 

        modalBox.style.display = 'block'; 

        modalBox.classList.remove('hidden', 'dice-shaking'); 

        void modalBox.offsetWidth; 

        modalBox.classList.add('dice-shaking'); 

    } 

    initThreeDice('threeD20CanvasContainer', currentDieSides); 

    isRolling = true; 

    autoRotate = false; 

    if (diceGroup) { 

        diceGroup.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2); 

        startQuaternion.copy(diceGroup.quaternion); 

    } 

    const faceIndex = Math.floor(Math.random() * currentDieSides); 

    const rolledFace = faceData[faceIndex]; 

    currentResult = rolledFace ? rolledFace.number : (Math.floor(Math.random() * currentDieSides) + 1); 

    if (typeof THREE !== 'undefined') { 

        randomSpinAxis = new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2).normalize(); 

    } 

    targetQuaternion = computeQuaternionForFace(faceIndex); 

    rollStartTime = performance.now(); 

    const overlay = document.getElementById('result-overlay'); 

    if (overlay) { 

        overlay.classList.remove('opacity-100', 'scale-100'); 

        overlay.classList.add('opacity-0', 'scale-75'); 

    } 

    playCyberRollSound(); 

} 

// Finalizes the roll outcome, calculates modifiers, and displays score HUD
function finishRoll() { 

    isRolling = false; 

    autoRotate = false; 

    const modalBox = document.getElementById('dice-result-box'); 

    if (modalBox) modalBox.classList.remove('dice-shaking'); 

    const parsed = parseNotation(currentNotation); 

    const statMod = getStatModifier(currentStatKey); 

    const totalMod = parsed.baseModifier + statMod; 

    const grandTotal = currentResult + totalMod; 

    const overlayNumber = document.getElementById('overlay-number') || document.querySelector('.roll-total'); 

    const resultSubtitle = document.getElementById('result-subtitle'); 

    const rollDetailsText = document.getElementById('roll-details-text') || document.querySelector('.roll-details'); 

    const modStr = totalMod >= 0 ? `+ ${totalMod}` : `- ${Math.abs(totalMod)}`; 

    if (rollDetailsText) rollDetailsText.innerText = `Raw: ${currentResult} (${modStr} Mod)`; 

    if (overlayNumber) overlayNumber.innerText = grandTotal; 

    if (resultSubtitle) { 

        if (currentDieSides === 20 && currentResult === 20) { 

            resultSubtitle.innerText = '⚡ CRITICAL OVERDRIVE! ⚡'; 

            resultSubtitle.className = 'cyber-font text-[10px] uppercase tracking-widest text-amber-400 font-bold animate-pulse'; 

        } else if (currentResult === 1) { 

            resultSubtitle.innerText = '⚠️ CRITICAL SYSTEM FAILURE! ⚠️'; 

            resultSubtitle.className = 'cyber-font text-[10px] uppercase tracking-widest text-rose-500 font-bold animate-pulse'; 

        } else { 

            resultSubtitle.innerText = 'DICE ROLL COMPLETED'; 

            resultSubtitle.className = 'cyber-font text-[10px] uppercase tracking-widest text-purple-400 font-bold'; 

        } 

    } 

    let resType = 'normal'; 

    if (currentDieSides === 20 && currentResult === 20) resType = 'crit'; 

    else if (currentResult === 1) resType = 'fail'; 

    if (typeof recordRollToLog === 'function') { 

        recordRollToLog(currentNotation, currentLabel, currentStatKey, currentResult, totalMod, grandTotal, resType); 

    } 

    const overlay = document.getElementById('result-overlay'); 

    if (overlay) { 

        overlay.classList.remove('opacity-0', 'scale-75'); 

        overlay.classList.add('opacity-100', 'scale-100'); 

    } 

} 

// Generates synthetic cyberpunk roll audio feedback using the Web Audio API
function playCyberRollSound() { 

    try { 

        const AudioContext = window.AudioContext || window.webkitAudioContext; 

        if (!AudioContext) return; 

        const ctx = new AudioContext(); 

        const osc = ctx.createOscillator(); 

        const gain = ctx.createGain(); 

        osc.type = 'sawtooth'; 

        osc.frequency.setValueAtTime(350, ctx.currentTime); 

        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 3.0); 

        gain.gain.setValueAtTime(0.2, ctx.currentTime); 

        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0); 

        osc.connect(gain); 

        gain.connect(ctx.destination); 

        osc.start(); 

        osc.stop(ctx.currentTime + 3.0); 

    } catch (error) { 

        console.warn("AudioContext skipped or blocked by browser policy."); 

    } 

} 

// Closes and hides the dice roll result modal dialog
function closeRollModal() { 

    const modalBox = document.getElementById('dice-result-box'); 

    if (modalBox) { 

        modalBox.style.display = 'none'; 

        modalBox.classList.add('hidden'); 

    } 

    isRolling = false; 

} 
//#endregion


//#region 5. Skill & Action Info Toggles

// Initializes expandable accordion info toggles for attacks and skills
function initSkillNoteToggles() { 

    const infoButtons = document.querySelectorAll('.info-btn'); 

    infoButtons.forEach(btn => { 

        btn.addEventListener('click', (e) => { 

            e.stopPropagation(); 

            btn.classList.toggle('active'); 

            const parent = btn.closest('li, .attack-item'); 

            if (parent) { 

                const note = parent.querySelector('.skill-note'); 

                if (note) note.classList.toggle('show'); 

            } 

        }); 

    }); 

} 
//#endregion


//#region 6. Cyberpunk Roll Log System

    let rollLog = []; 

    // Records a completed roll into the session history buffer log
function recordRollToLog(notation, label, statKey, result, totalMod, grandTotal, resultType) { 

    const timestamp = new Date().toLocaleTimeString(); 

    rollLog.unshift({ timestamp, notation, label, statKey, result, totalMod, grandTotal, resultType }); 

    if (rollLog.length > 50) rollLog.pop(); 

    updateRollLogUI(); 

} 

// Renders and updates the roll history modal list interface
function updateRollLogUI() { 

    let logContainer = document.getElementById('cyber-roll-log-list'); 

    if (!logContainer) { 

        createRollLogModal(); 

        logContainer = document.getElementById('cyber-roll-log-list'); 

    } 

    if (!logContainer) return; 

    if (rollLog.length === 0) { 

        logContainer.innerHTML = `<div class="text-purple-400/60 text-center py-4 cyber-font text-xs">NO ROLL DATA RECORDED IN BUFFER</div>`; 

        return; 

    } 

    logContainer.innerHTML = rollLog.map(entry => { 

        let badgeClass = 'text-purple-400 border-purple-500/30'; 

        if (entry.resultType === 'crit') badgeClass = 'text-amber-400 border-amber-500/50 bg-amber-500/10 animate-pulse'; 

        if (entry.resultType === 'fail') badgeClass = 'text-rose-500 border-rose-500/50 bg-rose-500/10 animate-pulse'; 

        const modStr = entry.totalMod >= 0 ? `+${entry.totalMod}` : `${entry.totalMod}`; 

        return `
            <div class="flex items-center justify-between p-2 mb-2 bg-purple-950/40 border border-purple-500/20 rounded text-xs cyber-font">
                <div>
                    <span class="text-purple-300 font-bold">${entry.label}</span>
                    <span class="text-purple-400/60 text-[10px] ml-1">[${entry.notation}]</span>
                    <div class="text-[10px] text-purple-400/70">${entry.timestamp}</div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[10px] text-purple-400/80">Raw: ${entry.result} (${modStr})</span>
                    <span class="px-2 py-0.5 rounded border font-bold ${badgeClass}">${entry.grandTotal}</span>
                </div>
            </div>
        `; 

    }).join(''); 

} 

// Dynamically creates the terminal roll log modal container element in the DOM
function createRollLogModal() { 

    if (document.getElementById('cyber-roll-log-modal')) return; 

    const modal = document.createElement('div'); 

    modal.id = 'cyber-roll-log-modal'; 

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm hidden'; 

    modal.innerHTML = `
        <div class="relative w-full max-w-lg p-6 bg-[#0a0118] border-2 border-purple-500/50 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] text-purple-200">
            <div class="flex items-center justify-between mb-4 pb-2 border-b border-purple-500/30">
                <h3 class="cyber-font text-sm uppercase tracking-widest text-purple-300 font-bold flex items-center gap-2">
                    <span class="inline-block w-2 h-2 bg-purple-500 animate-ping rounded-full"></span>
                    SYS_LOG: ROLL_HISTORY_BUFFER
                </h3>
                <button onclick="toggleRollLogModal()" class="text-purple-400 hover:text-purple-200 cyber-font text-xs px-2 py-1 border border-purple-500/30 rounded hover:bg-purple-500/20 transition-all">CLOSE [X]</button>
            </div>
            <div id="cyber-roll-log-list" class="max-h-80 overflow-y-auto pr-1 space-y-1">
                <div class="text-purple-400/60 text-center py-4 cyber-font text-xs">NO ROLL DATA RECORDED IN BUFFER</div>
            </div>
            <div class="mt-4 pt-2 border-t border-purple-500/30 flex justify-between items-center text-[10px] text-purple-400/60 cyber-font">
                <span>BUFFER CAPACITY: 50 ENTRIES</span>
                <button onclick="clearRollLog()" class="hover:text-rose-400 transition-colors">PURGE BUFFER</button>
            </div>
        </div>
    `; 

    document.body.appendChild(modal); 

} 

// Toggles visibility of the roll history log modal dialog
function toggleRollLogModal() { 

    createRollLogModal(); 

    const modal = document.getElementById('cyber-roll-log-modal'); 

    if (!modal) return; 

    if (modal.classList.contains('hidden')) { 

        modal.classList.remove('hidden'); 

        updateRollLogUI(); 

    } else { 

        modal.classList.add('hidden'); 

    } 

} 

// Clears all roll records from the session buffer memory
function clearRollLog() { 

    rollLog = []; 

    updateRollLogUI(); 

} 

//#endregion