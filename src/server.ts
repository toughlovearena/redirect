import express, { json } from 'express';
import { Redirect } from './redirect';
import { getUrl } from './util';

export class Server {
  private readonly redirect = new Redirect();
  private readonly app = express();
  constructor() {
    this.app.use(json());
  
    this.app.get('/health', (req, res) => {
      res.send({
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