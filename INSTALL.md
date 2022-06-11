# server setup

how to setup server

NOTE: redirect runs directly on PORT 80 to dynamically handle many domains

### setup certbot


```bash

# install snap, then certbot
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# make sure the web server is off, you need port 80 for this
sudo certbot certonly -d champions.toughlovearena.com -d events.toughlovearena.com

# to renew
sudo certbot renew --dry-run

```
