# Guide de Développement PWA pour iPhone

## 📋 Vue d'ensemble
Ce guide vous accompagne pour créer une Progressive Web App (PWA), l'héberger sur GitHub Pages, et l'installer sur votre iPhone.

## 🛠️ Logiciels recommandés

### Éditeur de code
**Visual Studio Code** (gratuit)
- Téléchargement : https://code.visualstudio.com/
- Extensions recommandées :
  - Live Server (pour tester localement)
  - HTML CSS Support
  - JavaScript (ES6) code snippets
  - PWA Tools

### Alternatives
- **Sublime Text** : léger et rapide
- **WebStorm** : plus complet mais payant

### Outils nécessaires
1. **Git** : pour gérer les versions
   - Mac : `brew install git` ou télécharger sur https://git-scm.com/
   - Vérifier l'installation : `git --version`

2. **Compte GitHub** : pour héberger gratuitement
   - Créer un compte sur https://github.com/

3. **Navigateur moderne** : Safari, Chrome ou Firefox pour tester

## 📁 Structure du projet

```
mon-app-pwa/
├── index.html          # Page principale
├── manifest.json       # Configuration PWA
├── service-worker.js   # Fonctionnement offline
├── style.css          # Styles
├── app.js             # Logique JavaScript
└── icons/             # Icônes de l'app
    ├── icon-192.png
    └── icon-512.png
```

## 🚀 Étapes de développement

### Étape 1 : Créer le dépôt GitHub
1. Aller sur https://github.com/
2. Cliquer sur "New repository"
3. Nommer le dépôt (ex: `ma-pwa-iphone`)
4. Cocher "Public"
5. Cocher "Add a README file"
6. Cliquer sur "Create repository"

### Étape 2 : Cloner le dépôt localement
```bash
# Dans le terminal
cd ~/Documents  # ou l'emplacement de votre choix
git clone https://github.com/VOTRE_USERNAME/ma-pwa-iphone.git
cd ma-pwa-iphone
```

### Étape 3 : Créer les fichiers de base
Créez les fichiers listés dans la structure ci-dessus.

### Étape 4 : Activer GitHub Pages
1. Aller dans les "Settings" du dépôt GitHub
2. Section "Pages" dans le menu gauche
3. Source : sélectionner "main branch"
4. Sauvegarder
5. L'URL sera : `https://VOTRE_USERNAME.github.io/ma-pwa-iphone/`

### Étape 5 : Développer et tester localement

#### Avec Visual Studio Code + Live Server
1. Ouvrir le dossier du projet dans VS Code
2. Installer l'extension "Live Server"
3. Clic droit sur `index.html` > "Open with Live Server"
4. L'app s'ouvre sur `http://127.0.0.1:5500`

#### Avec Python (alternative)
```bash
# Dans le dossier du projet
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

### Étape 6 : Pousser les modifications sur GitHub
```bash
git add .
git commit -m "Première version de la PWA"
git push origin main
```

Attendre 2-3 minutes que GitHub Pages se mette à jour.

## 📱 Installation sur iPhone

### Méthode 1 : Via Safari (recommandée)
1. Ouvrir Safari sur l'iPhone
2. Aller sur `https://VOTRE_USERNAME.github.io/ma-pwa-iphone/`
3. Appuyer sur le bouton "Partager" (carré avec flèche vers le haut)
4. Faire défiler et sélectionner "Sur l'écran d'accueil"
5. Personnaliser le nom si besoin
6. Appuyer sur "Ajouter"
7. L'icône apparaît sur l'écran d'accueil ✅

### Méthode 2 : Via QR Code
1. Générer un QR code de votre URL sur https://www.qr-code-generator.com/
2. Scanner avec l'appareil photo de l'iPhone
3. Suivre les étapes de la Méthode 1

## ✅ Checklist de développement

### Avant de déployer
- [ ] Tous les fichiers sont créés
- [ ] Le manifest.json est valide
- [ ] Les icônes sont présentes (minimum 192x192 et 512x512)
- [ ] Le service worker est configuré
- [ ] Test en local réussi
- [ ] `git push` effectué

### Pour l'installation iPhone
- [ ] URL GitHub Pages accessible
- [ ] Certificat HTTPS actif (automatique avec GitHub Pages)
- [ ] Manifest détecté par Safari
- [ ] Icônes s'affichent correctement
- [ ] Mode standalone fonctionne

## 🔧 Workflow de développement quotidien

```bash
# 1. Modifier les fichiers dans VS Code
# 2. Tester localement avec Live Server
# 3. Une fois satisfait :
git add .
git commit -m "Description des modifications"
git push origin main

# 4. Attendre 2-3 minutes
# 5. Rafraîchir l'app sur iPhone ou réinstaller si nécessaire
```

## 🐛 Débogage sur iPhone

### Console Safari
1. Sur Mac : Safari > Préférences > Avancées > Cocher "Afficher le menu Développement"
2. Connecter l'iPhone au Mac
3. Sur iPhone : Réglages > Safari > Avancé > Activer "Inspecteur Web"
4. Sur Mac : Menu Développement > [Votre iPhone] > [Votre page]

### Outils iOS
- Utiliser `console.log()` pour déboguer
- Vérifier les erreurs dans l'inspecteur Safari
- Tester sur https://www.pwabuilder.com/ pour valider la PWA

## 📚 Ressources utiles

- Documentation PWA : https://web.dev/progressive-web-apps/
- Générateur d'icônes : https://www.pwabuilder.com/imageGenerator
- Manifest generator : https://www.simicart.com/manifest-generator.html/
- Test PWA : https://www.pwabuilder.com/
- Git documentation : https://git-scm.com/doc

## 💡 Conseils

1. **Testez fréquemment** : après chaque modification importante
2. **Utilisez le cache intelligemment** : le service worker peut cacher trop de choses
3. **Versionning** : changez la version dans le service worker pour forcer la mise à jour
4. **HTTPS obligatoire** : GitHub Pages le fournit automatiquement
5. **Icônes** : utilisez des PNG avec fond transparent ou solide selon le design
6. **Patience** : GitHub Pages peut prendre quelques minutes pour se mettre à jour

## 🎯 Prochaines étapes

Une fois l'environnement configuré :
1. Développer les fonctionnalités de votre app
2. Améliorer le design
3. Ajouter des fonctionnalités offline avancées
4. Optimiser les performances
5. Tester sur différents appareils
