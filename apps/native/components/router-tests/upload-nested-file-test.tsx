import { useCallback } from "react";

import { client } from "@/utils/orpc";

import { ProcedureTestCard, type LogFn } from "./procedure-test-card";

export function UploadNestedFileTest() {
  const onRun = useCallback(async (log: LogFn) => {
    const file = new File(["hello from expo playground"], "test.txt", {
      type: "text/plain",
    });
    log(`uploading nested file ${file.name} (${file.size} bytes)`);
    await client.uploadNestedFile({ file });
    log("upload completed");
  }, []);

  return (
    <ProcedureTestCard
      title="uploadNestedFile"
      description="Upload a File nested in an object"
      onRun={onRun}
    />
  );
}
