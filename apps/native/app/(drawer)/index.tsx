import { Column, Host, Text as ExpoUIText } from "@expo/ui";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Container } from "@/components/container";
import { DownloadEventStreamTest } from "@/components/router-tests/download-event-stream-test";
import { DownloadJsonTest } from "@/components/router-tests/download-json-test";
import { DownloadNestedFileTest } from "@/components/router-tests/download-nested-file-test";
import { DownloadReadableStreamTest } from "@/components/router-tests/download-readable-stream-test";
import { DownloadRootFileTest } from "@/components/router-tests/download-root-file-test";
import { UploadEventStreamTest } from "@/components/router-tests/upload-event-stream-test";
import { UploadJsonTest } from "@/components/router-tests/upload-json-test";
import { UploadNestedFileTest } from "@/components/router-tests/upload-nested-file-test";
import { UploadReadableStreamTest } from "@/components/router-tests/upload-readable-stream-test";
import { UploadRootFileTest } from "@/components/router-tests/upload-root-file-test";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";

export default function Home() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <Container>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Host matchContents={{ vertical: true }} style={styles.headerHost}>
          <Column spacing={4}>
            <ExpoUIText
              textStyle={{
                color: theme.text,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              oRPC Router Tester
            </ExpoUIText>
            <ExpoUIText
              textStyle={{ color: theme.text, fontSize: 13 }}
              style={{ opacity: 0.7 }}
            >
              Each procedure is its own card. Run them independently — success
              stays green so you can see what already passed.
            </ExpoUIText>
          </Column>
        </Host>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>JSON</Text>
          <DownloadJsonTest />
          <UploadJsonTest />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>File</Text>
          <DownloadRootFileTest />
          <DownloadNestedFileTest />
          <UploadRootFileTest />
          <UploadNestedFileTest />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Event stream
          </Text>
          <DownloadEventStreamTest />
          <UploadEventStreamTest />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Readable stream
          </Text>
          <DownloadReadableStreamTest />
          <UploadReadableStreamTest />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 20,
  },
  headerHost: {
    alignSelf: "stretch",
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.75,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
});
