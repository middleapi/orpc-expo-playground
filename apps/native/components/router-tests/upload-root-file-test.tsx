import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

export function UploadRootFileTest() {
  const onRun = useCallback(async (log: LogFn) => {
    const file = new File(["hello from expo playground"], "test.txt", {
      type: "text/plain",
    });
    log(`uploading ${file.name} (${file.size} bytes)`);
    await client.uploadRootFile(file);
    log("upload completed");
  }, []);

  return (
    <ProcedureTestCard
      title="uploadRootFile"
      description="Upload a File as the root input"
      onRun={onRun}
    />
  );
}
