export function Display(props: any) {
  return <div
    {...props}
    style={{
      fontSize: "3rem",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.2rem",
      ...(props.style ?? {})
    }}
  />
}