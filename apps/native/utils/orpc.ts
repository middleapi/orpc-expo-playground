import type { AppRouterClient } from '@orpc-expo-playground/api/routers/index';
import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { QueryCache, QueryClient } from '@tanstack/react-query';

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
if (!serverUrl) {
  throw new Error('EXPO_PUBLIC_SERVER_URL is not set');
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
    },
  }),
});

export const link = new RPCLink({
  origin: serverUrl,
  url: `/rpc`,
});

export const client: AppRouterClient = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
