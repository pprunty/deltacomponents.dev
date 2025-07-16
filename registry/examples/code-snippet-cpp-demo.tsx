"use client"

import React from "react"
import { CodeSnippet } from "@/delta/code-snippet"
import { PrismTheme } from "prism-react-renderer"

// Custom C++ optimized theme with purple/blue accents
const cppTheme: PrismTheme = {
  plain: {
    color: "#e6e6fa",
    backgroundColor: "#1a1a2e",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#6a7b9a",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#bb86fc",
        fontWeight: "bold",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#98d982",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#f39c12",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#61dafb",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#ffd700",
        fontWeight: "500",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#c5c8c6",
      },
    },
    {
      types: ["preprocessor", "directive"],
      style: {
        color: "#ff79c6",
      },
    },
    {
      types: ["namespace", "scope"],
      style: {
        color: "#8be9fd",
      },
    },
  ],
}

export default function CodeSnippetCppDemo() {
  const cpp20Code = `#include <iostream>
#include <vector>
#include <ranges>
#include <concepts>
#include <coroutine>
#include <format>

// C++20 Concepts
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<Numeric T>
auto multiply(T a, T b) -> T {
    return a * b;
}

// C++20 Coroutines
struct Generator {
    struct promise_type {
        int current_value;
        
        Generator get_return_object() {
            return Generator{handle_type::from_promise(*this)};
        }
        
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void unhandled_exception() {}
        
        std::suspend_always yield_value(int value) {
            current_value = value;
            return {};
        }
    };
    
    using handle_type = std::coroutine_handle<promise_type>;
    handle_type coro;
    
    Generator(handle_type h) : coro(h) {}
    ~Generator() { if (coro) coro.destroy(); }
};

Generator fibonacci() {
    int a = 0, b = 1;
    while (true) {
        co_yield a;
        auto next = a + b;
        a = b;
        b = next;
    }
}

int main() {
    // C++20 Ranges and Views
    std::vector<int> numbers{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    auto even_squares = numbers 
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; });
    
    // C++20 Format library
    std::cout << std::format("Even squares: ");
    for (auto value : even_squares) {
        std::cout << std::format("{} ", value);
    }
    std::cout << std::endl;
    
    // Using concepts
    auto result = multiply(3.14, 2.71);
    std::cout << std::format("Result: {:.2f}\\n", result);
    
    return 0;
}`

  return (
    <div className="w-full py-4">
      <CodeSnippet
        title="modern_cpp20.cpp"
        code={cpp20Code}
        language="cpp"
        theme={cppTheme}
        showLineNumbers={true}
      />
    </div>
  )
}
