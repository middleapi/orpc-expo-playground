import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

export function DownloadJsonTest() {
  const onRun = useCallback(async (log: LogFn) => {
    log("calling downloadJson()");
    const result = await client.downloadJson();
    log(JSON.stringify(result, null, 2));
  }, []);

  return (
    <ProcedureTestCard
      title="downloadJson"
      description="Download a simple JSON object from the server"
      onRun={onRun}
    />
  );
}
