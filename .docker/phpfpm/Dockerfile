FROM php:8.1.8-fpm
RUN apt-get --allow-releaseinfo-change update && apt-get install -y \
    libldap2-dev \
    curl \
    wget \
    git \
    htop \
    cron \
    jpegoptim \
    optipng  \
    pngquant \
    gifsicle \
    gnupg \
    build-essential \
    python3 \
    python3-dev \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    python3-cffi \
    libcairo2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libffi-dev \
    libxml2-dev \
    shared-mime-info \
    libfreetype6-dev \
    libwebp-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    libzip-dev \
    libmcrypt-dev \
    libjudy-dev \
    zip \
    unzip \
    nano \
    graphicsmagick \
    imagemagick \
    ghostscript \
    redis-tools \
    cron \
    supervisor \
    default-mysql-client

RUN curl -sSLf \
        -o /usr/local/bin/install-php-extensions \
        https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions && \
    chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions gd xdebug redis ldap soap bcmath exif iconv mbstring mysqli pdo_mysql zip xml simplexml xmlreader pcntl sodium

RUN pip3 install weasyprint

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir /var/log/php
RUN chmod 777 -R /var/log/php

RUN mkdir /var/www/backend
RUN chmod 777 -R /var/www

WORKDIR /var/www/backend

COPY entrypoint.sh /root/entrypoint.sh
RUN chmod 777 /root/entrypoint.sh
CMD /root/entrypoint.sh
