FROM node:22-alpine
RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npm run migrate:db && npm run build && npm run start:prod"]