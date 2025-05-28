import QRCode from "@/registry/media/qr-code"

export default function QRCodeDemo() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="text-center space-y-4">
        <QRCode
          value="https://patrickprunty.com"
          size={200}
          bgColor="#2a2a2a"
          fgColor="#ffffff"
          errorCorrectionLevel="M"
        />
      </div>
    </div>
  )
}
