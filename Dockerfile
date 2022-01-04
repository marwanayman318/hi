FROM node:latest
WORKDIR /app
RUN chown -R root:$(whoami) /app
RUN chmod -R 777 /app/
COPY package*.json /app/
COPY . .
RUN npm install
EXPOSE 4200
CMD npm start
