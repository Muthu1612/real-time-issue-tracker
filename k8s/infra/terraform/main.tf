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

resource "helm_release" "flux2" {
  name             = "flux2"
  repository       = "https://fluxcd-community.github.io/helm-charts"
  chart            = "flux2"
  namespace        = kubernetes_namespace.flux_system.metadata[0].name
  create_namespace = false
  atomic           = true
  cleanup_on_fail  = true
  wait             = true

  depends_on = [kubernetes_namespace.flux_system]
}

resource "kubectl_manifest" "git_repository" {
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

  depends_on = [helm_release.flux2]
}

resource "kubectl_manifest" "app_kustomization" {
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