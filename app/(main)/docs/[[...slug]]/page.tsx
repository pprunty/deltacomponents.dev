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
  const componentName = slug.split('/')[0];

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
