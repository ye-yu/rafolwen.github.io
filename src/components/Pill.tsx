export function Pill({ children, style = {}, mode = "light" }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { mode?: "light" | "dark" }) {
  return <span style={{
    background: mode === "light" ? "yellow" : "blue",
    transition: "all ease 1s",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    padding: "0 0.2rem",
    display: "inline-block",
    ...style,
  }}>
    {children}
  </span>
}