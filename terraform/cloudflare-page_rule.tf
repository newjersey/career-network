resource "cloudflare_page_rule" "naked_redirect" {
  zone_id  = "${cloudflare_zone.default.id}"
  target   = "${var.cloudflare_zone}/*"
  priority = 1
  status   = "active"
  actions {
    forwarding_url {
      status_code = 302
      url         = "https://njcareers.org/"
    }
  }
}

resource "cloudflare_page_rule" "always_use_https" {
  zone_id  = "${cloudflare_zone.default.id}"
  target   = "http://*.${var.cloudflare_zone}/*"
  priority = 2
  status   = "active"
  actions {
    always_use_https = true
  }
}
