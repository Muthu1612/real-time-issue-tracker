include {
  path = find_in_parent_folders()
}

terraform {
  source = "../../terraform"
}

inputs = {
  kubeconfig_path        = "~/.kube/config"
  kubeconfig_context     = "kind-real-time-issue-tracker"
  issue_tracker_namespace = "issue-tracker"
  flux_namespace         = "flux-system"
  git_repository_url     = "https://github.com/Muthu1612/real-time-issue-tracker.git"
  git_repository_branch  = "feature/rewrite-in-go"
  git_repository_path    = "./k8s/apps/api/overlays/local"
}