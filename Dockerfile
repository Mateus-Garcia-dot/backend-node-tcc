FROM node:16 as builder

COPY . .

RUN npm install

RUN npm run build

FROM node:16-alphine

WORKDIR /app

COPY --from=builder /build /app

CMD ["node", "index.js"]

