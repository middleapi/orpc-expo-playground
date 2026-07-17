import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

export function DownloadReadableStreamTest() {
  const onRun = useCallback(async (log: LogFn) => {
    log("calling downloadReadableStream()");
    const stream = await client.downloadReadableStream();
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    let index = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      index += 1;
      const text =
        value instanceof Uint8Array
          ? decoder.decode(value, { stream: true })
          : String(value);
      log(`chunk #${index}: ${text}`);
    }
    log("stream closed");
  }, []);

  return (
    <ProcedureTestCard
      title="downloadReadableStream"
      description="Download a ReadableStream"
      onRun={onRun}
    />
  );
}
