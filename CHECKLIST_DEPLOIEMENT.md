# ✅ CHECKLIST DE DÉPLOIEMENT PWA

## 📦 Étape 1 : Télécharger le projet
- [ ] Télécharger tous les fichiers du dossier `pwa-iphone-test`
- [ ] Décompresser dans un dossier local sur votre ordinateur

## 💻 Étape 2 : Installer les outils

### Visual Studio Code (recommandé)
- [ ] Télécharger : https://code.visualstudio.com/
- [ ] Installer l'extension "Live Server" dans VS Code

### Git
**Sur Mac :**
```bash
brew install git
```
Ou télécharger sur : https://git-scm.com/

**Vérifier l'installation :**
```bash
git --version
```

### Compte GitHub
- [ ] Créer un compte gratuit sur https://github.com/

## 🚀 Étape 3 : Déployer sur GitHub Pages

### Méthode Simple (Via l'interface web)

1. **Créer le dépôt**
   - [ ] Aller sur https://github.com/new
   - [ ] Nom du dépôt : `ma-pwa-iphone` (ou autre)
   - [ ] Cocher **Public**
   - [ ] Cliquer "Create repository"

2. **Uploader les fichiers**
   - [ ] Sur la page du dépôt, cliquer "uploading an existing file"
   - [ ] Glisser-déposer TOUS les fichiers du projet
   - [ ] Message de commit : "Initial commit"
   - [ ] Cliquer "Commit changes"

3. **Activer GitHub Pages**
   - [ ] Aller dans **Settings** (en haut du dépôt)
   - [ ] Cliquer sur **Pages** dans le menu de gauche
   - [ ] Source : Sélectionner **Deploy from a branch**
   - [ ] Branch : Choisir **main** et **(root)**
   - [ ] Cliquer **Save**

4. **Récupérer l'URL**
   - [ ] L'URL sera : `https://VOTRE_USERNAME.github.io/ma-pwa-iphone/`
   - [ ] ⏱️ Attendre 2-3 minutes que GitHub déploie le site
   - [ ] Tester l'URL dans un navigateur

### Méthode Git (Ligne de commande)

```bash
# 1. Aller dans le dossier du projet
cd /chemin/vers/pwa-iphone-test

# 2. Initialiser Git
git init

# 3. Ajouter tous les fichiers
git add .

# 4. Créer le premier commit
git commit -m "Initial commit - PWA iPhone"

# 5. Connecter au dépôt GitHub (après l'avoir créé sur github.com)
git remote add origin https://github.com/VOTRE_USERNAME/ma-pwa-iphone.git

# 6. Pousser les fichiers
git branch -M main
git push -u origin main
```

Puis activer GitHub Pages via l'interface web (étape 3 ci-dessus).

## 📱 Étape 4 : Installer sur iPhone

1. **Ouvrir Safari**
   - [ ] Sur votre iPhone, ouvrir **Safari** (PAS Chrome)
   - [ ] Aller sur `https://VOTRE_USERNAME.github.io/ma-pwa-iphone/`
   - [ ] Vérifier que la page se charge correctement

2. **Ajouter à l'écran d'accueil**
   - [ ] Appuyer sur le bouton **Partager** (carré avec flèche vers le haut)
   - [ ] Faire défiler vers le bas
   - [ ] Appuyer sur **"Sur l'écran d'accueil"**
   - [ ] Modifier le nom si souhaité
   - [ ] Appuyer sur **"Ajouter"**

3. **Vérifier l'installation**
   - [ ] L'icône apparaît sur votre écran d'accueil
   - [ ] Ouvrir l'app depuis l'écran d'accueil
   - [ ] Vérifier que "Mode: Application (Standalone)" s'affiche
   - [ ] Tester les fonctionnalités (compteur, notes, vibration)

## 🧪 Étape 5 : Tester en local (avant déploiement)

### Avec Python
```bash
cd /chemin/vers/pwa-iphone-test
python3 -m http.server 8000
```
Ouvrir : http://localhost:8000

### Avec VS Code + Live Server
- [ ] Ouvrir le dossier dans VS Code
- [ ] Clic droit sur `index.html`
- [ ] Sélectionner "Open with Live Server"

## 🔄 Workflow de mise à jour

Quand vous modifiez l'application :

```bash
# 1. Modifier les fichiers dans votre éditeur

# 2. Tester en local

# 3. Commiter les changements
git add .
git commit -m "Description des modifications"

# 4. Pousser sur GitHub
git push

# 5. Attendre 2-3 minutes

# 6. Sur iPhone :
#    - Vider le cache de Safari
#    - OU désinstaller et réinstaller l'app
```

## 🔍 Vérification PWA

Testez votre PWA sur :
- [ ] https://www.pwabuilder.com/ (analyse complète)
- [ ] Chrome DevTools > Lighthouse (audit)

## ⚠️ Checklist de vérification

Avant de considérer le projet terminé :

### Fichiers présents
- [ ] index.html
- [ ] manifest.json
- [ ] service-worker.js
- [ ] style.css
- [ ] app.js
- [ ] icons/icon-192.png
- [ ] icons/icon-512.png

### Configuration
- [ ] HTTPS actif (automatique avec GitHub Pages)
- [ ] Manifest.json valide
- [ ] Service Worker enregistré
- [ ] Icônes présentes et correctes

### Tests sur iPhone
- [ ] Installation réussie depuis Safari
- [ ] App s'ouvre en mode standalone
- [ ] Compteur fonctionne et sauvegarde
- [ ] Notes se sauvegardent
- [ ] Vibration fonctionne (optionnel)
- [ ] Mode offline fonctionne (mettre en mode avion)

## 🐛 Résolution de problèmes

### L'app ne s'installe pas
- [ ] Vérifier que vous utilisez Safari (pas Chrome)
- [ ] Vérifier que l'URL est en HTTPS
- [ ] Vider le cache de Safari : Réglages > Safari > Effacer historique

### Le Service Worker ne fonctionne pas
- [ ] Ouvrir la console Safari pour voir les erreurs
- [ ] Vérifier que tous les fichiers sont accessibles
- [ ] Changer la version dans `service-worker.js` (ligne 1)

### L'app ne se met pas à jour
- [ ] Désinstaller l'app de l'écran d'accueil
- [ ] Vider le cache de Safari
- [ ] Réinstaller depuis l'URL

### GitHub Pages ne fonctionne pas
- [ ] Vérifier que le dépôt est Public
- [ ] Attendre 5 minutes supplémentaires
- [ ] Vérifier dans Settings > Pages que c'est bien activé

## 📚 Ressources et documentation

- [ ] Lire `README.md` - Instructions générales
- [ ] Lire `GUIDE_DEVELOPPEMENT.md` - Guide complet
- [ ] Consulter `GUIDE_DEMARRAGE_RAPIDE.pdf` - Version imprimable

## 🎯 Prochaines étapes

Une fois l'installation réussie :
- [ ] Personnaliser les couleurs dans `style.css`
- [ ] Changer le nom dans `manifest.json`
- [ ] Créer vos propres icônes
- [ ] Ajouter des fonctionnalités dans `app.js`
- [ ] Tester sur différents appareils

---

**Note importante :** Ce projet est conçu pour un usage personnel, sans publication sur l'App Store. L'application est accessible uniquement via l'URL GitHub Pages et peut être installée directement sur votre iPhone via Safari.

**Support :** Toute la documentation nécessaire est incluse dans les fichiers du projet.
