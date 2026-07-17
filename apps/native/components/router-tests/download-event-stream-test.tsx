import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

export function DownloadEventStreamTest() {
  const onRun = useCallback(async (log: LogFn) => {
    log("calling downloadEventStream()");
    const stream = await client.downloadEventStream();

    let count = 0;
    for await (const event of stream) {
      count += 1;
      log(`event #${count}: ${String(event)}`);
    }
    log(`stream finished (${count} events)`);
  }, []);

  return (
    <ProcedureTestCard
      title="downloadEventStream"
      description="Receive an event iterator stream"
      onRun={onRun}
    />
  );
}
