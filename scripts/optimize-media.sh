#!/usr/bin/env bash
# Regenerates optimized hero media from the master file in assets/.
# Usage: bash scripts/optimize-media.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MASTER="$ROOT/assets/hero-banner.mp4"
OUT="$ROOT/public/videos"
POSTER_TIME="${POSTER_TIME:-4}"

if [[ ! -f "$MASTER" ]]; then
  echo "Master video not found: $MASTER" >&2
  exit 1
fi

for tool in ffmpeg cwebp; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "Missing required tool: $tool" >&2
    exit 1
  fi
done

mkdir -p "$OUT"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Encoding desktop video (1920x1392 @ 30fps)..."
ffmpeg -y -v error -i "$MASTER" \
  -vf "scale=1920:-2" \
  -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an \
  "$OUT/hero-banner.webm"
ffmpeg -y -v error -i "$MASTER" \
  -vf "scale=1920:-2" \
  -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p -an -movflags +faststart \
  "$OUT/hero-banner.mp4"

echo "Encoding mobile video (1280x928 @ 30fps)..."
ffmpeg -y -v error -i "$MASTER" \
  -vf "scale=1280:-2" \
  -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an \
  "$OUT/hero-banner-mobile.webm"
ffmpeg -y -v error -i "$MASTER" \
  -vf "scale=1280:-2" \
  -c:v libx264 -crf 28 -preset slow -profile:v high -pix_fmt yuv420p -an -movflags +faststart \
  "$OUT/hero-banner-mobile.mp4"

echo "Extracting poster frame..."
ffmpeg -y -v error -ss "$POSTER_TIME" -i "$MASTER" -frames:v 1 -vf "scale=1920:-2" "$TMP/poster-1920.png"
cwebp -quiet -q 80 "$TMP/poster-1920.png" -o "$OUT/hero-banner-poster.webp"

echo "Done. Output in $OUT:"
ls -lh "$OUT"
