# Projet : Mise en place du CICD dans un environnement Kubernetes pour une application de microservices

## Contexte
Vous travaillez sur le déploiement d'une application composée de microservices dans un environnement Kubernetes. L'application est constituée de quatre services : le frontend React, le service de gestion des ordres, le service utilisateur interagissant avec une base de données MongoDB, et enfin, une instance MongoDB.

## Étapes du Projet :

**1. Configuration en Local :**
   - Configurez et testez l'application en microservices localement.
   - Assurez-vous que les services communiquent correctement entre eux en utilisant les noms de services suivants :
     - `frontend` pour le frontend React,
     - `order-service` pour le service de gestion des ordres,
     - `user-service` pour le service utilisateur,
     - `mongo-service` pour la base de données MongoDB.

**2. Dockerization :**
   - Rédigez des fichiers Dockerfile pour chacun des trois services développés.
   - Assurez-vous que les images construites sont stockées dans un repository privé. Vous pouvez utiliser votre compte privé DockerHub pour cela.

**3. Mise en place du Pipeline CI :**
   - Utilisez votre outil CI préféré pour mettre en place un pipeline qui construit les images de chaque service à partir des Dockerfiles.
   - Assurez-vous que les images sont correctement poussées dans le repository privé.

**4. Versioning :**
   - Mettez en place un second pipeline qui se déclenche automatiquement lors de la création d'une branche correspondant à la version de l'application (ex : `2.0.0`) et lorsque le code est poussé dans cette branche.
   - Ce pipeline doit construire des images avec des tags correspondant à la version (ex : `dockerhubloginname/user-service:2.0.0`) et les pousser dans le repository privé.

**5. Déploiement dans Kubernetes :**
   - Effectuez une mise à jour des fichiers de déploiement Kubernetes pour refléter les nouvelles images.
   - Poussez ces fichiers de déploiement dans un repository Git séparé, nommé `microapp-deploy`.

**6. Déploiement avec ArgoCD :**
   - Configurez une installation d'ArgoCD sur le cluster Kubernetes.
   - Faites en sorte qu'ArgoCD récupère automatiquement les fichiers de déploiement du repository Git `microapp-deploy` et les déploie sur le cluster.

**Livraison :**
   - Documentez le processus complet et assurez-vous que l'équipe puisse suivre et reproduire les étapes de déploiement.
   - Assurez-vous que le CICD est opérationnel, garantissant un déploiement automatisé et cohérent de l'application dans l'environnement Kubernetes.

## Exigences du projet

- Tous les microservices doivent s'exécuter en environement de conteneurisation
- la base de données MongoDB doit être un Object StatefulSet avec une persistance de donnée
- Le microservice frontend doit être accessible en dehors du cluster Kubernetes (en utilisant un service `NodePort` ou `LoadBalancer`)

## Bonus 

- Refaites l'étape 5 sans intervention manuelle en utilisant un pipeline ou un outil d'automatisation.
- Sécurisez l'accès à la base de donnée à l'aide d'un mot de passe que vous allez créer avec l'objet `secret` de Kuberenetes.