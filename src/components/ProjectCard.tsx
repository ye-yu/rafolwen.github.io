import stylesheet from "../styles";
import { Pill } from "./Pill";
import { Titlelink } from "./TitleLink";

export function ProjectCard({ breakpoint, project, mode, numbering }: { breakpoint: string, project: Record<string, string>, mode?: "light" | "dark", numbering: number }) {
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
      }
    }>
      <img style={{
        ...stylesheet.RoundImage(breakpoint),
        width: 200,
        height: 200,
      }} src={process.env.PUBLIC_URL + '/projects/' + project.hash + '/thumbnail.jpg'} alt="project" />
      <div>{project.category}</div>
      <div>{project.section}</div>
    </div>
    <div style={{
      flex: 1,
      textAlign: "left",
      alignSelf: "flex-start",
      width: "100%",
    }}>
      <Titlelink mode={mode} href={"https://ye-yu.github.io/portfolio/post.html?id=" + project.hash}>[{numbering}] {project.title}</Titlelink>
      <br />
      <div style={{ color: "#6f6f6f", marginBottom: ".4rem" }}>{project.date}</div>
      <div style={{
        ...stylesheet.RowFlex,
        justifyContent: "flex-start",
        marginBottom: "2rem",
      }}>
        {
          project.scope.split(",").map((t, i) => <Pill
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