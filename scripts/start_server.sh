#!/bin/bash
cd /home/ubuntu/quizzer-server
NODE_ENV=production node index.js > app.out.log 2> app.err.log < /dev/null & 
