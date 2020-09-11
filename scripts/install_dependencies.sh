#!/bin/bash

cd /home/ubuntu/quizzer-server
git reset --hard
git pull origin master
yarn -i
cp /home/ubuntu/production.json /home/ubuntu/quizzer-server/config
exit $?