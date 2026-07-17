import { Button, Host } from "@expo/ui";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";

export type LogFn = (message: string) => void;

type TestStatus = "idle" | "running" | "success" | "error";

const STATUS_COLORS: Record<
  TestStatus,
  { badge: string; border: string; text: string }
> = {
  idle: {
    badge: "#64748b",
    border: "rgba(100,116,139,0.35)",
    text: "#94a3b8",
  },
  running: {
    badge: "#f59e0b",
    border: "rgba(245,158,11,0.55)",
    text: "#fbbf24",
  },
  success: {
    badge: "#10b981",
    border: "rgba(16,185,129,0.7)",
    text: "#34d399",
  },
  error: {
    badge: "#ef4444",
    border: "rgba(239,68,68,0.7)",
    text: "#f87171",
  },
};

const STATUS_LABELS: Record<TestStatus, string> = {
  idle: "Not run",
  running: "Running…",
  success: "Success",
  error: "Failed",
};

function nowTime() {
  return new Date().toLocaleTimeString();
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  return String(error);
}

type ProcedureTestCardProps = {
  title: string;
  description: string;
  onRun: (log: LogFn) => Promise<void>;
};

export function ProcedureTestCard({
  title,
  description,
  onRun,
}: ProcedureTestCardProps) {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  const [status, setStatus] = useState<TestStatus>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [ranAt, setRanAt] = useState<string | undefined>();
  const runningRef = useRef(false);

  const colors = STATUS_COLORS[status];
  const isRunning = status === "running";

  const handleRun = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;

    setStatus("running");
    setLogs([]);
    setRanAt(nowTime());

    const log: LogFn = (message) => {
      setLogs((prev) => [...prev, message]);
    };

    try {
      await onRun(log);
      setStatus("success");
      setRanAt(nowTime());
    } catch (error) {
      console.error(`[${title}]`, error);
      log(formatError(error));
      setStatus("error");
      setRanAt(nowTime());
    } finally {
      runningRef.current = false;
    }
  }, [onRun, title]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {description}
          </Text>
        </View>

        <View style={[styles.badge, { backgroundColor: colors.badge }]}>
          <Text style={styles.badgeText}>{STATUS_LABELS[status]}</Text>
        </View>
      </View>

      <Host matchContents={{ vertical: true }} style={styles.buttonHost}>
        <Button
          label={isRunning ? "Running…" : status === "success" ? "Re-run" : "Run"}
          variant={status === "success" ? "outlined" : "filled"}
          onPress={() => {
            void handleRun();
          }}
          disabled={isRunning}
        />
      </Host>

      <View
        style={[
          styles.logBox,
          {
            borderColor: theme.border,
            backgroundColor:
              colorScheme === "dark" ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.03)",
          },
        ]}
      >
        <View style={styles.logMeta}>
          <Text style={[styles.logSummary, { color: colors.text }]}>
            {STATUS_LABELS[status]}
          </Text>
          {ranAt ? (
            <Text style={[styles.logTime, { color: theme.text }]}>{ranAt}</Text>
          ) : null}
        </View>

        {logs.length === 0 ? (
          <Text style={[styles.logEmpty, { color: theme.text }]}>
            Logs appear here after you run this procedure.
          </Text>
        ) : (
          logs.map((line, index) => (
            <Text
              key={`${index}-${line.slice(0, 24)}`}
              style={[styles.logLine, { color: theme.text }]}
              selectable
            >
              {line}
            </Text>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    lineHeight: 16,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  buttonHost: {
    alignSelf: "stretch",
  },
  logBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    gap: 4,
    minHeight: 56,
  },
  logMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  logSummary: {
    fontSize: 12,
    fontWeight: "700",
  },
  logTime: {
    fontSize: 11,
    opacity: 0.55,
    fontFamily: "monospace",
  },
  logEmpty: {
    fontSize: 11,
    opacity: 0.5,
  },
  logLine: {
    fontSize: 11,
    fontFamily: "monospace",
    lineHeight: 16,
    opacity: 0.9,
  },
});
