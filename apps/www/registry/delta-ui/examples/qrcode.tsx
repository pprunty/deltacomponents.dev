import QRCode from "@/registry/delta-ui/delta/qrcode"

export default function QrcodeExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <QRCode value="https://deltacomponents.dev" size={150} />
    </div>
  )
}
