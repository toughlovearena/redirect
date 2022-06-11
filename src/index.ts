import { Server } from "./server";
import { Updater } from '@toughlovearena/updater';

(async () => {
  const envPort = Number(process.env.PORT);
  const port = !isNaN(envPort) ? envPort : undefined;

  const updater = new Updater();
  new Server(updater).listen(port);
  updater.cron();
})();
