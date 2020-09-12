#!/bin/bash

cd /home/ubuntu/quizzer-server
git reset --hard
git pull
rm -rf node_modules
npm install
cp /home/ubuntu/production.json /home/ubuntu/quizzer-server/config