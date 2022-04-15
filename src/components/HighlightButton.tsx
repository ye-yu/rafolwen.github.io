import React from "react";
import "./index.css";

type ButtonProps = {
  size: number
  active?: boolean
}

export function HighlightButton(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & ButtonProps) {
  return <span className={"highlight-button" + (props.active ? " active" : "")}>
    <div className="bg" style={ props.active ? {
      flexBasis: `${props.size}rem`,
    } : {}} />
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