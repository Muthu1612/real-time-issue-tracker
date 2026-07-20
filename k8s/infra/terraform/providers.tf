provider "kubernetes" {
  config_path    = pathexpand(var.kubeconfig_path)
  config_context = var.kubeconfig_context
}

provider "kubectl" {
  load_config_file = true
  config_path      = pathexpand(var.kubeconfig_path)
  config_context   = var.kubeconfig_context
  apply_retry_count = 5
}