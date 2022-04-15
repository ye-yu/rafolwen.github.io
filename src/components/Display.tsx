export function Display(props: any) {
  return <div
    {...props}
    style={{
      fontSize: "3rem",
      fontWeight: "normal",
      textTransform: "uppercase",
      ...(props.style ?? {})
    }}
  />
}