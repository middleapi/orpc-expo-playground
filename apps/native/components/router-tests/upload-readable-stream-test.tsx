import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function UploadReadableStreamTest() {
  const onRun = useCallback(async (log: LogFn) => {
    log("uploading readable stream (3 chunks)");

    const encoder = new TextEncoder();
    const chunks = ["chunk1", "chunk2", "chunk3"];

    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < chunks.length; i += 1) {
          const chunk = chunks[i]!;
          log(`sent chunk #${i + 1}: ${chunk}`);
          controller.enqueue(encoder.encode(chunk));
          if (i < chunks.length - 1) {
            await sleep(500);
          }
        }
        controller.close();
      },
    });

    await client.uploadReadableStream(stream);
    log("upload completed");
  }, []);

  return (
    <ProcedureTestCard
      title="uploadReadableStream"
      description="Upload a ReadableStream"
      onRun={onRun}
    />
  );
}
