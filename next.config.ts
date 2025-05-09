import type { NextConfig } from "next"
import { createContentlayerPlugin } from "next-contentlayer2"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/r/:name((?!index\\.json).*)", // still exclude /r/index.json
        destination: "/r/:name.json", // removed 'hooks' from path
        permanent: true,
        missing: [
          {
            type: "query",
            key: "_redirected",
            value: undefined,
          },
        ],
      },
    ]
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
