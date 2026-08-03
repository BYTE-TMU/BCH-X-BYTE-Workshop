# .github/workflows/

GitHub Actions CI/CD configuration.

---

## Files

### `deploy.yml`

Builds the site on every pull request, and builds **and deploys** on every push to `main`.

**Triggers:**
- `pull_request` targeting `main` — build only, acting as a required check so a broken build never reaches `main`
- `push` to `main` — build and publish

**Steps:**
1. Checkout the repository
2. Set up Node.js 20 with npm cache
3. `npm install --legacy-peer-deps`
4. `npm run build` — outputs to `dist/`
5. Publish `dist/` to the `gh-pages` branch using `peaceiris/actions-gh-pages`

Step 5 is guarded by `if: github.event_name == 'push' && github.ref == 'refs/heads/main'`, so pull requests stop after the build.

**Required GitHub setting (one-time):**
Repository → Settings → Pages → Source → `gh-pages` branch → Save.

**Required permission:**
The workflow uses `permissions: contents: write` to allow the action to push to the `gh-pages` branch. No additional secrets are needed — it uses the default `GITHUB_TOKEN`.

There is no lint or test step, because the project has neither configured. The build is the only automated check.

---

## Live URL

Once the `gh-pages` branch is set as the Pages source, the site is available at:

```
https://byte-tmu.github.io/BCH-X-BYTE-Workshop/
```
