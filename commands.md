(sudo docker context use default)
minikube start --driver=virtualbox 

kubectl create configmap create-mongodb-configmap --from-file=./mongo-init.js
kubectl apply -f deployments
kubectl apply -f services

minikube service frontend

###########################################################

kubectl delete deployment --all
kubectl delete service --all
kubectl delete pods --all

##########################################################

mongosh -u root

kubectl  exec -it deployments/mongo -- bash
mongo admin -u root -password
use agisit023;
db.getCollectionNames()