# 🎯 Life Tracker - Votre Vie Gamifiée

## 📱 Présentation

Life Tracker est une application Progressive Web App (PWA) qui transforme votre vie en un système de progression clair et motivant. Suivez vos statistiques personnelles dans différents domaines et observez concrètement votre amélioration au fil du temps.

## ✨ Fonctionnalités

### 🎮 Gamification de votre vie
- **8 catégories** préd éfinies : Épanouissement, Plaisir, Santé, Productivité, Créativité, Social, Apprentissage, Spiritualité
- **Score global** calculé automatiquement
- **Système de série** (streak) pour rester motivé
- **Progression visuelle** avec barres et graphiques

### 📊 Statistiques détaillées
- **Graphiques interactifs** par jour, semaine, mois et année
- **Analyse de progression** avec moyenne, maximum et tendance
- **Historique complet** de toutes vos entrées
- **Score pondéré** qui valorise vos entrées récentes

### 🎨 Interface moderne
- **Mode Dark/Light** - Basculez entre les thèmes selon vos préférences
- **Design responsive** - Parfait sur iPhone et iPad
- **Animations fluides** - Expérience utilisateur agréable
- **Navigation intuitive** - 3 vues principales (Accueil, Stats, Profil)

### 💾 Sauvegarde locale
- **Données stockées localement** - Tout reste sur votre appareil
- **Mode offline complet** - Fonctionne sans connexion
- **Pas de compte nécessaire** - Installation et utilisation immédiates

## 🚀 Installation

### Sur iPhone/iPad

1. Ouvrez **Safari** (obligatoire pour l'installation PWA)
2. Allez sur l'URL de l'application déployée
3. Appuyez sur le bouton **Partager** (carré avec flèche)
4. Sélectionnez **"Sur l'écran d'accueil"**
5. Appuyez sur **Ajouter**
6. L'icône apparaît sur votre écran d'accueil !

### Déploiement sur GitHub Pages

1. Créez un nouveau dépôt sur GitHub (Public)
2. Uploadez tous les fichiers du dossier `life-tracker-app`
3. Allez dans **Settings** > **Pages**
4. Sélectionnez **main branch** et **/ (root)**
5. Cliquez sur **Save**
6. Attendez 2-3 minutes
7. Votre URL sera : `https://VOTRE-USERNAME.github.io/VOTRE-REPO/`

## 📖 Guide d'utilisation

### Dashboard (Accueil)
- Visualisez votre **score global** sur 100
- Consultez vos **statistiques rapides** (série, activités du jour, total)
- Parcourez toutes vos **catégories** avec leur score actuel
- Appuyez sur le **bouton +** pour ajouter une nouvelle entrée

### Ajouter une entrée
1. Cliquez sur le bouton flottant **+**
2. Sélectionnez une **catégorie**
3. Ajustez le **score** de 0 à 10 avec le slider
4. Ajoutez une **note optionnelle** pour plus de contexte
5. Appuyez sur **Enregistrer**

### Statistiques détaillées
1. Cliquez sur n'importe quelle **catégorie** depuis l'accueil
2. Changez la **période d'affichage** (semaine, mois, année)
3. Visualisez le **graphique d'évolution**
4. Consultez les **stats résumées** (moyenne, maximum, progression)
5. Parcourez l'**historique des entrées**

### Profil
- Modifiez votre **nom d'utilisateur**
- Consultez vos **performances** par catégorie
- Voyez depuis combien de temps vous utilisez l'app
- Option de **réinitialisation** des données (prudence !)

### Mode Dark/Light
- Cliquez sur l'icône **🌙/☀️** en haut à droite
- Le thème change instantanément
- Votre préférence est sauvegardée

## 🎨 Catégories par défaut

| Icône | Catégorie | Description |
|-------|-----------|-------------|
| 🌟 | Épanouissement | Votre bien-être général et satisfaction |
| 😊 | Plaisir | Moments de joie et de détente |
| 💪 | Santé | Forme physique et habitudes saines |
| ⚡ | Productivité | Accomplissements et efficacité |
| 🎨 | Créativité | Expression artistique et innovation |
| 👥 | Social | Relations et interactions sociales |
| 📚 | Apprentissage | Nouvelles connaissances et compétences |
| 🧘 | Spiritualité | Méditation et développement personnel |

## 💡 Conseils d'utilisation

### Pour de meilleurs résultats :
1. **Soyez régulier** - Enregistrez vos entrées quotidiennement
2. **Soyez honnête** - Ne surestimez pas vos scores
3. **Ajoutez des notes** - Contextualisez vos entrées pour mieux comprendre
4. **Consultez les graphiques** - Identifiez les tendances et ajustez
5. **Maintenez votre série** - La régularité est clé !

### Système de notation (0-10) :
- **0-2** : Très mauvais / Absent
- **3-4** : Faible / Insuffisant
- **5-6** : Moyen / Correct
- **7-8** : Bon / Satisfaisant
- **9-10** : Excellent / Exceptionnel

## 🔧 Personnalisation

### Modifier les catégories
Dans `app.js`, modifiez le tableau `DEFAULT_CATEGORIES` :
```javascript
const DEFAULT_CATEGORIES = [
    { id: 'custom', name: 'Ma catégorie', icon: '🎯', color: '#ff6b6b' },
    // ... autres catégories
];
```

### Changer les couleurs
Dans `style.css`, modifiez les variables CSS :
```css
:root {
    --primary-color: #6366f1;  /* Couleur principale */
    --secondary-color: #8b5cf6; /* Couleur secondaire */
    /* ... autres variables */
}
```

## 📱 Compatibilité

- ✅ iPhone (iOS 11.3+) avec Safari
- ✅ iPad avec Safari
- ✅ Android avec Chrome
- ⚠️ Installation PWA uniquement via Safari sur iOS

## 🔒 Confidentialité

- **Aucune donnée envoyée** - Tout reste sur votre appareil
- **Pas de tracking** - Aucun analytics ni cookies
- **Pas de compte** - Aucune inscription nécessaire
- **Open source** - Le code est transparent

## 🛠️ Technologies utilisées

- **HTML5** - Structure
- **CSS3** - Design avec variables CSS et animations
- **JavaScript Vanilla** - Pas de framework, légèreté maximale
- **Canvas API** - Graphiques dessinés à la main
- **LocalStorage** - Sauvegarde des données
- **Service Worker** - Fonctionnement offline
- **PWA** - Installation sur l'écran d'accueil

## 📂 Structure du projet

```
life-tracker-app/
├── index.html          # Page principale
├── style.css          # Styles (mode dark/light)
├── app.js             # Logique de l'application
├── manifest.json      # Configuration PWA
├── service-worker.js  # Mode offline
├── icons/             # Icônes (6 tailles)
│   ├── icon-120.png
│   ├── icon-152.png
│   ├── icon-167.png
│   ├── icon-180.png
│   ├── icon-192.png
│   └── icon-512.png
└── README.md          # Ce fichier
```

## 🎯 Feuille de route

### Prochaines fonctionnalités possibles :
- [ ] Export des données (JSON, CSV)
- [ ] Import de données
- [ ] Objectifs personnalisés
- [ ] Notifications/Rappels
- [ ] Comparaison de périodes
- [ ] Notes vocales
- [ ] Photos attachées aux entrées
- [ ] Partage de progression
- [ ] Catégories personnalisables via l'interface

## 🤝 Contribution

N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Partager vos retours d'expérience

## 📄 Licence

MIT - Libre d'utilisation et de modification

## 🙏 Remerciements

Créé avec passion pour aider chacun à améliorer sa vie au quotidien.

---

**Version** : 1.0.0  
**Dernière mise à jour** : Novembre 2024  
**Fait avec** ❤️ **pour le développement personnel**
