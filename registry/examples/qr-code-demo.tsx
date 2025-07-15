import QRCode from "@/delta/qr-code"

export default function QRCodeDemo() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="text-center space-y-4">
        <QRCode value="https://patrickprunty.com" size={200} level="M" />
      </div>
    </div>
  )
}
