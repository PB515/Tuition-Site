import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders markdown to styled HTML. No raw HTML is allowed (safe by default).
export default function MarkdownView({ children }: { children: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
