/**
 * Component to inject JSON-LD structured data into page head
 * Usage: <SeoSchema schema={generateProductSchema(...)} />
 */

interface SeoSchemaProps {
  schema: Record<string, any>;
}

export function SeoSchema({ schema }: SeoSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
