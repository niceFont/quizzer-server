FROM mysql:latest
ENV MYSQL_DATABASE quizzer 
ENV MYSQL_USER user
ENV MYSQL_PASSWORD password
ENV MYSQL_ROOT_PASSWORD root

ADD script.sql /docker-entrypoint-initdb.d