'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/delta/components/tabs';

export default function TabsSpotifyDemo() {
  const tabs = [
    { id: 'discover', label: 'Discover' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
    { id: 'playlists', label: 'Playlists' },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">
        Custom Spotify-Style Pills Tabs
      </h2>
      <Tabs defaultValue="discover">
        <TabsList
          variant="pills"
          showHoverEffect={true}
          showActiveIndicator={false}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              activeClassName="bg-[#1cd760] dark:bg-[#1cd760] dark:text-black text-white font-medium"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="discover" className="mt-6 py-2">
          <h3 className="font-medium">Discover New Music</h3>
          <p className="text-muted-foreground mt-2">
            Find new music based on your listening habits.
          </p>
        </TabsContent>
        <TabsContent value="podcasts" className="mt-6 py-2">
          <h3 className="font-medium">Podcasts</h3>
          <p className="text-muted-foreground mt-2">
            Browse popular podcasts and discover new shows.
          </p>
        </TabsContent>
        <TabsContent value="artists" className="mt-6 py-2">
          <h3 className="font-medium">Artists</h3>
          <p className="text-muted-foreground mt-2">
            Browse your favorite artists and discover new ones.
          </p>
        </TabsContent>
        <TabsContent value="albums" className="mt-6 py-2">
          <h3 className="font-medium">Albums</h3>
          <p className="text-muted-foreground mt-2">
            Browse your favorite albums and discover new releases.
          </p>
        </TabsContent>
        <TabsContent value="playlists" className="mt-6 py-2">
          <h3 className="font-medium">Playlists</h3>
          <p className="text-muted-foreground mt-2">
            Browse your playlists and discover curated collections.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
