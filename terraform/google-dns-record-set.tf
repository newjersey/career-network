# https://www.terraform.io/docs/providers/google/r/dns_record_set.html

resource "google_dns_record_set" "a" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "A"
  ttl          = 300

  rrdatas = [
    "151.101.1.195",
    "151.101.65.195",
  ]
}

resource "google_dns_record_set" "a_www" {
  name         = "www.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "A"
  ttl          = 300

  rrdatas = [
    "151.101.1.195",
    "151.101.65.195",
  ]
}

resource "google_dns_record_set" "a_preview" {
  name         = "preview.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "A"
  ttl          = 300

  rrdatas = [
    "151.101.1.195",
    "151.101.65.195",
  ]
}

resource "google_dns_record_set" "a_resources" {
  name         = "resources.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "A"
  ttl          = 300

  rrdatas = [
    "151.101.1.195",
    "151.101.65.195",
  ]
}

resource "google_dns_record_set" "a_rgo" {
  name         = "go.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "A"
  ttl          = 300

  rrdatas = [
    "52.72.49.79",
  ]
}
