# FROM node:16-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 4200
# CMD ["npm", "start"]


# FROM node:16-alpine as build
# ENV JQ_VERSION=1.6
# RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
# RUN cp /tmp/jq-linux64 /usr/bin/jq
# RUN chmod +x /usr/bin/jq
# WORKDIR /app
# COPY . .
# RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json > ./src/config.tmp.json && mv ./src/config.tmp.json ./src/config.json
# RUN npm install && npm run build

# FROM nginx:1.17
# ENV JSFOLDER=/usr/share/nginx/html/*.js
# COPY ./start-nginx.sh /usr/bin/start-nginx.sh
# RUN chmod +x /usr/bin/start-nginx.sh
# WORKDIR /usr/share/nginx/html
# #COPY --from=0 /app/dist/frontend .
# COPY --from=build /app/dist/frontend /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# ENTRYPOINT [ "start-nginx.sh" ]
# EXPOSE 80

FROM node:16-alpine AS build

#FOR ENV VARIABLES
ENV JQ_VERSION=1.6
RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
RUN cp /tmp/jq-linux64 /usr/bin/jq
RUN chmod +x /usr/bin/jq

# Create a Virtual directory inside the docker image
WORKDIR /app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json > ./src/config.tmp.json && mv ./src/config.tmp.json ./src/config.json
RUN npm install
RUN npm run build --prod


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi

#FOR ENV VARIABLES
# ENV JSFOLDER=/usr/share/nginx/html/*.js
# COPY ./start-nginx.sh /usr/bin/start-nginx.sh
# RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html

# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container 
# the app will be using Port 80 while running
EXPOSE 80


