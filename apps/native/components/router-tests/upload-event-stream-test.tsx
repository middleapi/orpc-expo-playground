import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function UploadEventStreamTest() {
  const onRun = useCallback(async (log: LogFn) => {
    log("uploading event stream (3 events)");

    async function* events() {
      for (let i = 1; i <= 3; i += 1) {
        const event = { message: `event-${i}`, at: Date.now() };
        log(`sent chunk #${i}: ${JSON.stringify(event)}`);
        yield event;
        if (i < 3) {
          await sleep(500);
        }
      }
    }

    await client.uploadEventStream(events());
    log("upload completed");
  }, []);

  return (
    <ProcedureTestCard
      title="uploadEventStream"
      description="Send an event iterator stream"
      onRun={onRun}
    />
  );
}
