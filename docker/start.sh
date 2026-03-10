#!/bin/bash

export PORT=${PORT:-10000}

# Generate nginx config with correct port
envsubst '${PORT}' < /etc/nginx/sites-available/default.template > /etc/nginx/conf.d/app.conf

# Cache config (fast, no DB needed)
php /app/artisan config:cache || true
php /app/artisan route:cache  || true

# Run migrations in background so nginx starts immediately
(sleep 5 && php /app/artisan migrate --force) &

# Start nginx + php-fpm right away (port binds immediately)
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
