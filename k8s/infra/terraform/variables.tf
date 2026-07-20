variable "kubeconfig_path" {
  description = "Path to the kubeconfig file used by Terraform."
  type        = string
  default     = "~/.kube/config"
}

variable "kubeconfig_context" {
  description = "Kubeconfig context Terraform should target."
  type        = string
  default     = "kind-real-time-issue-tracker"
}

variable "issue_tracker_namespace" {
  description = "Namespace used for the application."
  type        = string
  default     = "issue-tracker"
}

variable "flux_namespace" {
  description = "Namespace used by Flux controllers and GitOps objects."
  type        = string
  default     = "flux-system"
}

variable "git_repository_url" {
  description = "Remote Git repository URL that Flux should reconcile."
  type        = string
}

variable "git_repository_branch" {
  description = "Branch Flux should track."
  type        = string
  default     = "main"
}

variable "git_repository_path" {
  description = "Path in the Git repository that Flux should reconcile."
  type        = string
  default     = "./k8s/apps/api/overlays/local"
}