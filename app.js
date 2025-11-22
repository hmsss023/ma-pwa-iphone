// Catégories par défaut
const DEFAULT_CATEGORIES = [
    { id: 'wellbeing', name: 'Épanouissement', icon: '🌟', color: '#10b981' },
    { id: 'pleasure', name: 'Plaisir', icon: '😊', color: '#f59e0b' },
    { id: 'health', name: 'Santé', icon: '💪', color: '#ef4444' },
    { id: 'productivity', name: 'Productivité', icon: '⚡', color: '#6366f1' },
    { id: 'creativity', name: 'Créativité', icon: '🎨', color: '#8b5cf6' },
    { id: 'social', name: 'Social', icon: '👥', color: '#06b6d4' },
    { id: 'learning', name: 'Apprentissage', icon: '📚', color: '#84cc16' },
    { id: 'spirituality', name: 'Spiritualité', icon: '🧘', color: '#ec4899' }
];

// État de l'application
let appState = {
    categories: DEFAULT_CATEGORIES,
    entries: [],
    userName: 'Utilisateur',
    createdAt: new Date().toISOString(),
    currentView: 'dashboard',
    currentCategory: null,
    currentPeriod: 'week',
    theme: 'light'
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initTheme();
    initEventListeners();
    renderDashboard();
    updateQuickStats();
    renderCategories();
    updateGlobalScore();
    
    // Enregistrement du Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
});

// Gestion du thème
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    appState.theme = savedTheme;
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon();
}

function toggleTheme() {
    appState.theme = appState.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', appState.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = appState.theme === 'light' ? '🌙' : '☀️';
}

// Gestion des données
function loadData() {
    const saved = localStorage.getItem('lifeTrackerData');
    if (saved) {
        const data = JSON.parse(saved);
        appState = { ...appState, ...data };
    }
}

function saveData() {
    localStorage.setItem('lifeTrackerData', JSON.stringify(appState));
}

// Navigation
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${viewName}-view`).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });
    
    appState.currentView = viewName;
    
    if (viewName === 'profile') {
        renderProfile();
    }
}

// Event Listeners
function initEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => switchView(item.dataset.view));
    });
    
    // Thème
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Modal
    document.getElementById('add-activity-btn').addEventListener('click', openModal);
    document.getElementById('close-modal').addEventListener('click', closeModal);
    
    // Formulaire d'activité
    document.getElementById('activity-value').addEventListener('input', (e) => {
        document.getElementById('activity-value-display').textContent = e.target.value;
    });
    
    document.getElementById('submit-activity').addEventListener('click', submitActivity);
    
    // Profil
    document.getElementById('save-profile').addEventListener('click', saveProfile);
    document.getElementById('reset-data').addEventListener('click', resetData);
    
    // Retour depuis stats
    document.getElementById('back-to-dashboard').addEventListener('click', () => switchView('dashboard'));
    
    // Sélecteur de période
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            appState.currentPeriod = e.target.dataset.period;
            renderDetailChart();
        });
    });
}

// Dashboard
function renderDashboard() {
    updateMemberSince();
}

function updateMemberSince() {
    const created = new Date(appState.createdAt);
    const days = Math.floor((new Date() - created) / (1000 * 60 * 60 * 24));
    document.getElementById('member-since').textContent = `${days} jour${days > 1 ? 's' : ''}`;
}

// Statistiques rapides
function updateQuickStats() {
    // Série de jours consécutifs
    const streak = calculateStreak();
    document.getElementById('streak-value').textContent = streak;
    
    // Activités aujourd'hui
    const today = new Date().toDateString();
    const todayEntries = appState.entries.filter(e => 
        new Date(e.timestamp).toDateString() === today
    );
    document.getElementById('activities-today').textContent = todayEntries.length;
    
    // Total d'activités
    document.getElementById('total-activities').textContent = appState.entries.length;
}

function calculateStreak() {
    if (appState.entries.length === 0) return 0;
    
    const sortedEntries = [...appState.entries].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const uniqueDays = new Set();
    sortedEntries.forEach(entry => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        uniqueDays.add(entryDate.getTime());
    });
    
    const sortedDays = Array.from(uniqueDays).sort((a, b) => b - a);
    
    for (let day of sortedDays) {
        if (day === currentDate.getTime() || day === currentDate.getTime() - 86400000) {
            streak++;
            currentDate = new Date(day - 86400000);
        } else {
            break;
        }
    }
    
    return streak;
}

// Score global
function updateGlobalScore() {
    const scores = appState.categories.map(cat => getCategoryScore(cat.id));
    const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const globalScore = Math.round(average * 10);
    
    document.getElementById('global-score-value').textContent = globalScore;
    
    const messages = [
        { min: 0, max: 20, text: 'Commencez à suivre votre progression !' },
        { min: 20, max: 40, text: 'Bon début, continuez ainsi !' },
        { min: 40, max: 60, text: 'Vous progressez bien !' },
        { min: 60, max: 80, text: 'Excellent travail !' },
        { min: 80, max: 100, text: 'Vous êtes au top ! 🎉' }
    ];
    
    const message = messages.find(m => globalScore >= m.min && globalScore <= m.max);
    document.getElementById('global-message').textContent = message.text;
    
    drawGlobalChart(globalScore);
}

function drawGlobalChart(score) {
    const canvas = document.getElementById('global-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Cercle de fond
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 12;
    ctx.stroke();
    
    // Arc de progression
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, (score / 100 * 2 * Math.PI) - Math.PI / 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();
}

// Catégories
function renderCategories() {
    const container = document.getElementById('categories-list');
    container.innerHTML = '';
    
    appState.categories.forEach(category => {
        const score = getCategoryScore(category.id);
        const percentage = score * 10;
        
        const item = document.createElement('div');
        item.className = 'category-item';
        item.innerHTML = `
            <div class="category-header">
                <div class="category-name">
                    <span class="category-icon">${category.icon}</span>
                    <span>${category.name}</span>
                </div>
                <div class="category-score">${score.toFixed(1)}</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            appState.currentCategory = category;
            switchView('stats');
            renderDetailView(category);
        });
        
        container.appendChild(item);
    });
    
    // Remplir le select du modal
    const select = document.getElementById('activity-category');
    select.innerHTML = appState.categories.map(cat => 
        `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`
    ).join('');
}

function getCategoryScore(categoryId) {
    const entries = appState.entries.filter(e => e.categoryId === categoryId);
    if (entries.length === 0) return 0;
    
    // Moyenne pondérée (les entrées récentes comptent plus)
    const now = Date.now();
    const weights = entries.map(e => {
        const age = (now - new Date(e.timestamp)) / (1000 * 60 * 60 * 24); // jours
        return Math.exp(-age / 30); // Décroissance exponentielle sur 30 jours
    });
    
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const weightedSum = entries.reduce((sum, entry, i) => 
        sum + entry.value * weights[i], 0
    );
    
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

// Modal
function openModal() {
    document.getElementById('add-activity-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('add-activity-modal').classList.remove('active');
    document.getElementById('activity-note').value = '';
    document.getElementById('activity-value').value = 5;
    document.getElementById('activity-value-display').textContent = '5';
}

function submitActivity() {
    const categoryId = document.getElementById('activity-category').value;
    const value = parseFloat(document.getElementById('activity-value').value);
    const note = document.getElementById('activity-note').value.trim();
    
    const entry = {
        id: Date.now().toString(),
        categoryId,
        value,
        note,
        timestamp: new Date().toISOString()
    };
    
    appState.entries.push(entry);
    saveData();
    
    closeModal();
    updateQuickStats();
    renderCategories();
    updateGlobalScore();
    
    // Vibration feedback
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// Vue détaillée des stats
function renderDetailView(category) {
    document.getElementById('stats-category-name').textContent = category.name + ' ' + category.icon;
    renderDetailChart();
    renderRecentEntries(category.id);
}

function renderDetailChart() {
    const category = appState.currentCategory;
    if (!category) return;
    
    const entries = appState.entries.filter(e => e.categoryId === category.id);
    
    // Préparer les données selon la période
    const data = prepareChartData(entries, appState.currentPeriod);
    
    // Calculer les stats
    const values = data.map(d => d.value);
    const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    const max = values.length > 0 ? Math.max(...values) : 0;
    const firstValue = values[0] || 0;
    const lastValue = values[values.length - 1] || 0;
    const progress = firstValue > 0 ? ((lastValue - firstValue) / firstValue * 100) : 0;
    
    document.getElementById('avg-value').textContent = avg.toFixed(1);
    document.getElementById('max-value').textContent = max.toFixed(1);
    document.getElementById('progress-value').textContent = (progress >= 0 ? '+' : '') + progress.toFixed(0) + '%';
    
    // Dessiner le graphique
    drawChart(data);
}

function prepareChartData(entries, period) {
    const now = new Date();
    const data = [];
    
    if (period === 'week') {
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);
            
            const dayEntries = entries.filter(e => {
                const entryDate = new Date(e.timestamp);
                return entryDate.toDateString() === date.toDateString();
            });
            
            const avg = dayEntries.length > 0 
                ? dayEntries.reduce((sum, e) => sum + e.value, 0) / dayEntries.length 
                : 0;
            
            data.push({
                label: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
                value: avg
            });
        }
    } else if (period === 'month') {
        for (let i = 29; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);
            
            const dayEntries = entries.filter(e => {
                const entryDate = new Date(e.timestamp);
                return entryDate.toDateString() === date.toDateString();
            });
            
            const avg = dayEntries.length > 0 
                ? dayEntries.reduce((sum, e) => sum + e.value, 0) / dayEntries.length 
                : 0;
            
            if (i % 3 === 0) { // Afficher un label tous les 3 jours
                data.push({
                    label: date.getDate().toString(),
                    value: avg
                });
            } else {
                data.push({ label: '', value: avg });
            }
        }
    } else if (period === 'year') {
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now);
            date.setMonth(date.getMonth() - i);
            
            const monthEntries = entries.filter(e => {
                const entryDate = new Date(e.timestamp);
                return entryDate.getMonth() === date.getMonth() && 
                       entryDate.getFullYear() === date.getFullYear();
            });
            
            const avg = monthEntries.length > 0 
                ? monthEntries.reduce((sum, e) => sum + e.value, 0) / monthEntries.length 
                : 0;
            
            data.push({
                label: date.toLocaleDateString('fr-FR', { month: 'short' }),
                value: avg
            });
        }
    }
    
    return data;
}

function drawChart(data) {
    const canvas = document.getElementById('detail-chart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    const maxValue = Math.max(...data.map(d => d.value), 10);
    const xStep = chartWidth / (data.length - 1 || 1);
    
    // Style selon le thème
    const isDark = appState.theme === 'dark';
    ctx.strokeStyle = isDark ? '#cbd5e1' : '#64748b';
    ctx.fillStyle = isDark ? '#cbd5e1' : '#64748b';
    ctx.font = '20px -apple-system, sans-serif';
    
    // Axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Grille horizontale
    ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        
        // Labels Y
        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.textAlign = 'right';
        ctx.fillText((maxValue - (maxValue / 5) * i).toFixed(1), padding - 10, y + 5);
    }
    
    // Dessiner la courbe
    ctx.beginPath();
    data.forEach((point, i) => {
        const x = padding + xStep * i;
        const y = canvas.height - padding - (point.value / maxValue * chartHeight);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Points sur la courbe
    data.forEach((point, i) => {
        const x = padding + xStep * i;
        const y = canvas.height - padding - (point.value / maxValue * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
        
        // Labels X
        if (point.label) {
            ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
            ctx.textAlign = 'center';
            ctx.fillText(point.label, x, canvas.height - padding + 25);
        }
    });
}

function renderRecentEntries(categoryId) {
    const container = document.getElementById('recent-entries-list');
    const entries = appState.entries
        .filter(e => e.categoryId === categoryId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    
    if (entries.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Aucune entrée pour le moment</p>';
        return;
    }
    
    container.innerHTML = entries.map(entry => {
        const date = new Date(entry.timestamp);
        return `
            <div class="entry-item">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <strong>Score: ${entry.value}/10</strong>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">
                        ${date.toLocaleDateString('fr-FR')} ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                ${entry.note ? `<p style="color: var(--text-secondary);">${entry.note}</p>` : ''}
            </div>
        `;
    }).join('');
}

// Profil
function renderProfile() {
    document.getElementById('profile-name').textContent = appState.userName;
    document.getElementById('user-name-input').value = appState.userName;
    
    // Première lettre du nom pour l'avatar
    document.getElementById('profile-avatar-text').textContent = appState.userName.charAt(0).toUpperCase();
    
    // Stats du profil
    const statsGrid = document.getElementById('profile-stats-grid');
    const categoryStats = appState.categories.map(cat => ({
        name: cat.name,
        icon: cat.icon,
        score: getCategoryScore(cat.id)
    })).sort((a, b) => b.score - a.score);
    
    statsGrid.innerHTML = categoryStats.map(stat => `
        <div class="profile-stat-item">
            <div style="font-size: 2rem; margin-bottom: 5px;">${stat.icon}</div>
            <span class="stat-value">${stat.score.toFixed(1)}</span>
            <span class="stat-label">${stat.name}</span>
        </div>
    `).join('');
}

function saveProfile() {
    const newName = document.getElementById('user-name-input').value.trim();
    if (newName) {
        appState.userName = newName;
        saveData();
        renderProfile();
        alert('Profil sauvegardé !');
    }
}

function resetData() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
        appState.entries = [];
        appState.createdAt = new Date().toISOString();
        saveData();
        location.reload();
    }
}
