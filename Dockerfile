FROM node:18-alpine

# ติดตั้ง dependencies สำหรับ build
RUN apk add --no-cache bash curl libc6-compat openssl-dev python3 make g++

WORKDIR /app

# คัดลอกเฉพาะ package.json ก่อนเพื่อ cache npm install
COPY package*.json ./

RUN npm install

# ติดตั้ง ts-node สำหรับ live dev
RUN npm install -g ts-node typescript tsconfig-paths

# คัดลอก Prisma schema
COPY prisma ./prisma

# คัดลอก source โค้ด (จะถูก bind mount ทับใน docker-compose dev)
COPY src ./src

# เปิด port NestJS
EXPOSE 3000

# Default command สำหรับ dev
CMD ["sh", "-c", "npx prisma db push && npx ts-node -r tsconfig-paths/register src/main.ts"]
