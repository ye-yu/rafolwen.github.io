import { observer } from "mobx-react";
import { Display } from "../components/Display";
import useBreakpoint from "../hooks/useBreakpoint";
import stylesheet from "../styles";

function BlogPosts() {
  const { breakpoint } = useBreakpoint()

  return <div style={stylesheet.ColumnFlex}>
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
  </div>
}

export default observer(BlogPosts)