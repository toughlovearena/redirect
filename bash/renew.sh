# ./bash/renew.sh

# setup env
nvm use
npm i

# free up port 80
npm run kill

# renew
sudo certbot renew --force-renewal

# restart server
npm run bg