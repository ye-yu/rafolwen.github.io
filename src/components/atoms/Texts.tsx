import "./Texts.css";

export enum FontSize {
  petite = "petite",
  small = "small",
  medium = "medium",
  large = "large",
  humongous = "humongous",
}

export enum FontWeight {
  light = "light",
  regular = "regular",
  bold = "bold",
}

export function PrimaryText(props: any = {}) {
  const propsClassName: string = props.className ?? "";
  const size = props.size ?? FontSize.medium;
  const weight = props.weight ?? FontWeight.regular;
  return (
    <span
      {...props}
      className={[
        "primary-text",
        `font-size-${size}`,
        `font-weight-${weight}`,
        propsClassName,
      ].join(" ")}
    ></span>
  );
}

export function SecondaryText(props: any = {}) {
  const propsClassName: string = props.className ?? "";
  const size = props.size ?? FontSize.medium;
  const weight = props.weight ?? FontWeight.regular;
  return (
    <span
      {...props}
      className={[
        "secondary-text",
        `font-size-${size}`,
        `font-weight-${weight}`,
        propsClassName,
      ].join(" ")}
    ></span>
  );
}
