declare module "sharp" {
  interface Sharp {
    resize(options: { width: number; height: number }): Sharp
    resize(width: number, height: number): Sharp
    png(): Sharp
    toFile(path: string): Promise<any>
    toFormat(format: string): Sharp
    composite(options: Array<{ input: Buffer; blend: string }>): Sharp
  }

  function sharp(input: string | Buffer): Sharp
  export default sharp
}

declare module "@svgr/core" {
  interface SvgrOptions {
    typescript?: boolean
    ref?: boolean
    memo?: boolean
    titleProp?: boolean
    descProp?: boolean
    svgProps?: Record<string, any>
    expandProps?: boolean | "start" | "end"
    replaceAttrValues?: Record<string, string>
    svgo?: boolean
    svgoConfig?: Record<string, any>
    prettier?: boolean
    prettierConfig?: Record<string, any>
    template?: (variables: Record<string, any>, context: any) => string
    plugins?: string[]
  }

  function svgr(
    svg: string,
    options?: SvgrOptions,
    state?: Record<string, any>
  ): Promise<string>
  export default svgr
}
