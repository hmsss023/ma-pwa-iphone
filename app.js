// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker enregistré:', registration);
                updateSWStatus('✅ Actif');
            })
            .catch(error => {
                console.log('Erreur Service Worker:', error);
                updateSWStatus('❌ Erreur');
            });
    });
}

// Détection du mode d'affichage
function updateDisplayMode() {
    const displayMode = document.getElementById('display-mode');
    if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode.textContent = '📱 Application (Standalone)';
        displayMode.style.color = '#50C878';
    } else if (window.matchMedia('(display-mode: fullscreen)').matches) {
        displayMode.textContent = '📱 Plein écran';
        displayMode.style.color = '#50C878';
    } else {
        displayMode.textContent = '🌐 Navigateur';
        displayMode.style.color = '#E74C3C';
    }
}

// Statut de connexion
function updateConnectionStatus() {
    const status = document.getElementById('connection-status');
    if (navigator.onLine) {
        status.textContent = '✅ En ligne';
        status.style.color = '#50C878';
    } else {
        status.textContent = '❌ Hors ligne';
        status.style.color = '#E74C3C';
    }
}

// Mise à jour du statut du Service Worker
function updateSWStatus(text) {
    const swStatus = document.getElementById('sw-status');
    swStatus.textContent = text;
}

// Compteur
let counter = parseInt(localStorage.getItem('counter')) || 0;
const counterDisplay = document.getElementById('counter');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');

function updateCounter() {
    counterDisplay.textContent = counter;
    localStorage.setItem('counter', counter);
    
    // Animation
    counterDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterDisplay.style.transform = 'scale(1)';
    }, 200);
}

increaseBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

decreaseBtn.addEventListener('click', () => {
    counter--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    counter = 0;
    updateCounter();
    
    // Feedback visuel
    resetBtn.textContent = '✓ Réinitialisé';
    setTimeout(() => {
        resetBtn.textContent = 'Réinitialiser';
    }, 1000);
});

// Notes
const notesArea = document.getElementById('notes');
notesArea.value = localStorage.getItem('notes') || '';

notesArea.addEventListener('input', (e) => {
    localStorage.setItem('notes', e.target.value);
});

// Vibration
const vibrateBtn = document.getElementById('vibrate');
vibrateBtn.addEventListener('click', () => {
    if ('vibrate' in navigator) {
        // Pattern: vibrate 200ms, pause 100ms, vibrate 200ms
        navigator.vibrate([200, 100, 200]);
        vibrateBtn.textContent = '✓ Vibration !';
        setTimeout(() => {
            vibrateBtn.textContent = 'Faire vibrer';
        }, 1000);
    } else {
        vibrateBtn.textContent = '❌ Non supporté';
        setTimeout(() => {
            vibrateBtn.textContent = 'Faire vibrer';
        }, 2000);
    }
});

// Détection du navigateur
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = 'Inconnu';
    
    if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
        browserName = 'Safari';
    } else if (userAgent.indexOf('Chrome') !== -1) {
        browserName = 'Chrome';
    } else if (userAgent.indexOf('Firefox') !== -1) {
        browserName = 'Firefox';
    } else if (userAgent.indexOf('Edge') !== -1) {
        browserName = 'Edge';
    }
    
    return browserName;
}

// Informations système
function updateSystemInfo() {
    // Navigateur
    document.getElementById('browser-info').textContent = detectBrowser();
    
    // Résolution
    const screenSize = `${window.innerWidth} x ${window.innerHeight}px`;
    document.getElementById('screen-size').textContent = screenSize;
}

// Horloge
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR');
    document.getElementById('current-time').textContent = timeString;
}

// Événements de connexion
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    updateDisplayMode();
    updateConnectionStatus();
    updateCounter();
    updateSystemInfo();
    updateTime();
    
    // Mise à jour de l'horloge chaque seconde
    setInterval(updateTime, 1000);
});

// Mise à jour de la résolution lors du redimensionnement
window.addEventListener('resize', updateSystemInfo);

// Détection du changement de mode d'affichage
window.matchMedia('(display-mode: standalone)').addEventListener('change', updateDisplayMode);

// Log pour le débogage
console.log('🚀 Application PWA initialisée');
console.log('📱 Appareil:', navigator.userAgent);
console.log('🌐 En ligne:', navigator.onLine);
console.log('💾 Service Worker supporté:', 'serviceWorker' in navigator);
console.log('📳 Vibration supportée:', 'vibrate' in navigator);
