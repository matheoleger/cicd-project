# Projet : Mise en place du CICD dans un environnement Kubernetes pour une application de microservices

## Contexte
Vous travaillez sur le déploiement d'une application composée de microservices dans un environnement Kubernetes. L'application est constituée de quatre services : le frontend React, le service de gestion des ordres, le service utilisateur interagissant avec une base de données MongoDB, et enfin, une instance MongoDB.

## Indication sur le projet

### Comment lancer le projet

Afin de lancer le projet en local, j'ai personnellement utilisé `minikube`.


### À noter

Le repository pour les fichiers de déploiement est disponible à l'adresse suivante : [@matheoleger/microapp-deploy](https://github.com/matheoleger/microapp-deploy)

- Pour Docker
   - Chaque microservices à son `Dockerfile` pour générer une image
   - Chaques images des microservices sont disponible sur [mon profil DockerHub](https://hub.docker.com/u/matheoleger).
   - Il n'y a pas de Dockerfile pour la base de données MongoDB car on peut directement récupérer une image officielle de MongoDB (voir les fichiers manifest de K8S pour la base de données MongoDB)
- Pour Kubernetes
   - Tous les fichiers k8s sont accessible sur le repository [@matheoleger/microapp-deploy](https://github.com/matheoleger/microapp-deploy)
   - La base de donnée est bien un objet `Statefulset` avec un `PersistentVolume`
   - Voici la configuration :
      - Chaques microservices possèdent un fichier `<service>-deployment.yaml` et un `<service>-service.yaml`
      - le service `frontend` est accessible en dehort du cluster via un `NodePort` et accessible au port `31000`.  
        > :bulb: Si vous utilisez `minikube`, vous pouvez récupérer son addresse avec `minikube service frontend-service --url`.
      - `order-service` et `user-service` ont des services de type `ClusterIP` et donc ne sont pas accessible en dehort du cluster.
      - Afin de permettre au `frontend` de faire des requêtes sur les 2 autres services via des requêtes clients, j'ai utilisé un **Ingress Controller** (voir ci-dessous pour la configuration à mettre en place pour le faire fonctionner en local).
      - La base de donnée à un objet service qui permet à la base de donnée d'être accessible seulement à l'intérieur du Cluster et permet donc à `user-service` de se connecter à la BDD.
- Pour ArgoCD
   - Notre application ArgoCD va écouter les changement sur le repo `microapp-deploy` et se synchroniser automatiquement selon les modifications.
- Les différents Github Actions
   - Pour ce repository :
      - J'ai créé plusieurs `jobs` pour le Github Action 
        - Permettant de build les images Docker des différents services et de les push sur les différentes repositories Docker Hub.
        - Un autre job se déclenchant seulement si les 3 images ont bien été build and push. Ce job là permettra de déclencher le Github Action sur le repo `microapp-deploy` en lui donnant la version de l'application (qui correspond à celle des images précédemment build and push).
      - Le Github Action ne se déclenchera seulement lors d'un push sur une branche de version nommé comme ceci `x.x.x` (exemple: `0.6.0`). Ce même nom de branche servira à faire le versionning des images mais aussi de version à envoyer à l'autre Github Action du repository de déploiement.
   - Pour le repository microapp-deploy :
      - Le Github Action sera déclencher lorsqu'il sera triggered par un autre workflow Github Action (donc celui de `cicd-project`)
      - Il va modifier les manifest de déploiements de chaque service afin de modifier le numéro de version des différentes et ainsi permettre de redéclencher une synchronisation pour ArgoCD qui va automatiquement modifier l'application avec les nouvelles images.