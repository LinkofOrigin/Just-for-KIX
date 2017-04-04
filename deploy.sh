webpack --config ./webpack.production.config.js
mv dist/ ~/dist
git stash
git checkout gh-pages
rm -rf dist/
mv ~/dist/ .