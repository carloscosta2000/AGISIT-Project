resource "kubernetes_deployment" "frontend" {
  metadata {
    name = "frontend"

    labels = {
      "io.kompose.service" = "frontend"
    }

    annotations = {
      "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert -f docker-compose.yaml"

      "kompose.version" = "1.21.0 (992df58d8)"
    }
    namespace = kubernetes_namespace.application.id
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        "io.kompose.service" = "frontend"
      }
    }

    template {
      metadata {
        labels = {
          "io.kompose.network/projects-manager" = "true"

          "io.kompose.service" = "frontend"
        }

        annotations = {
          "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert -f docker-compose.yaml"

          "kompose.version" = "1.21.0 (992df58d8)"
        }
      }

      spec {
        container {
          name  = "frontend"
          image = "ffiaesist/pm-frontend:1.0.0"

          port {
            container_port = 80
          }

          env {
            name  = "BASE_URL"
            value = "http://backend:3019/"
          }

          env {
            name  = "ENV"
            value = "prod"
          }
        }

        restart_policy = "Always"
      }
    }
  }

  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.application
  ]
}

resource "kubernetes_config_map" "create_mongodb_configmap" {
  metadata {
    name      = "create-mongodb-configmap1"
    namespace = kubernetes_namespace.application.id
  }

  data = {
    "mongo-init.js" = <<EOF
    db.createUser(
      {
        user: "project",
        pwd: "UenbhkDgE1sSUkyQUE8",
        roles: [
          {
            role: "readWrite",
            db: "agisit023"
          }
        ]
      }
    );
    db.createUser(
      {
        user: "task",
        pwd: "zYXm7HJNpsNPsTBte4",
        roles: [
          {
            role: "readWrite",
            db: "agisit023"
          }
        ]
      }
    );
    db.createUser(
      {
        user: "user",
        pwd: "ynIxj882Uo53mDFGs",
        roles: [
          {
            role: "readWrite",
            db: "agisit023"
          }
        ]
      }
    );
      db.createCollection('users');
      db.users.insertOne(
        {
          username: 'Admin1',
          password: 'Aa123456',
          isAdmin: true
        }
      );
      db.users.insertOne(
        {
          username: 'User1',
          password: 'Bb123456',
          isAdmin: false
        }
      );
      EOF
  }
}

resource "kubernetes_storage_class" "gold" {
  metadata {
    name = "gold"
  }
  storage_provisioner = "kubernetes.io/gce-pd"
  parameters = {
    fstype = "ext4"

    replication-type = "none"

    type = "pd-standard"
  }

  reclaim_policy         = "Delete"
  allow_volume_expansion = true
  volume_binding_mode    = "Immediate"
}

resource "kubernetes_persistent_volume_claim" "mongodb_storage" {
  metadata {
    name = "mongodb-storage"
    namespace = kubernetes_namespace.application.id
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "2Gi"
      }
    }

    storage_class_name = "gold"
  }
}


resource "kubernetes_deployment" "mongo" {
  metadata {
    name = "mongo"

    labels = {
      "io.kompose.service" = "mongo"
    }

    annotations = {
      "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert"

      "kompose.version" = "1.21.0 (992df58d8)"
    }
    namespace = kubernetes_namespace.application.id
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "io.kompose.service" = "mongo"
      }
    }

    template {
      metadata {
        labels = {
          "io.kompose.network/projects-manager" = "true"

          "io.kompose.service" = "mongo"
        }

        annotations = {
          "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert"

          "kompose.version" = "1.21.0 (992df58d8)"
        }
      }

      spec {
        volume {
          name = "mongo-db-volume"

          persistent_volume_claim {
            claim_name = "mongodb-storage"
          }
        }

        volume {
          name = "init-database"

          config_map {
            name = "create-mongodb-configmap1"
          }
        }

        container {
          name  = "mongo"
          image = "mongo"

          port {
            container_port = 27017
          }

          env {
            name  = "MONGO_INITDB_DATABASE"
            value = "agisit023"
          }

          env {
            name  = "MONGO_INITDB_ROOT_PASSWORD"
            value = "example"
          }

          env {
            name  = "MONGO_INITDB_ROOT_USERNAME"
            value = "root"
          }

          volume_mount {
            name       = "init-database"
            mount_path = "/docker-entrypoint-initdb.d/"
          }

          volume_mount {
            name       = "mongo-db-volume"
            mount_path = "/data/db"
          }
        }

        restart_policy = "Always"
      }
    }

    strategy {
      type = "Recreate"
    }
  }
  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.application
  ]
}

resource "kubernetes_deployment" "project" {
  metadata {
    name = "project"

    labels = {
      "io.kompose.service" = "project"
    }

    annotations = {
      "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert -f docker-compose.yaml"

      "kompose.version" = "1.21.0 (992df58d8)"
    }

    namespace = kubernetes_namespace.application.id
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "io.kompose.service" = "project"
      }
    }

    template {
      metadata {
        labels = {
          "io.kompose.network/projects-manager" = "true"

          "io.kompose.service" = "project"
        }

        annotations = {
          "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert -f docker-compose.yaml"

          "kompose.version" = "1.21.0 (992df58d8)"
        }
      }

      spec {
        container {
          name  = "project"
          image = "ffiaesist/pm-project:1.0.0"

          port {
            container_port = 3019
          }

          env {
            name  = "MONGO_URL"
            value = "mongodb://project:UenbhkDgE1sSUkyQUE8@mongo:27017/agisit023?directConnection=true"
          }
        }

        restart_policy = "Always"
      }
    }
  }
  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.application
  ]
}

resource "kubernetes_deployment" "user" {
  metadata {
    name = "user"

    labels = {
      "io.kompose.service" = "user"
    }

    annotations = {
      "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert -f docker-compose.yaml"

      "kompose.version" = "1.21.0 (992df58d8)"
    }

    namespace = kubernetes_namespace.application.id
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "io.kompose.service" = "user"
      }
    }

    template {
      metadata {
        labels = {
          "io.kompose.network/projects-manager" = "true"

          "io.kompose.service" = "user"
        }

        annotations = {
          "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert -f docker-compose.yaml"

          "kompose.version" = "1.21.0 (992df58d8)"
        }
      }

      spec {
        container {
          name  = "user"
          image = "ffiaesist/pm-user:1.0.0"

          port {
            container_port = 3021
          }

          env {
            name  = "MONGO_URL"
            value = "mongodb://user:ynIxj882Uo53mDFGs@mongo:27017/agisit023?directConnection=true"
          }
        }

        restart_policy = "Always"
      }
    }
  }
  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.application
  ]
}

resource "kubernetes_deployment" "task" {
  metadata {
    name = "task"

    labels = {
      "io.kompose.service" = "task"
    }

    annotations = {
      "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert -f docker-compose.yaml"

      "kompose.version" = "1.21.0 (992df58d8)"
    }

    namespace = kubernetes_namespace.application.id
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "io.kompose.service" = "task"
      }
    }

    template {
      metadata {
        labels = {
          "io.kompose.network/projects-manager" = "true"

          "io.kompose.service" = "task"
        }

        annotations = {
          "kompose.cmd" = "/snap/kompose/19/kompose-linux-amd64 convert -f docker-compose.yaml"

          "kompose.version" = "1.21.0 (992df58d8)"
        }
      }

      spec {
        container {
          name  = "task"
          image = "ffiaesist/pm-task:1.0.0"

          port {
            container_port = 3020
          }

          env {
            name  = "MONGO_URL"
            value = "mongodb://task:zYXm7HJNpsNPsTBte4@mongo:27017/agisit023?directConnection=true"
          }
        }

        restart_policy = "Always"
      }
    }
  }
  
  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.application
  ]
}