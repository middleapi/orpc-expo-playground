import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

export function UploadJsonTest() {
  const onRun = useCallback(async (log: LogFn) => {
    const payload = {
      message: "hello from expo",
      count: 7,
      nested: { ok: true },
    };
    log(`uploading ${JSON.stringify(payload)}`);
    await client.uploadJson(payload);
    log("upload completed");
  }, []);

  return (
    <ProcedureTestCard
      title="uploadJson"
      description="Upload a simple JSON object to the server"
      onRun={onRun}
    />
  );
}
