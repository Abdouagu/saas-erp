#!/bin/bash
set -e

export PORT=${PORT:-10000}

# Generate nginx config with correct port
envsubst '${PORT}' < /etc/nginx/sites-available/default.template > /etc/nginx/conf.d/app.conf

# Laravel setup
php /app/artisan config:cache
php /app/artisan route:cache
php /app/artisan migrate:fresh --force
php /app/artisan db:seed --force

# Start services
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
