FROM node:lts-slim AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm clean-install
COPY src src
RUN npm run build

FROM node:lts-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=build /app/dist .
RUN npm clean-install --omit=dev
CMD ["node", "index.js"]
