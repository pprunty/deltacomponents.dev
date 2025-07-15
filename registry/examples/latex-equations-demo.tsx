"use client"

import Latex, { LargeBlockMath } from "@/delta/latex"

export default function LatexEquationsDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Complex Mathematical Expressions
        </h3>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Quadratic Formula</p>
          <Latex
            math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
            block
            size="large"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Taylor Series</p>
          <Latex
            math="f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n"
            block
            size="medium"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Matrix Multiplication</p>
          <LargeBlockMath math="\begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} ax + by \\ cx + dy \end{bmatrix}" />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Fourier Transform</p>
          <Latex
            math="\mathcal{F}\{f(t)\} = \int_{-\infty}^{\infty} f(t) e^{-2\pi i \xi t} dt"
            block
            size="large"
          />
        </div>
      </div>
    </div>
  )
}
