terraform {
  required_version = ">= 1.8.0"

  backend "local" {}

  required_providers {
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.15"
    }

    kubectl = {
      source  = "gavinbunney/kubectl"
      version = "~> 1.14"
    }

    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.33"
    }
  }
}