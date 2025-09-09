import React from "react"

import ProgressiveBlur from "@/registry/components/progressive-blur"

export default function ProgressiveBlurBasicDemo() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center text-foreground">
      <ProgressiveBlur position="top" />
      <ProgressiveBlur position="bottom" />

      <div className="flex h-[calc(100vh-1rem)] w-full flex-col items-center overflow-scroll">
        <div className="mt-42 grid content-start justify-items-center gap-6 text-center">
          <div className="relative max-w-[12ch] text-xs leading-tight opacity-40">
            Scroll down to see the effect
          </div>
        </div>

        <div className="mt-24 w-full max-w-lg space-y-20 px-5 text-justify text-muted-foreground">
          {Array.from({ length: 4 }).map((_, index) => (
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
    </div>
  )
}
