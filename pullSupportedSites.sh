#!/bin/bash

cat ~/Documents/github/RecipeParser/lib/RecipeParser/Parser/parsers.ini  | grep ^pattern | sed -n 's/^.*"\(.*\)"$/\1/p' > sites.list
