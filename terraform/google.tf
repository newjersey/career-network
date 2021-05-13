provider "google" {
  # https://console.cloud.google.com/iam-admin/serviceaccounts
  credentials = file("credentials/nj-career-network-7e8a2bf86959.json")
  project     = "nj-career-network"
  region      = "nam5"
}
