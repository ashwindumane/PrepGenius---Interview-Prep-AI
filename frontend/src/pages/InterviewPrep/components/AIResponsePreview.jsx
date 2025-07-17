import React from 'react';
import { LuCopy } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p({ node, children }) {
            const hasBlock =
              node.children?.some(
                (child) => child.tagName === 'code' || child.type === 'element'
              );

            // Don't wrap block-level content with <p>
            if (hasBlock) return <>{children}</>;
            return <p className="mb-3 text-gray-700">{children}</p>;
          },
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (inline) {
              return (
                <code className="bg-gray-200 rounded px-1 py-0.5">
                  {codeString}
                </code>
              );
            }

            return (
              <div className="relative my-3">
                <div className="absolute right-2 top-2">
                  <button
                    className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1 rounded"
                    onClick={() => navigator.clipboard.writeText(codeString)}
                  >
                    <LuCopy size={16} />
                  </button>
                </div>
                <SyntaxHighlighter
                  language={match?.[1] || ''}
                  style={oneLight}
                  PreTag="div"
                  customStyle={{
                    background: '#f8fafc',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    margin: 0,
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          },
          strong({ children }) {
            return <strong className="font-semibold">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic">{children}</em>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-5 mb-3">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-5 mb-3">{children}</ol>;
          },
          li({ children }) {
            return <li className="mb-1">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-3">
                {children}
              </blockquote>
            );
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold mb-3 mt-4">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-semibold mb-3 mt-4">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-medium mb-3 mt-4">{children}</h3>;
          },
          h4({ children }) {
            return <h4 className="text-md font-normal mb-2 mt-3">{children}</h4>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          hr() {
            return <hr className="my-4 border-gray-300" />;
          },
          img({ src, alt }) {
            return <img src={src} alt={alt} className="max-w-full h-auto my-3" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;
