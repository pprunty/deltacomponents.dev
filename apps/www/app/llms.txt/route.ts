export async function GET() {
  const llmsContent = `# Delta Components UI

Delta Components UI is a comprehensive component library and custom registry built on top of shadcn/ui designed specifically for building multimodal agentic experiences. The library provides pre-built components for agents, transcription, audio interfaces, voice interactions, and more.

## Overview

Delta Components UI helps developers build modern voice-enabled and AI-powered applications faster by providing:

- Voice interaction components (voice buttons, voice pickers, conversation interfaces)
- Audio visualization components (waveforms, bar visualizers, orbs)
- Agent conversation components (messages, responses, conversation containers)
- Form components with voice input capabilities
- Audio player components with advanced controls

## Installation

Components can be installed via the shadcn CLI with our registry URL:

\`\`\`bash
pnpm dlx shadcn@latest add https://deltacomponents.dev/r/<component-name>.json
\`\`\`

Or manually by copying component code and installing dependencies.

## Key Components

### Voice & Audio Components
- **Voice Button**: Interactive voice recording button with live waveform visualization
- **Voice Picker**: Searchable voice selector with audio preview and orb visualization
- **Conversation Bar**: Complete voice conversation interface with microphone controls and text input
- **Audio Player**: Full-featured audio player with playlist support
- **Waveform**: Static and live audio waveform visualizations
- **Bar Visualizer**: Real-time audio frequency visualization
- **Orb**: Animated audio visualization orb

### Conversation & Messaging
- **Message**: Composable message components with avatar support for user and assistant messages
- **Conversation**: Scrolling conversation container with auto-scroll and sticky-to-bottom behavior
- **Response**: Streaming markdown renderer with character-by-character animations for AI responses

### Utility Components
- **Shimmering Text**: Animated text with shimmer effects for loading states

## Technical Details

- Built on React 18+ and Next.js 13+
- Uses Tailwind CSS for styling
- TypeScript support included
- Integrates with voice APIs and AI services
- Supports both light and dark themes
- Responsive design patterns
- Accessibility features included

## Use Cases

Perfect for building:
- Voice-enabled web applications
- AI agent interfaces
- Podcast and audio streaming platforms
- Voice transcription tools
- Interactive audio experiences
- Conversational AI interfaces
- Voice-controlled forms and navigation

## Repository

Source code and documentation available at: https://github.com/pprunty/deltacomponents.dev

## License

Open source components that can be customized and extended for any project.
`

  return new Response(llmsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
