import React from "react";
import "./index.css";

type ButtonProps = {
  size: number
}

export function HighlightButton(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & ButtonProps) {
  return <span className="highlight-button">
    <div className="bg" />
    <div className="text"
      {...props}
      style={{
        fontSize: `${props.size}rem`,
        transform: `translateY(-${props.size * 1.2}rem)`,
        padding: `0 0.5rem`,
      }}
    />
  </span>
}