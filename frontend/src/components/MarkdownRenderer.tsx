import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 as oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-invert max-w-none"
      components={{
        // 代码块渲染
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          if (inline) {
            return (
              <code
                className="bg-gray-700 text-pink-400 px-1.5 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <SyntaxHighlighter
              style={oneDark as Record<string, React.CSSProperties>}
              language={match ? match[1] : 'text'}
              PreTag="div"
              className="rounded-lg !my-4"
              showLineNumbers
              wrapLines
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          );
        },
        // 图片渲染
        img({ src, alt }) {
          return (
            <img
              src={src}
              alt={alt || ''}
              className="max-w-full h-auto rounded-lg my-4 shadow-lg"
              loading="lazy"
            />
          );
        },
        // 链接渲染
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {children}
            </a>
          );
        },
        // 表格渲染
        table({ children }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-gray-600 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          );
        },
        thead({ children }) {
          return <thead className="bg-gray-700">{children}</thead>;
        },
        th({ children }) {
          return (
            <th className="px-4 py-2 text-left font-semibold border-b border-gray-600">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="px-4 py-2 border-b border-gray-700">{children}</td>
          );
        },
        // 引用块渲染
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-700/50 rounded-r-lg italic">
              {children}
            </blockquote>
          );
        },
        // 列表渲染
        ul({ children }) {
          return <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>;
        },
        // 标题渲染
        h1({ children }) {
          return <h1 className="text-2xl font-bold my-4 pb-2 border-b border-gray-600">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-xl font-bold my-3 pb-1 border-b border-gray-700">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-lg font-semibold my-2">{children}</h3>;
        },
        // 段落
        p({ children }) {
          return <p className="my-2 leading-relaxed">{children}</p>;
        },
        // 强调
        strong({ children }) {
          return <strong className="font-bold text-white">{children}</strong>;
        },
        em({ children }) {
          return <em className="italic text-gray-300">{children}</em>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
