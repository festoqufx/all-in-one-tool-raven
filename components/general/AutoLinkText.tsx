import React from 'react';

interface AutoLinkTextProps {
  /**
   * The raw text content which may contain URLs.
   */
  text: string;
}

const urlRegex = /((https?:\/\/|www\.)[^\s/$.?#].[^\s]*)/gi;

/**
 * AutoLinkText Component
 *
 * Converts URLs in plain text into clickable anchor tags that open in a new tab.
 * Handles URLs starting with http://, https://, and www.
 *
 * @example
 * <AutoLinkText text="Visit www.example.com or https://ferdinandestoque.com/" />
 */
const AutoLinkText: React.FC<AutoLinkTextProps> = ({ text }) => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  const matches = Array.from(text.matchAll(urlRegex));

  matches.forEach((match, index) => {
    const url = match[0];
    const start = match.index ?? 0;

    if (lastIndex < start) {
      parts.push(text.slice(lastIndex, start));
    }

    const href = url.startsWith('http') ? url : `https://${url}`;
    parts.push(
      <a
        key={`link-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-black underline decoration-black/30 underline-offset-4 hover:decoration-black"
      >
        {url}
      </a>
    );

    lastIndex = start + url.length;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <div className="break-words">{parts}</div>;
};

export default AutoLinkText;
