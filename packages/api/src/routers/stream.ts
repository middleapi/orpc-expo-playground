import { eventIterator, ORPCError, os } from '@orpc/server';
import z from 'zod';

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const uploadEventStream = os
  .input(eventIterator(z.any()))
  .handler(async ({ input }) => {
    let count = 0;
    for await (const event of input) {
      count += 1;
      console.log('[uploadEventStream]', event);
    }

    if (count === 0) {
      throw new ORPCError('BAD_REQUEST', { message: 'No Event Found' });
    }
  });

export const downloadEventStream = os
  .input(z.void())
  .handler(async function* () {
    for (let i = 0; i < 5; i += 1) {
      yield Date.now();
      await sleep(500);
    }
  });

export const uploadReadableStream = os
  .input(z.instanceof(ReadableStream))
  .handler(async ({ input }) => {
    let count = 0;
    for await (const chunk of input) {
      console.log(
        '[uploadReadableStream]',
        new TextDecoder().decode(chunk as any),
      );
      count += 1;
    }

    if (count === 0) {
      throw new ORPCError('BAD_REQUEST', { message: 'No Event Found' });
    }
  });

export const downloadReadableStream = os
  .input(z.void())
  .handler(async function () {
    return new ReadableStream({
      async start(controller) {
        controller.enqueue(new TextEncoder().encode('chunk1'));
        await sleep(500);
        controller.enqueue(new TextEncoder().encode('chunk2'));
        await sleep(500);
        controller.enqueue(new TextEncoder().encode('chunk3'));
        await sleep(500);
        controller.enqueue(new TextEncoder().encode('chunk4'));
        await sleep(500);
        controller.close();
      },
    });
  });
