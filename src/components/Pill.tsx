export function Pill({ children, style = {} }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <span style={{
    background: "yellow",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    padding: "0 0.2rem",
    display: "inline-block",
    ...style,
  }}>
    {children}
  </span>
}