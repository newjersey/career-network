resource "google_dns_managed_zone" "default" {
  name          = "njcareers-org"
  dns_name      = "njcareers.org."
  description   = "Production NJCN domain."
  visibility    = "public"
  dnssec_config {
    state = "on"
  }
}
