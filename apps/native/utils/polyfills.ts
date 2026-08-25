import { Blob, type BlobPart } from 'expo-blob';

/**
 * `expo-blob` ships a spec-compliant `Blob` but no `File`, so build one on top of it.
 *
 * `name` and `lastModified` are own writable properties on purpose: Expo's `FormData`
 * patch reads and rewrites them when a blob is appended to a form, and a prototype
 * getter would make it throw or drop the filename.
 */
class File extends Blob {
  name: string;
  lastModified: number;
  webkitRelativePath = '';

  constructor(
    fileBits: BlobPart[] | Iterable<BlobPart>,
    fileName: string,
    options?: FilePropertyBag,
  ) {
    super(fileBits, options);

    this.name = String(fileName);
    this.lastModified = options?.lastModified ?? Date.now();
  }

  override toString(): string {
    return '[object File]';
  }
}

// React Native's built-in Blob is only a handle into the native blob store: it has no
// text(), bytes(), arrayBuffer() or stream(), and it cannot be constructed from binary
// data in JS. oRPC needs all of those to pack File/Blob inputs into multipart bodies
// and to read file responses back, so swap both globals for the expo-blob versions.
Object.assign(globalThis, { Blob, File });
