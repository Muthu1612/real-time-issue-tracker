resource "kubernetes_namespace" "issue_tracker" {
  metadata {
    name = var.issue_tracker_namespace
  }
}

resource "kubernetes_namespace" "flux_system" {
  metadata {
    name = var.flux_namespace
  }
}

resource "null_resource" "flux_install" {
  triggers = {
    version = "v2.9.1"
  }

  provisioner "local-exec" {
    interpreter = ["PowerShell", "-Command"]
    command     = "kubectl apply -f https://github.com/fluxcd/flux2/releases/download/v2.9.1/install.yaml"
  }

  depends_on = [kubernetes_namespace.flux_system]
}

resource "kubectl_manifest" "git_repository" {
  validate_schema = false

  yaml_body = <<-YAML
    apiVersion: source.toolkit.fluxcd.io/v1
    kind: GitRepository
    metadata:
      name: real-time-issue-tracker
      namespace: ${kubernetes_namespace.flux_system.metadata[0].name}
    spec:
      interval: 1m
      url: ${var.git_repository_url}
      ref:
        branch: ${var.git_repository_branch}
  YAML

  depends_on = [null_resource.flux_install]
}

resource "kubectl_manifest" "app_kustomization" {
  validate_schema = false

  yaml_body = <<-YAML
    apiVersion: kustomize.toolkit.fluxcd.io/v1
    kind: Kustomization
    metadata:
      name: real-time-issue-tracker-apps
      namespace: ${kubernetes_namespace.flux_system.metadata[0].name}
    spec:
      interval: 5m
      path: ${var.git_repository_path}
      prune: true
      wait: true
      sourceRef:
        kind: GitRepository
        name: real-time-issue-tracker
      targetNamespace: ${kubernetes_namespace.issue_tracker.metadata[0].name}
  YAML

  depends_on = [kubectl_manifest.git_repository, kubernetes_namespace.issue_tracker]
}