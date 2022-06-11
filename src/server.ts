import { Updater } from '@toughlovearena/updater';
import express, { json } from 'express';
import { Redirect } from './redirect';
import { getUrl } from './util';

export class Server {
  private readonly redirect = new Redirect();
  private readonly app = express();
  constructor(updater: Updater) {
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

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}
