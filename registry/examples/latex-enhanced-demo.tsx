"use client"

import Latex, { LargeBlockMath, LargeInlineMath } from "@/delta/latex"

export default function LatexEnhancedDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Enhanced Components</h3>

        <div className="space-y-3">
          <h4 className="font-medium">Large Inline Math</h4>
          <p>
            Using the enhanced component:{" "}
            <LargeInlineMath math="\sum_{i=1}^{n} x_i" />
            for better visibility in text.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Large Block Math</h4>
          <LargeBlockMath math="\lim_{x \to \infty} \frac{1}{x} = 0" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Mathematical Notation Examples
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Greek Letters</p>
            <Latex
              math="\alpha, \beta, \gamma, \delta, \pi, \sigma, \lambda"
              block
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Set Theory</p>
            <Latex math="A \cup B \cap C \subseteq \mathbb{R}" block />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Logic Symbols</p>
            <Latex math="p \land q \lor r \implies s \iff t" block />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Calculus</p>
            <Latex
              math="\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y}"
              block
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Styling</h3>
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
          <Latex
            math="f(x) = ax^2 + bx + c"
            block
            size="large"
            className="text-blue-600 dark:text-blue-400"
          />
        </div>
      </div>
    </div>
  )
}
