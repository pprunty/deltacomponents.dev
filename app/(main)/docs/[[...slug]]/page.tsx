import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getComponentByName } from '@/lib/registry';
import { componentRegistry } from '@/delta/mapping';
import { demoComponents } from '@/delta/demos';
import { componentMetadata } from '@/app/routes';

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getDocFromParams(params: DocPageProps['params']) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.join('/') || '';
  
  // If no slug is provided (root /docs path)
  if (!slug || slug === '') {
    // Return the docs index content or metadata
    return {
      component: {
        name: 'docs-index',
        title: 'Documentation',
        description: 'Delta Components Documentation',
        type: 'doc',
      },
      // Use introduction as default content for the index page
      // or you can create a specific index content in your registry
      content: componentRegistry['introduction'] || {
        default: () => (
          <div>
            <h1>Delta Components Documentation</h1>
            <p>Welcome to the Delta Components documentation. Explore our components and guides using the navigation.</p>
          </div>
        )
      },
    };
  }
  
  // Check if this is a UI component or a regular doc
  if (slug.startsWith('ui/')) {
    // Handle UI component paths (docs/ui/component-name)
    const componentName = slug.split('/')[1];
    
    if (!componentName) {
      return null;
    }

    const component = await getComponentByName(componentName);
    if (!component) {
      return null;
    }

    const mdxContent =
      componentRegistry[componentName as keyof typeof componentRegistry];

    if (!mdxContent) {
      return null;
    }

    return {
      component,
      content: mdxContent,
    };
  } else {
    // Handle regular doc paths (docs/page-name)
    const docName = slug.split('/')[0];
    
    if (!docName) {
      return null;
    }
    
    // For regular docs like getting-started
    const mdxContent =
      componentRegistry[docName as keyof typeof componentRegistry];

    if (!mdxContent) {
      return null;
    }
    
    // For docs that don't have a component entry
    return {
      component: {
        name: docName,
        title: docName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: '',
        type: 'doc',
      },
      content: mdxContent,
    };
  }
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  const componentName = doc.component.name;
  return (
    componentMetadata[componentName] || {
      title: doc.component.title,
      description: doc.component.description,
    }
  );
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const MDXContent = doc.content;

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <MDXContent.default components={demoComponents} />
    </article>
  );
}
