resource "cloudflare_zone" "default" {
  zone = "${var.cloudflare_zone}"

  plan = "free"
}
