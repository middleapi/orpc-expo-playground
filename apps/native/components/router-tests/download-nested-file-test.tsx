import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

export function DownloadNestedFileTest() {
  const onRun = useCallback(async (log: LogFn) => {
    log("calling downloadNestedFile()");
    const result = await client.downloadNestedFile();
    log(
      `name=${result.file.name} size=${result.file.size} type=${result.file.type}`,
    );
    log(await result.file.text());
  }, []);

  return (
    <ProcedureTestCard
      title="downloadNestedFile"
      description="Download a File nested in an object"
      onRun={onRun}
    />
  );
}
