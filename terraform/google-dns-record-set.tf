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

resource "google_dns_record_set" "cname_firebase1__domainkey" {
  name         = "firebase1._domainkey.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "CNAME"
  ttl          = 3600
  rrdatas      = ["mail-njcareers-org.dkim1._domainkey.firebasemail.com."]
}

resource "google_dns_record_set" "cname_firebase2__domainkey" {
  name         = "firebase2._domainkey.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "CNAME"
  ttl          = 3600
  rrdatas      = ["mail-njcareers-org.dkim2._domainkey.firebasemail.com."]
}

resource "google_dns_record_set" "txt" {
  name         = google_dns_managed_zone.default.dns_name
  managed_zone = google_dns_managed_zone.default.name
  type         = "TXT"
  ttl          = 300

  rrdatas = [
    "\"firebase=nj-career-network\"",
    "\"v=spf1 include:_spf.google.com include:_spf.firebasemail.com ~all\"",
    "\"google-site-verification=HOyiY3puLWr3BvvAZ_CJIySdMjMe4kEWcPd2utuKnb4\"",
  ]
}

resource "google_dns_record_set" "txt__dmarc" {
  name         = "_dmarc.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "TXT"
  ttl          = 3600

  rrdatas = ["\"v=DMARC1; p=none; rua=mailto:njcn-eng@innovatenj.org\""]
}

resource "google_dns_record_set" "txt_google__domainkey" {
  name         = "google._domainkey.${google_dns_managed_zone.default.dns_name}"
  managed_zone = google_dns_managed_zone.default.name
  type         = "TXT"
  ttl          = 3600

  rrdatas = ["\"v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh7jI6fq0bp0pB9kxk4svdduiOMS2mxr9kxAq68gPhvbjKAVHX01b3kL0piVhUIa8nDjOAzEyDu+vnr5YxIorNHzr54uQioa5Tqz3vSU7/jNBEy3k4HQmoSAk5/SwnXaUUu9dFOc3PECa5YAWAbYShd5ZLooOsnxxDiV/rG6hZDg\" \"GgW5pyZwdFfJTK4p0Xt61n54LxIz7VArK6Bfb/EPnJ54s6Rpg4hwpyClREZGTFampKQg9TdFdCNjZ7KC6XEr5iZh5e5MSVAyyK3GSvTnr1FgIbUiLlQzNfjg1f1Vz09DphbywNcFTPfSGyUn6FNeSz3ifolT6jpYYl2h9O8XKywIDAQAB\""]
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
