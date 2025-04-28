'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import CodeBlock from '@/delta/components/code-block';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/delta/components/tabs';
import { Admonition } from '@/delta/components/admonition';

interface InstallationInstructionsProps {
  componentName: string;
  className?: string;
}

interface RegistryFile {
  path: string;
  content: string;
  type: string;
  target: string;
}

interface RegistryData {
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export function InstallationInstructions({
  componentName,
  className,
}: InstallationInstructionsProps) {
  const [registryData, setRegistryData] = useState<RegistryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistryData = async () => {
      try {
        const response = await fetch(`/r/${componentName}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch registry data for ${componentName}`);
        }
        const data = await response.json();
        setRegistryData(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load installation instructions',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistryData();
  }, [componentName]);

  if (isLoading) {
    return (
      <div className={cn('animate-pulse', className)}>
        Loading installation instructions...
      </div>
    );
  }

  if (error) {
    return <div className={cn('text-destructive', className)}>{error}</div>;
  }

  if (!registryData) {
    return null;
  }

  // Extract dependencies and registry dependencies
  const dependencies = registryData.dependencies || [];
  const registryDependencies = registryData.registryDependencies || [];

  // Find the main component file
  const mainComponentFile = registryData.files.find(
    (file: RegistryFile) =>
      file.path.includes(`/${componentName}.tsx`) &&
      file.type === 'registry:component',
  );

  // Get all file paths that will be created
  const filePaths = registryData.files
    .filter((file: RegistryFile) => file.type === 'registry:component')
    .map((file: RegistryFile) => `${file.path} → ${file.target}`);

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-bold mt-6 mb-3">Installation</h2>

      <Tabs defaultValue="cli" className="w-full ">
        <TabsList
          variant="underlined"
          showBottomBorder
          className="w-full py-6"
          size="md"
        >
          <TabsTrigger value="cli" className="font-semibold">
            CLI
          </TabsTrigger>
          <TabsTrigger value="manual" className="font-semibold">
            Manual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cli" className="space-y-4">
          <div className="space-y-2">
            <CodeBlock
              code={`npx shadcn@latest add "https://deltacomponents.dev/r/${componentName}.json"`}
              language="bash"
              showLineNumbers={false}
              maxHeight="none"
              border={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          {dependencies.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-md font-semibold">
                1. Install the following npm dependencies:
              </h4>
              <CodeBlock
                code={`npm install ${dependencies.join(' ')}`}
                language="bash"
                showLineNumbers={false}
                maxHeight="none"
                border={true}
              />
            </div>
          )}

          {registryDependencies.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-md font-semibold">
                2. Install the following deltacomponents registry dependencies:
              </h4>
              <CodeBlock
                code={`npx shadcn@latest add ${registryDependencies.join(' ')}`}
                language="bash"
                showLineNumbers={false}
                maxHeight="none"
                border={true}
              />
            </div>
          )}

          {mainComponentFile && (
            <div className="space-y-2">
              <h4 className="text-md font-semibold">
                3. Copy and paste the following code into your project.
              </h4>
              <CodeBlock
                code={mainComponentFile.content}
                language="typescript"
                showLineNumbers={true}
                maxHeight="400px"
                border={true}
                gradientOverlay
              />
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-md font-semibold">
              4. Update the import paths to match your project setup.
            </h4>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4 mt-6">
        {dependencies.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xl font-bold mt-4 mb-2">Dependencies</h3>
            <ul className="list-disc font-mono pl-6 text-sm text-muted-foreground">
              {dependencies.map((dep: string) => (
                <li key={dep}>{dep}</li>
              ))}
            </ul>
          </div>
        )}

        {filePaths.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xl font-bold mt-4 mb-2">Files</h3>

            <Admonition type="info" title="File Mapping" variant="outline">
              The file paths below show where components will be installed in
              your project. For example:
              <br />
              <code className="text-sm">
                delta/components/button.tsx → delta/components/button.tsx
              </code>{' '}
              in your project structure.
            </Admonition>
            <ul className="list-disc pl-6 font-mono text-sm text-muted-foreground">
              {filePaths.map((path: string) => (
                <li key={path} className="break-all whitespace-normal">
                  {path}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Admonition
          type="warning"
          title="Tailwind Configuration"
          variant="outline"
        >
          Include the <code>delta/</code> directory in your{' '}
          <code>tailwind.config.ts</code>:
          <br />
          <code className="text-sm">
            {`content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./delta/**/*.{js,ts,jsx,tsx,mdx}",
]`}
          </code>
        </Admonition>
      </div>
    </div>
  );
}
