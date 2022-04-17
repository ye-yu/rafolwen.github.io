import React from "react";
import "./index.css";

interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size: number
  active?: boolean
  link?: string
  newTab?: boolean
}

export function HighlightButton(props: ButtonProps) {
  return <div style={props.style} onClick={props.onClick}>
    <button className={"highlight-button" + (props.active ? "-active" : "")}>
      <span>{props.children}</span>
      <span></span>
    </button>
  </div>
}