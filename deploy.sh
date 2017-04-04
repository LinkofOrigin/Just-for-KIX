webpack --config ./webpack.production.config.js
mv dist/ ~/dist
git stash
git checkout gh-pages
rm -rf dist/
mv ~/dist/ .
git commit -m "deploying!"
git push
git checkout master
git stash pop