import { Admonition } from "@/registry/delta-ui/delta/admonition"

export default function AdmonitionCollapsibleDemo() {
  return (
    <Admonition
      type="danger"
      title="Error Stack Trace"
      expandable
      defaultCollapsed={true}
    >
      Error: Hydration failed because the initial UI does not match the expected
      DOM structure. This usually occurs when there are mismatches between
      server-rendered HTML and client-side React rendering. Check for
      differences in component state, props, or conditional rendering logic.
      Possible causes include asynchronous data fetching, usage of `useEffect`
      for initial rendering, or differences in environment variables between
      server and client. To resolve this issue, ensure that components render
      identically on both server and client, and avoid side effects during
      initial render. Consider adding proper loading states or fallbacks to
      prevent UI mismatches.
    </Admonition>
  )
}
