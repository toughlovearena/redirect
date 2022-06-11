import fs from 'fs';
import http from 'http';
import https from 'https';
import cors from 'cors';
import { Updater } from '@toughlovearena/updater';
import express, { json } from 'express';
import { Redirect } from './redirect';
import { getUrl } from './util';

export class Server {
  private readonly redirect = new Redirect();
  private readonly app = express();
  constructor(updater: Updater) {
    this.app.use(cors());
    this.app.use(json());

    this.app.get('/health', async (req, res) => {
      const gitHash = await updater.gitter.hash();
      res.send({
        gitHash,
        started: new Date(updater.startedAt),
        testVer: 0,
        redirects: this.redirect.replace,
      });
    });

    this.app.get('*', (req, res) => {
      const url = getUrl(req);
      const route = this.redirect.for(url);
      if (route) {
        res.redirect(302, route);
      } else {
        res.status(404).send(`redirect not found: ${url}`);
      }
    });
  }

  listen(port: number | undefined) {
    if (port) {
      this.app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      });
    } else {
      // redirect http > https
      this.app.use((req, res, next) => {
        req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
      });
      const credentials = {
        key: fs.readFileSync('/etc/letsencrypt/live/redirect.toughlovearena.com/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/redirect.toughlovearena.com/fullchain.pem', 'utf8'),
      };
      http.createServer(this.app).listen(80, () => {
        console.log(`Listening on port 80`);
      });
      https.createServer(credentials, this.app).listen(443, () => {
        console.log(`Listening on port 443`);
      });
    }
  }
}
