import { Server } from "./server";
import { Updater } from '@toughlovearena/updater';

(async () => {
  const envPort = Number(process.env.PORT);
  const port = !isNaN(envPort) ? envPort : 80;

  const updater = new Updater();
  new Server(updater).listen(port);
  updater.cron();
})();
