import { CambioImage } from "@/registry/delta-ui/delta/cambio-image"

export default function CambioImageIconsExpandDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="m-8 max-w-xs">
        <CambioImage
          src="https://static.vecteezy.com/system/resources/previews/008/079/776/non_2x/nft-non-fungible-tokens-crypto-art-nft-blockchain-pixel-art-character-on-background-free-vector.jpg"
          alt="Demo image with expand icons"
          width={600}
          height={600}
          motion="snappy"
          dismissible={true}
          enableInitialAnimation={true}
          showExpandIcon={true}
          iconsOnlyMode={true}
          className="rounded-md"
        />
      </div>
    </div>
  )
}
