output "issue_tracker_namespace" {
  description = "Namespace created for the application."
  value       = kubernetes_namespace.issue_tracker.metadata[0].name
}

output "flux_namespace" {
  description = "Namespace created for Flux."
  value       = kubernetes_namespace.flux_system.metadata[0].name
}

output "git_repository_name" {
  description = "Flux GitRepository name."
  value       = "real-time-issue-tracker"
}

output "kustomization_name" {
  description = "Flux Kustomization name."
  value       = "real-time-issue-tracker-apps"
}