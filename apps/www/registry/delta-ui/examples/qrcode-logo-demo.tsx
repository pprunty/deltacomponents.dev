import QRCode from "@/registry/delta-ui/delta/qrcode"

export default function QRCodeLogoDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <QRCode
        value="https://news.ycombinator.com"
        size={200}
        logoImage="/images/hacker-news-icon.svg"
        logoSize={0.25}
        logoMargin={4}
        level="H"
        dotStyle="rounded"
        cornerSquareStyle="rounded"
        cornerDotStyle="rounded"
        enableNavigation={true}
      />
    </div>
  )
}
