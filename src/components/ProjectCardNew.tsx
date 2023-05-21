import stylesheet from "../styles";
import { Pill } from "./Pill";
import { Titlelink } from "./TitleLink";

export function ProjectCardNew({ breakpoint, project, mode, numbering }: { breakpoint: string, project: Record<string, any>, mode?: "light" | "dark", numbering: number }) {
  return <div style={{
    ...stylesheet.CenteredResponsive(breakpoint),
    ...(breakpoint === "mobile" ? stylesheet.ColumnFlex : stylesheet.RowFlex),
    justifyContent: "flex-start",
    width: breakpoint === "mobile" ? "100%" : "85%",
  }}>
    <div style={
      {
        flex: 0,
        flexBasis: 200,
        paddingLeft: breakpoint === "mobile" ? "unset" : "4rem",
        paddingRight: breakpoint === "mobile" ? "unset" : "4rem",
        marginBottom: breakpoint === "mobile" ? "2rem" : "unset",
      }
    }>
      <img style={{
        ...stylesheet.RoundImage(breakpoint),
        width: 200,
        height: 200,
        marginBottom: breakpoint === "mobile" ? "1rem" : "2rem",
      }} src={project.thumbnail} alt="project" />
    </div>
    <div style={{
      flex: 1,
      textAlign: "left",
      alignSelf: "flex-start",
      width: "100%",
    }}>
      <Titlelink mode={mode} href={process.env.PUBLIC_URL + project.link}>[{numbering}] {project.title}</Titlelink>
      <br />
      <div style={{ color: "#6f6f6f", marginBottom: ".4rem" }}>{new Date(project.timestamp).toLocaleString()}</div>
      <div style={{
        ...stylesheet.RowFlex,
        justifyContent: "flex-start",
        marginBottom: "2rem",
      }}>
        {
          project.categories.map((t: string, i: number) => <Pill
            key={i}
            mode={mode}
            style={{ marginRight: ".3rem" }}>{t}</Pill>)
        }
      </div>
      <div style={{
        fontSize: "1rem",
        lineHeight: "1.8rem",
        display: "block",
        width: "100%",
      }}>{project.description}</div>
    </div>
  </div>

}