resource "kubernetes_service" "frontend" {
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
    port {
      port        = 80
    }

    selector = {
      "io.kompose.service" = "frontend"
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_service" "mongo" {
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
    port {
      name        = "27017"
      port        = 27017
      target_port = "27017"
    }

    selector = {
      "io.kompose.service" = "mongo"
    }

    type = "NodePort"
  }
}

resource "kubernetes_service" "project" {
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
    port {
      name        = "3019"
      port        = 3019
      target_port = "3019"
    }

    selector = {
      "io.kompose.service" = "project"
    }
  }
}

resource "kubernetes_service" "task" {
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
    port {
      name        = "3020"
      port        = 3020
      target_port = "3020"
    }

    selector = {
      "io.kompose.service" = "task"
    }
  }
}

resource "kubernetes_service" "user" {
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
    port {
      name        = "3021"
      port        = 3021
      target_port = "3021"
    }

    selector = {
      "io.kompose.service" = "user"
    }
  }
}