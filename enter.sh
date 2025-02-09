#!/bin/bash
if [ -n "$1" ]
then
  NAME=$1
else
  NAME='phpfpm'
fi
CONTAINER=$(docker ps -qf "name=$NAME")
docker exec -it ${CONTAINER} bash -c "
  composer install &&
  chmod 777 -R storage &&
  php artisan migrate &&
  php artisan key:generate
"