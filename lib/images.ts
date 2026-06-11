import { existsSync } from "fs";
import { join } from "path";

// Server-only: true if a file exists under /public at the given path.
export function publicExists(rel: string) {
  return existsSync(join(process.cwd(), "public", rel.replace(/^\//, "")));
}
