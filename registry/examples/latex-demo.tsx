"use client"

import Latex from "@/registry/media/latex"

export default function LatexDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Inline Math</h3>
        <p>
          The famous equation <Latex math="E = mc^2" /> demonstrates mass-energy
          equivalence. In calculus, we often use derivatives like{" "}
          <Latex math="\frac{dy}{dx}" size="small" />.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Block Math</h3>
        <Latex
          math="\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}"
          block
          size="large"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="flex items-center gap-4">
          <Latex math="x^2" size="small" />
          <Latex math="x^2" size="medium" />
          <Latex math="x^2" size="large" />
          <Latex math="x^2" size="x-large" />
        </div>
      </div>
    </div>
  )
}
