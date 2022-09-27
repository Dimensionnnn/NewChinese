#! /bin/bash

echo "workdir is ${WORK_DIR}"

screen -dmS web
screen -dmS tokenserver
echo 'opened two screen'


echo 'try to open the web server'
screen -S web -p 0 -X stuff "/bin/bash /root/scripts/open_web_server.sh\n"
echo 'try to open the token server'
screen -S tokenserver -p 0 -X stuff "/bin/bash /root/scripts/open_token_server.sh\n"

while true; 
do 
    sleep 1;
done