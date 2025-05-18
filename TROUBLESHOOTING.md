## Troubleshooting

### If your changes don't appear on the live site:
1. Check if the deployment was successful by running `npm run deploy` again
2. Verify that GitHub Pages is configured to serve from the gh-pages branch in your repository settings
3. Clear your browser cache or try viewing in an incognito/private window
4. Allow 5-10 minutes for GitHub Pages to update

### If images or assets are not loading:
1. Make sure all file paths are relative (start with `./` or directly with the folder name)
2. Check that you're using the correct file names (case sensitive)
3. Confirm that all assets have been pushed to the repository

### If the deployment process fails:
1. Ensure you have the correct permissions to the repository
2. Check that the gh-pages package is properly installed: `npm install --save-dev gh-pages`
3. Verify your git configuration: `git config --list`
