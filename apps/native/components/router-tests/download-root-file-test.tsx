import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

export function DownloadRootFileTest() {
  const onRun = useCallback(async (log: LogFn) => {
    log("calling downloadRootFile()");
    const file = await client.downloadRootFile();
    log(`name=${file.name} size=${file.size} type=${file.type}`);
    log(await file.text());
  }, []);

  return (
    <ProcedureTestCard
      title="downloadRootFile"
      description="Download a File returned at the root"
      onRun={onRun}
    />
  );
}
