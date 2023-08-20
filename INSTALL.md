# server setup

how to setup server

NOTE: redirect runs directly on PORT 80 to dynamically handle many domains

### setup server

```bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source .bashrc

git clone https://github.com/toughlovearena/redirect.git
cd redirect

nvm install $(cat .nvmrc)
nvm use
npm i

npm run bg

```

### setup certbot

```bash

# install snap, then certbot
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# make sure the web server is off, you need port 80 for this
sudo certbot certonly \
  -d redirect.toughlovearena.com \
  -d champions.toughlovearena.com \
  -d events.toughlovearena.com

# to renew
sudo certbot renew --dry-run

```

### manually renew certificates

See [bash/renew.sh](bash/renew.sh)
