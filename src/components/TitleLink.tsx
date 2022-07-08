export function Titlelink(props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & { mode?: "light" | "dark" }) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a
    {...props}
    style={{
      fontSize: "2rem",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.1rem",
      color: props.mode === "light" ? "black" : "white",
      display: "inline-block",
      paddingBottom: "1rem",
      ...(props.style ?? {})
    }}
  />
}