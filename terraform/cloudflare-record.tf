resource "cloudflare_record" "A_1" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "185.199.108.153"
}

resource "cloudflare_record" "A_2" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "185.199.109.153"
}

resource "cloudflare_record" "A_3" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "185.199.110.153"
}

resource "cloudflare_record" "A_4" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "185.199.111.153"
}

resource "cloudflare_record" "MX_alt1" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "MX"
  ttl     = "1"
  proxied = "false"

  priority = "5"
  value    = "alt1.aspmx.l.google.com"
}

resource "cloudflare_record" "MX_alt2" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "MX"
  ttl     = "1"
  proxied = "false"

  priority = "5"
  value    = "alt2.aspmx.l.google.com"
}

resource "cloudflare_record" "MX_alt3" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "MX"
  ttl     = "1"
  proxied = "false"

  priority = "10"
  value    = "alt3.aspmx.l.google.com"
}

resource "cloudflare_record" "MX_alt4" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "MX"
  ttl     = "1"
  proxied = "false"

  priority = "10"
  value    = "alt4.aspmx.l.google.com"
}

resource "cloudflare_record" "MX" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "MX"
  ttl     = "1"
  proxied = "false"

  priority = "1"
  value    = "aspmx.l.google.com"
}

resource "cloudflare_record" "TXT__dmarc" {
  domain  = "${var.cloudflare_zone}"
  name    = "_dmarc"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "v=DMARC1; p=none; rua=mailto:dmarc@gardenstate.tech"
}

resource "cloudflare_record" "TXT_google-site-verification_1" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "google-site-verification=C9aMo8068K37GJjA5wASydeTeunuuFWy9zm33qaMSOU"
}

resource "cloudflare_record" "TXT_google-site-verification_2" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "google-site-verification=UCvUM5iemPB6eU9Og-Z0P5t1sxE6aY2Kj8Zu-TmN8Og"
}

resource "cloudflare_record" "TXT_SPF" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "v=spf1 include:_spf.google.com ~all"
}

resource "cloudflare_record" "TXT_google__domainkey" {
  domain  = "${var.cloudflare_zone}"
  name    = "google._domainkey"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnoGHjAEWvgElArJzU7A4HqoCC/9EhnFsxI2nY2uBzRq0pBN78sOB0n7ty8/KhLuA0kvb+jQLafARe7LkFIU9Rhb20OpDD0H73m+VdQjgBMAOg7dOAqHbISywwtWWS7h1pWsK6/4y9p1SIjNygnES8w6uRCyF/e4iKz4QNQnYmSgP25Y+KmujrvcYqILy+oB0Km4qr40vIf+hfXhr4/nAqTj33TXLR9/Er+KrDk69NYlR980dhVA9tENQTgAYz9BUJnwWi1RQOZY2YhIZTs3QZXDuL//jOqkBTtqbitKuwUBhnqQPGPWEawR/gP/fJULYzrNniS8o4dQ+NWK34Uck8wIDAQAB"
}
