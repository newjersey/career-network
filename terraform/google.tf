provider "google" {
  # https://console.cloud.google.com/iam-admin/serviceaccounts
  credentials = "${file("credentials/nj-career-network-9b89423c38b1.json")}"
  project     = "nj-career-network"
  region      = "nam5"
}
