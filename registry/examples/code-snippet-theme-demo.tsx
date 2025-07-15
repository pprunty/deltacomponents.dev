"use client"

import React, { useState } from "react"
import { PrismTheme } from "prism-react-renderer"

import { Button } from "@/components/ui/button"
import { CodeSnippet } from "@/delta/code-snippet"

// Custom Monokai-inspired dark theme
const monokaiTheme: PrismTheme = {
  plain: {
    color: "#f8f8f2",
    backgroundColor: "#272822",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#75715e",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#f92672",
        fontWeight: "bold",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#e6db74",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#ae81ff",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#a6e22e",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#66d9ef",
        fontWeight: "bold",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#f8f8f2",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#f92672",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#a6e22e",
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: "#e6db74",
      },
    },
  ],
}

// Custom GitHub-inspired light theme
const githubLightTheme: PrismTheme = {
  plain: {
    color: "#24292f",
    backgroundColor: "#ffffff",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#6a737d",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#d73a49",
        fontWeight: "600",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#032f62",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#e36209",
        fontWeight: "600",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#24292f",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#22863a",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: "#032f62",
      },
    },
  ],
}

export default function CodeSnippetThemeDemo() {
  const [selectedTheme, setSelectedTheme] = useState<"monokai" | "github">(
    "monokai"
  )

  const jsCode = `// Advanced JavaScript patterns and concepts
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, ...args) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(\`Error in event handler for \${event}:\`, error);
        }
      });
    }
  }
}

// Usage with modern async/await patterns
const api = {
  async fetchUser(id) {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) {
      throw new Error(\`Failed to fetch user: \${response.statusText}\`);
    }
    return response.json();
  },

  async updateUser(id, data) {
    const response = await fetch(\`/api/users/\${id}\`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};

// Functional programming with higher-order functions
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const addTax = (rate) => (price) => price * (1 + rate);
const applyDiscount = (discount) => (price) => price * (1 - discount);
const formatCurrency = (price) => \`$\${price.toFixed(2)}\`;

const calculatePrice = pipe(
  addTax(0.08),
  applyDiscount(0.1),
  formatCurrency
);

console.log(calculatePrice(100)); // $97.20`

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <Button
          variant={selectedTheme === "monokai" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTheme("monokai")}
        >
          Monokai Dark
        </Button>
        <Button
          variant={selectedTheme === "github" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTheme("github")}
        >
          GitHub Light
        </Button>
      </div>

      <CodeSnippet
        title="advanced-patterns.js"
        code={jsCode}
        language="javascript"
        theme={selectedTheme === "monokai" ? monokaiTheme : githubLightTheme}
        showLineNumbers={true}
      />
    </div>
  )
}
