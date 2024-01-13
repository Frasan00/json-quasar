FROM node:20-alpine
WORKDIR /app
COPY *.json .
RUN yarn install
COPY ./test ./test
COPY ./src ./src
EXPOSE 5000
CMD ["yarn", "start"]