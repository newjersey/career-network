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

resource "google_dns_record_set" "txt" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "TXT"
  ttl          = 300

  rrdatas = [
    "\"v=spf1 include:_spf.google.com ~all\"",
    "\"google-site-verification=HOyiY3puLWr3BvvAZ_CJIySdMjMe4kEWcPd2utuKnb4\"",
  ]
}

resource "google_dns_record_set" "mx" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "MX"
  ttl          = 3600

  rrdatas = [
    "1 ASPMX.L.GOOGLE.COM.",
    "5 ALT1.ASPMX.L.GOOGLE.COM.",
    "5 ALT2.ASPMX.L.GOOGLE.COM.",
    "10 ASPMX2.GOOGLEMAIL.COM.",
    "10 ASPMX3.GOOGLEMAIL.COM.",
  ]
}
