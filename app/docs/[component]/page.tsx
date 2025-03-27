import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getComponentByName, getAllComponents } from '@/lib/registry';
import { ComponentPreview } from '@/components/component-preview';
import { ComponentCode } from '@/components/component-code';
import { ComponentMeta } from '@/components/component-meta';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/delta/components/tabs';
import { cn } from '@/lib/utils';
import { ArrowBendUpLeft } from '@phosphor-icons/react/dist/ssr';

export async function generateStaticParams() {
  const components = await getAllComponents();
  return components.map((component) => ({
    component: component.name,
  }));
}

type Params = Promise<{ component: string }>;

interface PageProps {
  params: Params;
}

export default async function ComponentPage({ params }: PageProps) {
  const { component } = await params;
  const componentName = await getComponentByName(component);

  if (!componentName) {
    notFound();
  }

  return (
    <div className="container py-10">
      <div className="relative">
        {/* Back button with UI text */}
        <div className="absolute top-0 left-0 lg:relative lg:top-auto lg:left-auto lg:h-8 lg:ml-[-7rem]  lg:mb-0 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className={cn('')}>
              <ArrowBendUpLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-sm font-medium text-muted-foreground">UI</span>
        </div>

        {/* Title and badge container - positioned to the left */}
        <div className="flex items-center gap-2 pl-0">
          <h1 className="text-2xl font-bold mt-10 sm:mt-[-30]">
            {componentName.title}
          </h1>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="preview">
          <TabsList variant="underlined" showBottomBorder={true} size="md">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          <TabsContent
            value="preview"
            className="mt-4 rounded-lg border p-2 min-h-[400px]"
          >
            <ComponentPreview component={componentName} />
          </TabsContent>
          <TabsContent value="code" className="mt-4 min-h-[400px]">
            <ComponentCode component={componentName} />
          </TabsContent>
          <TabsContent value="usage" className="mt-4 space-y-4 min-h-[400px]">
            <ComponentMeta component={componentName} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
