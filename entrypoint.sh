#!/bin/sh
set -e

TARGET=/app/traildepot
SEED=/seed/traildepot

echo "Sync traildepot → volume"

if [ -z "$(ls -A "$TARGET")" ]; then
    echo "Initializing volume..."
fi

rm -rf "$TARGET/migrations/"
cp -r "$SEED/migrations/" "$TARGET/migrations/"

rm -rf "$TARGET/dist/"
cp -r "$SEED/dist/" "$TARGET/dist/"

cp -f "$SEED/config.textproto" "$TARGET/config.textproto"

echo "Running Trailbase..."
exec "$@"
