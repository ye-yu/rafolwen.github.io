var md = new Remarkable();
let currentQueries = getQueryObj();
if (!Object.keys(currentQueries).length < 1) {
  if (currentQueries.project != undefined) {
    // Content placeholder
    let projectSrc = `js/blog/content/${currentQueries.project}.md`;
    $("#projects").empty();

    // fetch md content
    $.ajax({
      url: projectSrc,
      contentType: "text/plain",
      success: function (data) {
        $("#project-header-title").empty();
        $("#project-header-subtitle").html(`Project ID: ${currentQueries.project.slice(0, 6)}`);
        $("#projects").append(`
          <div class="project-markdown pt-5">
          ${md.render(data)}
          </div>`);
        },
        error: function (e, status, errStr) {
          console.log(e);
          console.log(status);
          console.log(errStr);
        }
      });
    }
  }
