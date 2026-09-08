import 'dotenv/config.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { createApp } from '../src/create-app.js';

// Vercel reutiliza la instancia de la función entre invocaciones "calientes"
// (mismo contenedor) — con este cache evitamos rearrancar Nest en cada request.
const expressApp = express();
let ready: Promise<unknown> | null = null;

function bootstrap() {
  if (!ready) {
    ready = createApp(new ExpressAdapter(expressApp)).then((app) => app.init());
  }
  return ready;
}

export default async function handler(req: any, res: any) {
  await bootstrap();
  expressApp(req, res);
}
