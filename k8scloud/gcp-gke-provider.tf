# Terraform google cloud multi tier Kubernetes deployment
# Check how configure the provider here:
# https://www.terraform.io/docs/providers/google/index.html

provider "google" {
    # Create/Download your credentials from:
    # Google Console -> "APIs & services -> Credentials"
    credentials = file("./project-manager-g09-6420529a13a8.json")
}