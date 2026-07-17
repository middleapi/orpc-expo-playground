import { os } from '@orpc/server';
import z from 'zod';

const sampleJsonSchema = z.object({
  message: z.string(),
  count: z.number().int(),
  nested: z.object({
    ok: z.boolean(),
  }),
});

export const uploadJson = os.input(sampleJsonSchema).handler(({ input }) => {
  console.log('uploadJson', input);
});

export const downloadJson = os.input(z.void()).handler(() => {
  return {
    message: 'hello from server',
    count: 42,
    nested: {
      ok: true,
    },
  };
});
