declare module "*.mdx" {
  import type { ComponentType, ReactNode } from "react";
  const Component: ComponentType<{ children?: ReactNode }>;
  export default Component;
}
