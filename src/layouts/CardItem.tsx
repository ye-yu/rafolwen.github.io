import { Display } from "../components/Display"
import stylesheet from "../styles"

interface CardProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  title: string
  pills: string[]
  content: string
  center?: boolean
}


export function CardItem({ title, style = {}, center = false }: CardProps) {
  return <div style={{
    ...stylesheet.ColumnFlex,
    ...style,
  }}>
    <Display style={{
      fontSize: "1.2rem",
      fontWeight: "bold",
      letterSpacing: "0.1rem",
      textAlign: center ? "center" : "left",
    }}>{title}</Display>
  </div>
}