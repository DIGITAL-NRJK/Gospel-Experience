# Guide de contribution — Gospel Expérience

## Workflow Git

Ce projet utilise **GitHub Flow** : une branche `main` stable, des branches temporaires pour chaque changement.

### Règle d'or
**On ne push jamais directement sur `main`.** Chaque modification passe par une branche → Pull Request → merge.

---

## Créer une branche

```bash
# 1. Se mettre à jour
git checkout main
git pull

# 2. Créer une branche avec un nom descriptif
git checkout -b feat/nom-de-la-feature
```

### Convention de nommage des branches

| Préfixe | Usage | Exemple |
|---------|-------|---------|
| `feat/` | Nouvelle fonctionnalité | `feat/countdown-bar` |
| `fix/` | Correction de bug | `fix/hydration-button` |
| `chore/` | Maintenance, dépendances | `chore/upgrade-next-17` |
| `content/` | Ajout de contenu | `content/article-3e-edition` |
| `style/` | CSS, design | `style/responsive-galerie` |
| `docs/` | Documentation | `docs/readme-setup` |

---

## Commits

Utiliser le format **Conventional Commits** :

```
type(scope): description courte
```

### Exemples
```bash
git commit -m "feat(hero): add conditional hero by site mode"
git commit -m "fix(events): handle legacy string eventType"
git commit -m "chore(deps): upgrade next-sanity to v12"
git commit -m "style(homepage): reorder sections backgrounds"
git commit -m "content(blog): add 3e edition article"
```

### Types autorisés
- `feat` — nouvelle fonctionnalité
- `fix` — correction de bug
- `chore` — maintenance
- `style` — CSS, formatage (pas de changement de logique)
- `docs` — documentation
- `refactor` — restructuration sans changement de comportement
- `content` — ajout/modification de contenu

---

## Pull Request

```bash
# 1. Pousser la branche
git push -u origin feat/nom-de-la-feature

# 2. Ouvrir une PR sur GitHub
#    → Le template de PR se remplit automatiquement
#    → Netlify crée un Deploy Preview automatiquement

# 3. Vérifier le Deploy Preview
#    → Tester visuellement que tout fonctionne

# 4. Merger la PR sur GitHub (bouton "Merge pull request")

# 5. Supprimer la branche sur GitHub (bouton proposé après merge)

# 6. En local, revenir sur main et nettoyer
git checkout main
git pull
git branch -d feat/nom-de-la-feature
```

---

## Structure du projet

```
├── sanity/              # Schémas Sanity (CMS)
│   └── schemas/
├── src/
│   ├── app/             # Pages Next.js
│   ├── components/      # Composants réutilisables
│   ├── lib/             # Clients, queries, utilitaires
│   └── styles/          # CSS global
├── public/              # Assets statiques
├── .github/             # Templates PR
└── CONTRIBUTING.md      # Ce fichier
```

---

## Déploiement

- **Production** : chaque merge dans `main` déclenche un déploiement Netlify automatique
- **Preview** : chaque PR ouverte génère un Deploy Preview avec une URL temporaire
- **Studio** : accessible à `/studio` sur le site déployé
