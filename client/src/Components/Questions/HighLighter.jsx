import React from 'react';

export default function Highlighter({text = '', highlight = ''}) {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, 'gi')
  const parts = text.split(regex)
  return (
    <span>
       {parts.filter(part => part).map((part, i) => (
           regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
       ))}
   </span>
  )
}