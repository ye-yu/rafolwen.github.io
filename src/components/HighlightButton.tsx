import React from "react";
import "./index.css";

type ButtonProps = {
  size: number
  active?: boolean
}

export function HighlightButton(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & ButtonProps) {
  return <a className={"highlight-button" + (props.active ? "-active" : "")}>
    <span>{props.children}</span>
    <span></span>
  </a>
}