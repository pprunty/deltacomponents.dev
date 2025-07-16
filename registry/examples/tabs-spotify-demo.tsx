"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/delta/tabs"

export default function TabsSpotifyDemo() {
  const tabs = [
    { id: "discover", label: "Discover" },
    { id: "podcasts", label: "Podcasts" },
    { id: "artists", label: "Artists" },
    { id: "albums", label: "Albums" },
    { id: "playlists", label: "Playlists" },
  ]

  return (
    <Tabs defaultValue="discover" className="w-full">
      <TabsList
        variant="pills"
        className="gap-2"
        showHoverEffect={true}
        showActiveIndicator={false}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            inactiveClassName="bg-muted dark:text-white text-black"
            activeClassName="bg-[#1cd760] dark:bg-[#1cd760] dark:text-black text-white"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="discover" className="mt-6 py-2">
        <div className="p-4 rounded-lg border border-border my-4">
          <h3 className="text-lg font-medium">Discover New Music</h3>
          <p className="text-sm text-muted-foreground">
            Find new music based on your listening habits.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="podcasts" className="mt-6 py-2">
        <div className="p-4 rounded-lg border border-border my-4">
          <h3 className="text-lg font-medium">Podcasts</h3>
          <p className="text-sm text-muted-foreground">
            Browse popular podcasts and discover new shows.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="artists" className="mt-6 py-2">
        <div className="p-4 rounded-lg border border-border my-4">
          <h3 className="text-lg font-medium">Artists</h3>
          <p className="text-sm text-muted-foreground">
            Browse your favorite artists and discover new ones.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="albums" className="mt-6 py-2">
        <div className="p-4 rounded-lg border border-border my-4">
          <h3 className="text-lg font-medium">Albums</h3>
          <p className="text-sm text-muted-foreground">
            Browse your favorite albums and discover new releases.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="playlists" className="mt-6 py-2">
        <div className="p-4 rounded-lg border border-border my-4">
          <h3 className="text-lg font-medium">Playlists</h3>
          <p className="text-sm text-muted-foreground">
            Browse your playlists and discover curated collections.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
