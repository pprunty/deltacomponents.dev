import * as ButtonDoc from "@/content/docs/button.mdx"
import * as TabsDoc from "@/content/docs/tabs.mdx"
import * as AdmonitionDoc from "@/content/docs/admonition.mdx"
import * as TweetDoc from "@/content/docs/tweet.mdx"
import * as TextInputDoc from "@/content/docs/text-input.mdx"
import * as SelectInputDoc from "@/content/docs/select-input.mdx"
import * as SmartFormDoc from "@/content/docs/smart-form.mdx"
import * as NeobrutalismCardDoc from "@/content/docs/neobrutalism-card.mdx"
import * as CodeBlockDoc from "@/content/docs/code-block.mdx"

export const componentRegistry = {
  button: ButtonDoc,
  tabs: TabsDoc,
  admonition: AdmonitionDoc,
  tweet: TweetDoc,
  "text-input": TextInputDoc,
  "select-input": SelectInputDoc,
  "smart-form": SmartFormDoc,
  "neobrutalism-card": NeobrutalismCardDoc,
  "code-block": CodeBlockDoc,}
export type ComponentName = keyof typeof componentRegistry