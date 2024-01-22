/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;
  DB: D1Database;
}

async function readRequestBody(request: Request) {
  const contentType = request.headers.get('content-type');
  if (contentType == null) {
    return '[none]';
  }
  if (contentType.includes('application/json')) {
    return JSON.stringify(await request.json());
  } else if (contentType.includes('application/text')) {
    return request.text();
  } else if (contentType.includes('text/html')) {
    return request.text();
  } else if (contentType.includes('form')) {
    const formData = await request.formData();
    const body: Record<string, string | File> = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return JSON.stringify(body);
  } else {
    // Perhaps some other type of data was submitted in the form
    // like an image, or some other binary data.
    return 'a file';
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    let data = 'GET';
    if (request.method === 'POST') {
      data = await readRequestBody(request);
    } else if (request.method === 'GET') {
    }
    return Response.json({
      from: 'Tempest',
      data,
    });
  },
};
