import {renderToReadableStream} from 'react-dom/server.browser';
import {text} from 'node:stream/consumers';

export async function renderToHtml(app) {
  const stream = await renderToReadableStream(app);
  await stream.allReady;
  return text(stream);
}
