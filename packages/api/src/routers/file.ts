import { os } from '@orpc/server';
import z from 'zod';

export const uploadRootFile = os.input(z.file()).handler(({ input }) => {
  console.log('[uploadRootFile]', input);
});

export const downloadRootFile = os.input(z.void()).handler(() => {
  return new File(['hello world'], 'file.name');
});

export const uploadNestedFile = os
  .input(z.object({ file: z.file() }))
  .handler(({ input }) => {
    console.log('[uploadNestedFile]', input);
  });

export const downloadNestedFile = os.input(z.void()).handler(() => {
  return {
    file: new File(['hello world'], 'file.name'),
  };
});
