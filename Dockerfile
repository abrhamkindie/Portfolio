# syntax=docker/dockerfile:1

# --- Frontend assets -------------------------------------------------------
FROM node:22-alpine AS assets
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- PHP dependencies ------------------------------------------------------
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-progress --no-scripts --no-autoloader
COPY . .
RUN composer dump-autoload --no-dev --optimize --no-interaction

# --- Runtime ---------------------------------------------------------------
FROM php:8.3-fpm-alpine AS app

RUN apk add --no-cache nginx postgresql-dev libzip-dev icu-dev \
    && docker-php-ext-install -j"$(nproc)" pdo_pgsql bcmath intl zip opcache \
    && rm -rf /var/cache/apk/*

# Production PHP settings: cached bytecode, room for image uploads.
RUN { \
        echo 'opcache.enable=1'; \
        echo 'opcache.memory_consumption=128'; \
        echo 'opcache.max_accelerated_files=20000'; \
        echo 'opcache.validate_timestamps=0'; \
        echo 'upload_max_filesize=12M'; \
        echo 'post_max_size=12M'; \
    } > /usr/local/etc/php/conf.d/zz-app.ini

WORKDIR /var/www/html

COPY --from=vendor --chown=www-data:www-data /app /var/www/html
COPY --from=assets --chown=www-data:www-data /app/public/build /var/www/html/public/build

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint

RUN chmod +x /usr/local/bin/entrypoint \
    && mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["entrypoint"]
