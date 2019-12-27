var md = new Remarkable();
let currentQueries = getQueryObj();
if (!Object.keys(currentQueries).length < 1) {
  if (currentQueries.project != undefined) {
      // Content placeholder
      let projectSrc = `blog/content/${currentQueries.project}.md`;
      console.log(`Searching for ${projectSrc}`);
      $("#projects").empty();
  }
}
