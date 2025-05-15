import React from 'react';
import { Index } from '@/__registry__';
import { cn, getComponentCategory } from '@/lib/utils';
import ScrambleText from "@/registry/animations/scramble-text"
import { ChevronRightIcon } from "lucide-react"
import { Balancer } from "react-wrap-balancer"
import { ComponentPreviewCard } from '@/components/component-preview-card';

// Define types for our registry items
interface RegistryItem {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  tags?: string[];
  files?: Array<{
    path: string;
    type: string;
  }>;
}

// Filter out components that are not example components
function getComponents(): RegistryItem[] {
  return Object.entries(Index)
    .filter(([, component]) => {
      return (
        (component.type === 'registry:component' || component.type === 'registry:block') &&
        !component.name.includes('-demo')
      );
    })
    .map(([name, component]) => ({
      name,
      ...component,
    }));
}

export default function ComponentsPage() {
  const components = getComponents();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 mb-10">
          <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
            <div className="truncate">Docs</div>
            <ChevronRightIcon className="size-3.5" />
            <div className="text-foreground">Components</div>
          </div>
        <ScrambleText
          text={"Components"}
          className={cn(
            "h-10 w-fit scroll-m-20 text-3xl font-bold tracking-tight"
          )}
          scrambleSpeed={80}
          //               useIntersectionObserver
          //               retriggerOnIntersection
        />
                      <p className="text-base text-muted-foreground">
                        <Balancer>Jump in and pick the component that catches your eye.</Balancer>
                      </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => {
          const category = getComponentCategory(component.name);
          
          return (
            <ComponentPreviewCard
              key={component.name}
              name={component.name}
              category={category}
              tags={component.tags}
              showTags={false}
              useDocsLink={true}
            />
          );
        })}
      </div>
    </div>
  );
} 