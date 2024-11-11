FROM node:18.18-slim

# Setting up the work directory
WORKDIR /express-docker
# Copying all the files in our project
COPY . .

RUN npm install

EXPOSE 3021

CMD [ "npm", "run", "start" ]