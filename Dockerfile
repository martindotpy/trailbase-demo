FROM oven/bun:1-slim AS builder

WORKDIR /app

# Typescript
COPY tsconfig.json ./

# Install dependencies
COPY bun.lock ./
COPY package.json ./

RUN bun install --ci

# Build the project
COPY index.html ./
COPY public/ public/
COPY vite.config.ts ./
COPY src/ src/

RUN bun run build


FROM trailbase/trailbase:latest AS runtime

COPY --chmod=0755 entrypoint.sh /entrypoint.sh

WORKDIR /seed/traildepot

COPY traildepot/config.textproto ./
COPY traildepot/migrations/ migrations/
COPY --from=builder /app/dist/ dist/

WORKDIR /app

ENTRYPOINT ["tini", "--", "/entrypoint.sh"]
CMD ["/app/trail", "--data-dir", "/app/traildepot", "run", "--address", "0.0.0.0:4000"]
