import type { RouterClient } from '@orpc/server';

import {
  downloadNestedFile,
  downloadRootFile,
  uploadNestedFile,
  uploadRootFile,
} from './file';
import { downloadJson, uploadJson } from './json';
import {
  downloadEventStream,
  downloadReadableStream,
  uploadEventStream,
  uploadReadableStream,
} from './stream';

export const appRouter = {
  uploadJson,
  downloadJson,
  uploadRootFile,
  uploadNestedFile,
  downloadRootFile,
  downloadNestedFile,
  uploadEventStream,
  downloadEventStream,
  uploadReadableStream,
  downloadReadableStream,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
