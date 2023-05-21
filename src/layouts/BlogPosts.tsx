import { observer } from "mobx-react";
import { Display } from "../components/Display";
import useBreakpoint from "../hooks/useBreakpoint";
import stylesheet from "../styles";
import projectJson from "../assets/blogs.json";
import { useStores } from "../stores";
import { ProjectCardNew } from "../components/ProjectCardNew";

function BlogPosts() {
  const { breakpoint } = useBreakpoint()
  const { appState: { theme: mode } } = useStores()

  return <div style={{
    ...stylesheet.ColumnFlex,
    marginBottom: "5rem",
  }}>
    <div style={stylesheet.FlexItemGrow}>
      <Display style={stylesheet.CenteredResponsive(breakpoint)}>
        Blog Posts
      </Display>
      <div style={stylesheet.CenteredResponsive(breakpoint)}>
        Enjoy blog posts that I wrote back when I had a lot of time in my hands.
      </div>
    </div>
    <div>
    </div>

    {
      projectJson.map((project, index) => <ProjectCardNew
        numbering={index + 1}
        key={project.link}
        mode={mode}
        project={project}
        breakpoint={breakpoint}
      />)
    }
  </div>
}

export default observer(BlogPosts)