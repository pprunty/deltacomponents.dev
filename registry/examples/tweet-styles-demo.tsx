import { Tweet } from "@/registry/ui/tweet"

export default function TweetStylesDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Default Size</h3>
        <Tweet id="1726130933966856722" />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Small Size</h3>
        <Tweet id="1726130933966856722" small />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">With Custom Class</h3>
        <Tweet 
          id="1726130933966856722" 
          className="rounded-lg border border-gray-200 dark:border-gray-800 p-4" 
        />
      </div>
    </div>
  )
} 