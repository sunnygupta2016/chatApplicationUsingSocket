FROM node:14.17.5-alpine  
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8888
CMD node index.js