locals {
  project_name          = "real-time-issue-tracker"
  issue_tracker_ns      = "issue-tracker"
  flux_namespace        = "flux-system"
  default_kubeconfig    = pathexpand("~/.kube/config")
  default_kubecontext   = "kind-real-time-issue-tracker"
}

remote_state {
  backend = "local"

  config = {
    path = "${get_terragrunt_dir()}/terraform.tfstate"
  }
}