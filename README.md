# 🚀 PWA Test pour iPhone

Application Progressive Web App de démonstration pour tester l'installation sur iPhone.

## 📱 Installation rapide sur iPhone

1. **Héberger sur GitHub Pages** (voir instructions détaillées ci-dessous)
2. Ouvrir l'URL dans **Safari** sur votre iPhone
3. Appuyer sur **Partager** (icône carré avec flèche)
4. Sélectionner **"Sur l'écran d'accueil"**
5. Appuyer sur **Ajouter**

## 🎯 Fonctionnalités de test

✅ **Détection du mode d'affichage** (navigateur vs application)  
✅ **Compteur** avec sauvegarde locale  
✅ **Notes** avec localStorage  
✅ **Vibration** (si supporté)  
✅ **Statut de connexion** (en ligne/hors ligne)  
✅ **Service Worker** pour le mode offline  
✅ **Informations système** (navigateur, résolution, heure)

## 🚀 Déploiement sur GitHub Pages

### Option 1 : Via l'interface GitHub (le plus simple)

1. **Créer un nouveau dépôt sur GitHub**
   - Aller sur https://github.com/new
   - Nommer le dépôt (ex: `ma-pwa-iphone`)
   - Rendre le dépôt **Public**
   - Cliquer sur "Create repository"

2. **Uploader les fichiers**
   - Sur la page du dépôt, cliquer sur "uploading an existing file"
   - Glisser-déposer TOUS les fichiers de ce dossier
   - Commit : "Initial commit"

3. **Activer GitHub Pages**
   - Aller dans **Settings** > **Pages**
   - Source : **Deploy from a branch**
   - Branch : **main** / **(root)**
   - Cliquer sur **Save**

4. **Récupérer l'URL**
   - L'URL sera : `https://VOTRE_USERNAME.github.io/ma-pwa-iphone/`
   - Attendre 2-3 minutes que le site soit déployé

### Option 2 : Via Git (ligne de commande)

```bash
# 1. Créer un nouveau dépôt sur GitHub (via l'interface web)

# 2. Dans ce dossier, initialiser Git
git init
git add .
git commit -m "Initial commit - PWA Test"

# 3. Connecter au dépôt GitHub
git remote add origin https://github.com/VOTRE_USERNAME/ma-pwa-iphone.git
git branch -M main
git push -u origin main

# 4. Activer GitHub Pages via Settings > Pages (interface web)
```

## 🧪 Test en local (avant déploiement)

### Avec Python
```bash
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

### Avec Node.js
```bash
npx http-server -p 8000
# Ouvrir http://localhost:8000
```

### Avec VS Code
1. Installer l'extension "Live Server"
2. Clic droit sur `index.html`
3. "Open with Live Server"

## 📂 Structure du projet

```
pwa-iphone-test/
├── index.html          # Page principale
├── manifest.json       # Configuration PWA
├── service-worker.js   # Gestion du cache et mode offline
├── style.css          # Styles CSS
├── app.js             # Logique JavaScript
├── icons/             # Icônes de l'application
│   ├── icon-192.png
│   └── icon-512.png
├── README.md          # Ce fichier
└── GUIDE_DEVELOPPEMENT.md  # Guide complet
```

## 🛠️ Modification et mise à jour

1. Modifier les fichiers localement
2. Tester en local
3. Pousser les changements :
```bash
git add .
git commit -m "Description des modifications"
git push
```
4. Attendre 2-3 minutes
5. Vider le cache sur iPhone ou réinstaller l'app

## 🔍 Vérification PWA

Testez votre PWA sur ces outils :
- https://www.pwabuilder.com/ (analyse complète)
- Chrome DevTools > Lighthouse (audit)
- Safari > Developer > Web Inspector (depuis un Mac)

## ⚠️ Points importants

- ✅ HTTPS obligatoire (automatique avec GitHub Pages)
- ✅ Manifest.json requis
- ✅ Service Worker requis
- ✅ Icônes 192x192 et 512x512 minimum
- ✅ Compatible iOS Safari uniquement pour l'installation

## 📚 Ressources

- [Guide complet de développement](GUIDE_DEVELOPPEMENT.md)
- [Documentation PWA](https://web.dev/progressive-web-apps/)
- [GitHub Pages](https://pages.github.com/)
- [MDN - Service Workers](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API)

## 🎨 Personnalisation

Pour personnaliser l'app :
1. **Couleurs** : Modifier les variables CSS dans `style.css`
2. **Nom** : Changer dans `manifest.json` et `index.html`
3. **Icônes** : Remplacer les fichiers dans `icons/`
4. **Fonctionnalités** : Ajouter du code dans `app.js`

## 💡 Astuces

- **Debugging iPhone** : Connecter à un Mac, Safari > Développement
- **Force refresh** : Changer la version dans `service-worker.js` (CACHE_NAME)
- **Test offline** : Activer le mode avion sur iPhone
- **Logs** : Ouvrir la console dans Safari Web Inspector

## 🆘 Problèmes courants

**L'app ne s'installe pas**
- Vérifier que vous êtes sur Safari (pas Chrome)
- Vérifier que l'URL est en HTTPS
- Vider le cache de Safari

**Le Service Worker ne fonctionne pas**
- Vérifier la console pour les erreurs
- S'assurer que tous les fichiers sont accessibles
- Changer le nom du cache dans `service-worker.js`

**L'app ne se met pas à jour**
- Désinstaller et réinstaller depuis l'écran d'accueil
- Vider le cache de Safari
- Incrémenter la version dans `service-worker.js`

---

**Version:** 1.0.0  
**Créé pour:** iPhone avec iOS Safari  
**License:** MIT - Libre d'utilisation
