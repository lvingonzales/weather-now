#!/bin/bash
echo enter branch to merge
read $branchToMerge

git checkout develop
git merge --no-ff $branchToMerge
git branch -d $branchToMerge
git push origin develop
