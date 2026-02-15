declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const meta: any;
  export default MDXComponent;
}
