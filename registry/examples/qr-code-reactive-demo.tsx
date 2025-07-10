import QRCode from "@/registry/media/qr-code"

export default function QRCodeReactiveDemo() {
  return (
    <div className="flex items-center justify-center w-full">
      <QRCode
        value="https://deltacomponents.dev"
        size={200}
        fgColor="--color-primary"
      />
    </div>
  )
}
