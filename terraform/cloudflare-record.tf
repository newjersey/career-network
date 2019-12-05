resource "cloudflare_record" "A_careers_1" {
  domain  = "${var.cloudflare_zone}"
  name    = "careers"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.1.195"
}

resource "cloudflare_record" "A_careers_2" {
  domain  = "${var.cloudflare_zone}"
  name    = "careers"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.65.195"
}
resource "cloudflare_record" "A_business_1" {
  domain  = "${var.cloudflare_zone}"
  name    = "business"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.1.195"
}

resource "cloudflare_record" "A_business_2" {
  domain  = "${var.cloudflare_zone}"
  name    = "business"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.65.195"
}

resource "cloudflare_record" "A_careers-preview_1" {
  domain  = "${var.cloudflare_zone}"
  name    = "careers-preview"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.1.195"
}

resource "cloudflare_record" "A_careers-preview_2" {
  domain  = "${var.cloudflare_zone}"
  name    = "careers-preview"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.65.195"
}

resource "cloudflare_record" "A_business-preview_1" {
  domain  = "${var.cloudflare_zone}"
  name    = "business-preview"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.1.195"
}

resource "cloudflare_record" "A_business-preview_2" {
  domain  = "${var.cloudflare_zone}"
  name    = "business-preview"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.65.195"
}

resource "cloudflare_record" "A_business-dev_1" {
  domain  = "${var.cloudflare_zone}"
  name    = "business-dev"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.1.195"
}

resource "cloudflare_record" "A_business-dev_2" {
  domain  = "${var.cloudflare_zone}"
  name    = "business-dev"
  type    = "A"
  ttl     = "1"
  proxied = "true"
  value   = "151.101.65.195"
}

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

resource "cloudflare_record" "A_signup_1" {
  domain  = "${var.cloudflare_zone}"
  name    = "signup"
  type    = "A"
  ttl     = "1"
  proxied = "false"
  value   = "151.101.1.195"
}

resource "cloudflare_record" "A_signup_2" {
  domain  = "${var.cloudflare_zone}"
  name    = "signup"
  type    = "A"
  ttl     = "1"
  proxied = "false"
  value   = "151.101.65.195"
}

resource "cloudflare_record" "A_link" {
  domain  = "${var.cloudflare_zone}"
  name    = "link"
  type    = "A"
  ttl     = "1"
  proxied = "false"
  value   = "52.72.49.79"
}

resource "cloudflare_record" "CNAME_auth_careers" {
  domain  = "${var.cloudflare_zone}"
  name    = "auth.careers"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "nj-career-network.firebaseapp.com"
}

resource "cloudflare_record" "CNAME_auth_business" {
  domain  = "${var.cloudflare_zone}"
  name    = "auth.business"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "nj-business-helper.firebaseapp.com"
}

resource "cloudflare_record" "CNAME_auth_careers-preview" {
  domain  = "${var.cloudflare_zone}"
  name    = "auth.careers-preview"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "nj-career-network-ppe.firebaseapp.com"
}

resource "cloudflare_record" "CNAME_auth_business-preview" {
  domain  = "${var.cloudflare_zone}"
  name    = "auth.business-preview"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "nj-business-helper-ppe.firebaseapp.com"
}

resource "cloudflare_record" "CNAME_auth_business-dev" {
  domain  = "${var.cloudflare_zone}"
  name    = "auth.business-dev"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "nj-business-helper-dev1.firebaseapp.com"
}

resource "cloudflare_record" "CNAME_firebase1__domainkey" {
  domain  = "${var.cloudflare_zone}"
  name    = "firebase1._domainkey"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "mail-gardenstate-tech.dkim1._domainkey.firebasemail.com"
}

resource "cloudflare_record" "CNAME_firebase2__domainkey" {
  domain  = "${var.cloudflare_zone}"
  name    = "firebase2._domainkey"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "mail-gardenstate-tech.dkim2._domainkey.firebasemail.com"
}

resource "cloudflare_record" "CNAME_strong1__domainkey" {
  domain  = "${var.cloudflare_zone}"
  name    = "strong1._domainkey"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "strong1._domainkey.helpscout.net"
}

resource "cloudflare_record" "CNAME_strong2__domainkey" {
  domain  = "${var.cloudflare_zone}"
  name    = "strong2._domainkey"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "strong2._domainkey.helpscout.net"
}

resource "cloudflare_record" "CNAME_intercom__domainkey" {
  domain  = "${var.cloudflare_zone}"
  name    = "intercom._domainkey"
  type    = "CNAME"
  ttl     = "1"
  proxied = "false"
  value   = "c1f45e04-1683-4859-b3de-3ae472eb267d.dkim.intercom.io"
}

resource "cloudflare_record" "CNAME_www" {
  domain  = "${var.cloudflare_zone}"
  name    = "www"
  type    = "CNAME"
  ttl     = "1"
  proxied = "true"
  value   = "${var.cloudflare_zone}"
}

resource "cloudflare_record" "CNAME_resources" {
  domain  = "${var.cloudflare_zone}"
  name    = "resources"
  type    = "CNAME"
  ttl     = "1"
  proxied = "true"
  value   = "custom.intercom.help"
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

resource "cloudflare_record" "TXT__acme-challenge_careers" {
  domain  = "${var.cloudflare_zone}"
  name    = "_acme-challenge.careers"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "04V85Ksw7qJfFYb71IGgGa77HRDjXnMC5gp2XKe5rSs"
}

resource "cloudflare_record" "TXT__acme-challenge_careers-preview" {
  domain  = "${var.cloudflare_zone}"
  name    = "_acme-challenge.careers-preview"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "U7RkkGeHY4UaeODdP-zjAq9pZIruewrkg5LUzOw1HKE"
}

resource "cloudflare_record" "TXT_careers_google-site-verification" {
  domain  = "${var.cloudflare_zone}"
  name    = "careers"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "google-site-verification=iiPkdrdPyOW-kZOGsQmKwv7cY2tcRqb2RKvnmhrvEZo"
}

resource "cloudflare_record" "TXT__dmarc" {
  domain  = "${var.cloudflare_zone}"
  name    = "_dmarc"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "v=DMARC1; p=none; rua=mailto:dmarc@gardenstate.tech"
}

resource "cloudflare_record" "TXT_firebase" {
  domain  = "${var.cloudflare_zone}"
  name    = "${var.cloudflare_zone}"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "firebase=nj-career-network"
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
  value   = "v=spf1 include:_spf.google.com include:_spf.firebasemail.com include:helpscoutemail.com ~all"
}

resource "cloudflare_record" "TXT_google__domainkey" {
  domain  = "${var.cloudflare_zone}"
  name    = "google._domainkey"
  type    = "TXT"
  ttl     = "1"
  proxied = "false"
  value   = "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnoGHjAEWvgElArJzU7A4HqoCC/9EhnFsxI2nY2uBzRq0pBN78sOB0n7ty8/KhLuA0kvb+jQLafARe7LkFIU9Rhb20OpDD0H73m+VdQjgBMAOg7dOAqHbISywwtWWS7h1pWsK6/4y9p1SIjNygnES8w6uRCyF/e4iKz4QNQnYmSgP25Y+KmujrvcYqILy+oB0Km4qr40vIf+hfXhr4/nAqTj33TXLR9/Er+KrDk69NYlR980dhVA9tENQTgAYz9BUJnwWi1RQOZY2YhIZTs3QZXDuL//jOqkBTtqbitKuwUBhnqQPGPWEawR/gP/fJULYzrNniS8o4dQ+NWK34Uck8wIDAQAB"
}
