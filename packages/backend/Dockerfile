FROM node:22

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]