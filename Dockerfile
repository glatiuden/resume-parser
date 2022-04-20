FROM node:14
RUN apt-get update && apt-get install -y openjdk-8-jdk
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD [ "npm", "run", "start" ]
