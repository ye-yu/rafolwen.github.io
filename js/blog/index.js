var projectCategories = JSON.parse(`
  [
    \"Machine Learning\",
    \"Web\",
    \"Command Line\"
  ]
`);

for(i of projectCategories){
  let temp_id = i.toLowerCase().replace(" ", "-");
  let temp_name = i;
  let navTabTemplate = `<span class="nav-link my-5 my-lg-0 py-3 text-lg-left text-center" id="v-tabs-${temp_id}-tab" data-toggle="pill" href="#v-tabs-${temp_id}" role="tab" aria-controls="v-tabs-${temp_id}" aria-selected="false">${temp_name}</span>`;
  $("#v-tabs-tab-projects").append(navTabTemplate);
}

// Activate all tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// read from projects.JSON
var projects;
$.ajax({
  url: "js/blog/projects.json",
  dataType: "json",
  success: function (data) {
    projects = data;
    selectedProjects = projects.projects.filter(x => true);
    displayProjectsCategory("All Projects");
    displayProjects(selectedProjects);
  }
});

function displayProjectsCategory(targetCategory) {
  let project = projects.projectCategories.filter(x => x.name == targetCategory)[0];
  let description = project.desc;
  $("#project-header-title").html(targetCategory);
  $("#project-header-subtitle").html(description.replace(/'\n'/g, '<br />'));
  console.log(description.replace('\n', '<br />'));
}

function displayProjects(projs) {
  for(i of projs) {
    let imgSrc = i.thumbnailSrc ? i.thumbnailSrc : "https://via.placeholder.com/150";
    let imgCap = i.thumbnailCap ? i.thumbnailCap : "No captions provided";
    let projTitle = i.name;
    let projSubtitle = "Tagged under: " + i.tags.join(", ");
    let projDesc = i.description;
    let projLink = "blog.html?project=" + i.hashId;
    let template = `
    <div class="row py-1 border-bottom">
      <div class="col-lg-3 py-4 d-flex flex-column justify-content-center align-items-center">
        <div>
          <img src="${imgSrc}" class="image-responsive-200" alt="${imgCap}" />
        </div>
        <div class="text-sm font-weight-bold">
          ${imgCap}
        </div>
      </div>
      <div class="col-lg-9 px-5 px-lg-3">
        <a class="pt-3 pb-1 font-main d-block text-body text-ml" href="${projLink}">
          ${projTitle}
        </a>
        <div class="pt-1 pb-2 pl-2 border-bottom font-main text-muted text-sm">
          ${projSubtitle}
        </div>
        <div class="py-3 px-2 text-body">
          ${projDesc}
        </div>
      </div>
    </div>

    `;
    $("#projects").append(template);
  }
}

$("#v-tabs-tab-projects > *").click(e => {
  displayProjectsCategory(e.target.innerHTML);
});
