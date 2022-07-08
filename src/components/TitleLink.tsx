export function Titlelink(props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a
    {...props}
    style={{
      fontSize: "2rem",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.2rem",
      color: "white",
      display: "inline-block",
      paddingBottom: "1rem",
      ...(props.style ?? {})
    }}
  />
}