# agisit23-g9
Carlos Costa 105768
Duarte Costa 105787
Francisco Fiães	105776

## Name
Project Manager Cloud Deployment

## Description
This is a project created to manage software development projects, and enables us to maintain its users and tasks. 

## Installation
Create Docker Images
1. Repository name and tag version are present in the .env file.
2. The command to create images: $ docker-compose -f docker-compose.yaml build
3. The command to push the images into docker hub repositories: $ docker-compose -f docker-compose.yaml push

Deploy to GCP
1. $ cd k8scloud
2. $ terraform plan
3. $ terraform apply