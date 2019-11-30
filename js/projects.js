// read from projects.JSON
var projects;
var mlProjects;
var webProjects;

var appendProjectTo = (projs, eid) => {
  for(i of projs) {
    let imgSrc = i.thumbnailSrc ? i.thumbnailSrc : "https://via.placeholder.com/150";
    let imgCap = i.thumbnailCap ? i.thumbnailCap : "No captions provided";
    let projTitle = i.name;
    let projSubtitle = "Tagged under: " + i.tags.join(", ");
    let projDesc = i.description;
    let projLink = "/blog.html?project=" + i.hashId;
    let template = `
    <div class="row py-1 border-bottom">
      <div class="col-3 border-right py-4 d-flex flex-column justify-content-center align-items-center">
        <div>
          <img src="${imgSrc}" style="max-width:200px; max-height:200px;" alt="${imgCap}" />
        </div>
        <div class="text-sm font-weight-bold">
          ${imgCap}
        </div>
      </div>
      <div class="col-9">
        <a class="pt-3 pb-1 font-main h1 d-block text-body" href="${projLink}">
          ${projTitle}
        </a>
        <div class="pt-1 pb-2 pl-2 border-bottom font-main text-muted h5">
          ${projSubtitle}
        </div>
        <div class="py-3 px-2 text-body">
          ${projDesc}
        </div>
      </div>
    </div>

    `;
    $(eid).append(template);
  }
}
$.ajax({
  url: "/js/blog/projects.json",
  dataType: "json",
  success: function (data) {
    projects = data;
    mlProjects = projects.projects.filter(x => x.category == 'Machine Learning');
    webProjects = projects.projects.filter(x => x.category == 'Web');

    appendProjectTo(mlProjects, '#machine-learning-projects');
    appendProjectTo(webProjects, '#web-apps-projects');
  }
});
