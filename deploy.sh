webpack --config ./webpack.production.config.js
mv dist/ ~/dist
git checkout gh-pages
rm -rf dist/
mv ~/dist/ .