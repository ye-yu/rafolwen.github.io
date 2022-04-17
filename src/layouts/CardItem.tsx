import { observer } from "mobx-react"
import { Display } from "../components/Display"
import { Pill } from "../components/Pill"
import { useStores } from "../stores"
import stylesheet from "../styles"

interface CardProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  title: string
  pills: string[]
  content: React.ReactNode
  center?: boolean
}


function CardItem({ title, style = {}, center = false, pills, content }: CardProps) {
  const { appState: { theme: mode }} = useStores()

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
    <div style={{
      ...stylesheet.RowFlex,
      justifyContent: center ? "center" : "left",
      marginTop: "1rem",
    }}>
      {
        pills.map(e => <Pill style={{marginRight: "0.5rem"}} key={e} mode={mode}>{e}</Pill>)
      }
    </div>
    <div style={{
      fontSize: "1rem",
      textAlign: "justify",
      color: "#4f4f4f",
      marginTop: "1rem",
      lineHeight: "1.5rem",
    }}>
      {content}
    </div>
  </div>
}

export default observer(CardItem)