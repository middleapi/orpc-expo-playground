// The browser already provides spec-compliant Blob and File, and replacing File there
// would break `instanceof` for files that come from the platform (e.g. file inputs).
export {};
