import * as ButtonDoc from '@/content/docs/button.mdx';
import * as TabsDoc from '@/content/docs/tabs.mdx';
import * as AdmonitionDoc from '@/content/docs/admonition.mdx';
import * as TweetDoc from '@/content/docs/tweet.mdx';
import * as TextInputDoc from '@/content/docs/text-input.mdx';
import * as SelectInputDoc from '@/content/docs/select-input.mdx';
import * as SmartFormDoc from '@/content/docs/smart-form.mdx';
import * as NeobrutalismCardDoc from '@/content/docs/neobrutalism-card.mdx';
import * as CodeBlockDoc from '@/content/docs/code-block.mdx';
import * as ScrambleInDoc from '@/content/docs/scramble-in.mdx';
import * as BackButtonDoc from '@/content/docs/back-button.mdx';
import * as SwitchInputDoc from '@/content/docs/switch-input.mdx';
import * as OtpInputDoc from '@/content/docs/otp-input.mdx';
import * as FloatingButtonDoc from '@/content/docs/floating-button.mdx';
import * as TextareaInputDoc from '@/content/docs/textarea-input.mdx';
import * as FileInputDoc from '@/content/docs/file-input.mdx';
import * as DateInputDoc from '@/content/docs/date-input.mdx';
import * as RadioInputDoc from '@/content/docs/radio-input.mdx';
import * as CheckboxInputDoc from '@/content/docs/checkbox-input.mdx';
import * as ModalDoc from '@/content/docs/modal.mdx';
import * as ShareButtonDoc from '@/content/docs/share-button.mdx';
import * as AccordionDoc from '@/content/docs/accordion.mdx';
import * as AvatarDoc from '@/content/docs/avatar.mdx';
import * as CommentsSectionDoc from '@/content/docs/comments-section.mdx';
import * as TextEditorDoc from '@/content/docs/text-editor.mdx';
import * as SnapScrollDoc from '@/content/docs/snap-scroll.mdx';
import * as TagsInputDoc from '@/content/docs/tags-input.mdx';
import * as ProductSpotlightCardDoc from '@/content/docs/product-spotlight-card.mdx';
import * as FooterDoc from '@/content/docs/footer.mdx';
import * as SocialIconsDoc from '@/content/docs/social-icons.mdx';

export const componentRegistry = {
  button: ButtonDoc,
  tabs: TabsDoc,
  admonition: AdmonitionDoc,
  tweet: TweetDoc,
  'text-input': TextInputDoc,
  'select-input': SelectInputDoc,
  'smart-form': SmartFormDoc,
  'neobrutalism-card': NeobrutalismCardDoc,
  'code-block': CodeBlockDoc,
  'scramble-in': ScrambleInDoc,
  'back-button': BackButtonDoc,
  'switch-input': SwitchInputDoc,
  'otp-input': OtpInputDoc,
  'floating-button': FloatingButtonDoc,
  'textarea-input': TextareaInputDoc,
  'file-input': FileInputDoc,
  'date-input': DateInputDoc,
  'radio-input': RadioInputDoc,
  'checkbox-input': CheckboxInputDoc,
  modal: ModalDoc,
  'share-button': ShareButtonDoc,
  accordion: AccordionDoc,
  avatar: AvatarDoc,
  'comments-section': CommentsSectionDoc,
  'text-editor': TextEditorDoc,
  'snap-scroll': SnapScrollDoc,
  'tags-input': TagsInputDoc,
  'product-spotlight-card': ProductSpotlightCardDoc,
  footer: FooterDoc,
  'social-icons': SocialIconsDoc,
};
export type ComponentName = keyof typeof componentRegistry;
