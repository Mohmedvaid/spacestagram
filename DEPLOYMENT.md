# Deployment Guide

This project is configured to deploy to GitHub Pages at `https://mohmedvaid.github.io/spacestagram/`

## Automatic Deployment

The project uses GitHub Actions to automatically deploy when changes are pushed to the `main` branch.

### How it works:

1. **Trigger**: Pushes to the `main` branch automatically trigger the deployment workflow
2. **Build**: The workflow builds the Next.js static site with the correct basePath (`/spacestagram`)
3. **Deploy**: The built files are copied to the `gh-pages` branch in the `spacestagram/` subdirectory
4. **Result**: The site is available at `https://mohmedvaid.github.io/spacestagram/`

### Important Notes:

- ✅ Only deploys from the `main` branch (protects your portfolio site at root)
- ✅ Deploys to `/spacestagram/` subdirectory (doesn't affect root)
- ✅ Uses static export (no server required)
- ✅ All assets are properly prefixed with `/spacestagram/`

## Manual Deployment

If you need to deploy manually:

```bash
# Build the project
npm run build

# The output will be in the `out/` directory
# You can then manually copy it to your gh-pages branch
```

## GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "Deploy from a branch"
4. Select `gh-pages` branch
5. Set folder to `/ (root)`

The workflow will automatically handle the subdirectory structure.

## Troubleshooting

- If deployment fails, check the Actions tab in GitHub
- Ensure the `gh-pages` branch exists (the workflow will create it if needed)
- Verify that GitHub Actions has write permissions to your repository

