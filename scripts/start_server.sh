#!/bin/bash
cd /home/ubuntu/quizzer-server
NODE_ENV=production node index.js /dev/null 2> /dev/null < /dev/null &
exit 1 
