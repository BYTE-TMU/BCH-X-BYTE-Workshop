# .github/workflows/

GitHub Actions CI/CD configuration.

---

## Files

### `deploy.yml`

Automatically builds and deploys the site to GitHub Pages on every push to `main`.

**Trigger:** `push` to `main` branch

**Steps:**
1. Checkout the repository
2. Set up Node.js 20 with npm cache
3. `npm install --legacy-peer-deps`
4. `npm run build` — outputs to `dist/`
5. Publish `dist/` to the `gh-pages` branch using `peaceiris/actions-gh-pages`

**Required GitHub setting (one-time):**
Repository → Settings → Pages → Source → `gh-pages` branch → Save.

**Required permission:**
The workflow uses `permissions: contents: write` to allow the action to push to the `gh-pages` branch. No additional secrets are needed — it uses the default `GITHUB_TOKEN`.

---

## Live URL

Once the `gh-pages` branch is set as the Pages source, the site is available at:

```
https://byte-tmu.github.io/BCH-X-BYTE-Workshop/
```
