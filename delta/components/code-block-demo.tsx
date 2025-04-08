import CodeBlock from "./code-block";

export default function CodeBlockDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Demo: Code Block</h3>
      <div className="p-6 border rounded-lg bg-slate-50 dark:bg-slate-900">
        <CodeBlock />
      </div>
    </div>
  );
}
