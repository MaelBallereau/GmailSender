FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
    git curl bash zip unzip \
    libzip-dev icu-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/backend

COPY composer.json composer.lock* ./
RUN composer install --no-scripts --no-autoloader --prefer-dist 2>/dev/null || true

COPY . .
RUN composer install --prefer-dist --optimize-autoloader \
    && chmod +x bin/console

EXPOSE 9000
CMD ["php-fpm"]
