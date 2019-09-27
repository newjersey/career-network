resource "cloudflare_filter" "usa_only" {
  zone_id     = "${cloudflare_zone.default.id}"
  description = "USA only (except allowed contractors)"
  expression  = "(ip.geoip.country ne \"US\" and http.host eq \"careers.${var.cloudflare_zone}\" and not cf.client.bot and not http.user_agent contains \"learningtapestry\" and ip.src ne 46.63.95.66)"
}

resource "cloudflare_firewall_rule" "usa_only" {
  zone_id     = "${cloudflare_zone.default.id}"
  filter_id   = "${cloudflare_filter.usa_only.id}"
  description = "USA only (except allowed contractors)"
  action      = "block"
}
