resource "cloudflare_filter" "usa_only" {
  zone_id     = "${cloudflare_zone.default.id}"
  description = "USA only (with allowed exceptions)"
  expression  = "(ip.geoip.country ne \"US\" and http.host eq \"careers.gardenstate.tech\" and not cf.client.bot and ip.src ne 46.63.95.66 and ip.src ne 185.64.148.140 and ip.src ne 91.200.204.227)"
}

resource "cloudflare_firewall_rule" "usa_only" {
  zone_id     = "${cloudflare_zone.default.id}"
  filter_id   = "${cloudflare_filter.usa_only.id}"
  description = "USA only (with allowed exceptions)"
  action      = "block"
}
