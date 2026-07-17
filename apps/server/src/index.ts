import { appRouter } from '@orpc-expo-playground/api/routers/index';
import { OpenAPIHandler } from '@orpc/openapi/node';
import { OpenAPIReferenceHandlerPlugin } from '@orpc/openapi/plugins';
import { onError } from '@orpc/server';
import { ZodToJsonSchemaConverter } from '@orpc/zod';
import { createServer } from 'node:http'; // or 'node:https' or 'node:http2'
import { RPCHandler } from '@orpc/server/node';
import { CORSHandlerPlugin } from '@orpc/server/plugins';
import { OpenAPIGenerator } from '@orpc/openapi';

const apiGenerator = new OpenAPIGenerator({
  converters: [new ZodToJsonSchemaConverter()],
});

export const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferenceHandlerPlugin({
      spec: () =>
        apiGenerator.generate(appRouter, {
          base: {
            servers: [{ url: '/api' }],
          },
        }),
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export const rpcHandler = new RPCHandler(appRouter, {
  plugins: [new CORSHandlerPlugin()],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

const server = createServer(async (req, res) => {
  const rpcResult = await rpcHandler.handle(req, res, {
    prefix: '/rpc',
    context: {}, // Provide initial context if needed
  });

  if (rpcResult.matched) {
    return;
  }

  const apiResult = await apiHandler.handle(req, res, {
    prefix: '/api',
    context: {},
  });

  if (apiResult.matched) {
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

server.listen(3000, '0.0.0.0', () =>
  console.log('Listening on http://127.0.0.1:3000'),
);
