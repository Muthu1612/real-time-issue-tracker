# GitOps Infra

This folder holds the Terraform and Terragrunt code used to bootstrap cluster resources for the local kind environment and to hand app reconciliation over to Flux CD.

## Structure

- `terraform/` - Terraform root module that installs Flux controllers and creates cluster resources such as namespaces and Flux objects.
- `terragrunt.hcl` - Shared Terragrunt configuration.
- `live/local/terragrunt.hcl` - Local environment entrypoint.

## Flow

1. Create the kind cluster from `k8s/cluster/kind-config.yaml`.
2. Run Terragrunt from `k8s/infra/live/local`.
3. Terraform installs Flux controllers and creates the Flux `GitRepository` and `Kustomization` objects.
4. Flux reconciles the app overlay in `k8s/apps/api/overlays/local`.

## Notes

- Replace the Git repository URL in the local Terragrunt inputs with your own remote repository.
- The Helm chart under `k8s/apps/api/chart` packages the backend as a reusable artifact.
- The Kustomize overlay under `k8s/apps/api/overlays/local` is the path Flux watches.