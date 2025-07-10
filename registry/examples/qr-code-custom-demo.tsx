import QRCode from "@/registry/media/qr-code"

export default function QRCodeCustomDemo() {
  return (
    <div className="flex items-center justify-center w-full">
      <QRCode
        value="https://deltacomponents.dev"
        size={200}
        dotStyle="rounded"
        cornerSquareStyle="extra-rounded"
        cornerDotStyle="rounded"
        level="M"
      />
    </div>
  )
}
