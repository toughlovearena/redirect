# ./bash/renew.sh

# free up port 80
npm run kill

# renew
sudo certbot renew --force-renewal

# restart server
npm run bg