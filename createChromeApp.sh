#!/bin/bash

rm -rf dist
mkdir dist
rsync --exclude dist --exclude .DS_Store --exclude bower_components --exclude .idea --exclude .git --exclude .gitignore --exclude pullSupportedSites.sh --exclude sites.list --exclude *.sh -av . dist

mv dist RecipeCalCalc
zip -r recipecalcalc.zip RecipeCalCalc