import { globSync } from "glob";
import { join } from "path";
import type { GetEntrypoints } from "~root/source/scripts/build/wrappers/get-entrypoints/get-entrypoints.types";

const getEntrypoints: GetEntrypoints = (): Record<string, string> => {
  const globFiles: string[] = globSync(
    "source/library/**/*.{tsx,ts,js,jsx}",
    {},
  );
  const files: Record<string, string> = globFiles
    .filter((item) => {
      return !(
        item.endsWith(".story.tsx") ||
        item.endsWith(".story.ts") ||
        item.endsWith(".test.tsx") ||
        item.endsWith(".test.ts")
      );
    })
    .reduce((accumulator, file) => {
      const splittedFile = file.split(".ts");
      splittedFile.pop();
      const deletedExtensionFile = splittedFile.join();
      const fixedFileName = deletedExtensionFile.replace(
        /^(source\\library\\)/,
        "",
      );
      accumulator[fixedFileName] = join(process.cwd(), file);
      return accumulator;
    }, {} as Record<string, string>);
  return files;
};

export default getEntrypoints;
