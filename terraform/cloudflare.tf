provider "cloudflare" {
  # token pulled from $CLOUDFLARE_API_TOKEN (create at https://dash.cloudflare.com/profile/api-tokens)
}

variable "cloudflare_zone" {
  default = "gardenstate.tech"
}
