FROM node:18 AS build
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --production=false

COPY src/ ./src/
RUN npm run build

FROM node:18-slim AS runtime
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       chromium \
       chromium-driver \
       fonts-liberation \
       libappindicator3-1 \
       libasound2 \
       libatk-bridge2.0-0 \
       libatk1.0-0 \
       libc6 \
       libdbus-1-3 \
       libgtk-3-0 \
       libnspr4 \
       libnss3 \
       libx11-xcb1 \
       libxcomposite1 \
       libxcursor1 \
       libxdamage1 \
       libxrandr2 \
       libxss1 \
       libxtst6 \
       libgbm1 \
    && ln -s /usr/bin/chromium /usr/bin/google-chrome \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV CHECK_INTERVAL_MINUTES=60

CMD ["node", "dist/app.js"]
