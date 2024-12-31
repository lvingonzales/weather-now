#!/bin/bash
echo -n enter branch to merge
read -r branchToMerge

git checkout develop
git merge --no-ff $branchToMerge
git branch -d $branchToMerge
git push origin develop
