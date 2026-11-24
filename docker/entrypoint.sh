#!/bin/sh
set -e

PORT="${PORT:-8080}"

sed -i "s/__PORT__/${PORT}/g" /etc/nginx/http.d/default.conf

mkdir -p \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

php artisan config:cache
php artisan view:cache

# Only used when uploads fall back to the local disk (no AWS_BUCKET set).
php artisan storage:link >/dev/null 2>&1 || true

# Migrate on boot so a fresh database is ready. Retries cover a database that
# is still waking up (Neon suspends idle databases).
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    attempt=1
    until php artisan migrate --force; do
        if [ "$attempt" -ge 5 ]; then
            echo "Migrations failed after ${attempt} attempts" >&2
            exit 1
        fi
        echo "Migration attempt ${attempt} failed; retrying in 5s..." >&2
        attempt=$((attempt + 1))
        sleep 5
    done
fi

php-fpm -D
exec nginx -g 'daemon off;'
