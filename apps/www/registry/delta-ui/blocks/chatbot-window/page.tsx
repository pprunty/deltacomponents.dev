"use client"

import { ChatbotWindow } from "@/registry/delta-ui/blocks/chatbot-window/components/chatbot-window"

export default function ChatbotWindowPage() {
  return (
    <div className="bg-background h-screen w-full">
      <ChatbotWindow defaultOpen={false}>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg space-y-20 px-5 text-justify">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4">Welcome to Your App</h2>
              <p className="text-muted-foreground text-lg">
                Use the chat window on the right to interact with our AI assistant. Click the expand button to open the chat interface.
              </p>
            </div>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati, reiciendis eum vitae nostrum, temporibus repudiandae
                voluptatibus, natus iure ipsa velit odit quibusdam illum. Quaerat
                cumque laudantium libero reprehenderit perferendis quo nulla
                voluptate? Repellat tenetur labore exercitationem dicta libero
                voluptate suscipit, iusto ea assumenda. Ipsa enim, quidem atque
                modi error eaque, debitis perferendis, hic iste libero dignissimos
                ea! Quod inventore beatae aspernatur nulla rem perferendis aperiam
                at debitis delectus odit quia animi ex mollitia vero molestias
                itaque deleniti, quos exercitationem consequatur assumenda dolor?
                Quod reiciendis in similique reprehenderit commodi quo blanditiis
                nobis hic ea optio illum placeat officia alias quasi autem earum
                quos obcaecati, voluptatum corporis quisquam. Quisquam iste, quas
                explicabo omnis harum aut quam adipisci, voluptatem saepe
                accusantium doloribus repellendus amet culpa magnam ex et dolores
                accusamus commodi facere aliquam voluptatum alias? Officia
                expedita ut vel? Beatae deserunt sequi id eos libero suscipit
                totam cum, sed architecto atque quisquam et incidunt quod fuga
                ullam repellat assumenda quos ab, voluptatum sint nesciunt? Ad
                sapiente est laborum quam sint eius sequi. Eum, veniam
                dignissimos.
              </div>
            ))}
          </div>
        </div>
      </ChatbotWindow>
    </div>
  )
}
