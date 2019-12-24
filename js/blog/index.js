// Activate all tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function displayCategory() {
  // Dynamically obtain categories
  let projectCategories = projects.projectCategories.map(x => x.name);
  let activeClasses = 'nav-link active my-5 my-lg-0 py-3 text-lg-left text-center';
  let inactiveClasses = 'nav-link my-5 my-lg-0 py-3 text-lg-left text-center';

  for(let i of projectCategories){
    let temp_id = i.toLowerCase().replace(" ", "-");
    let temp_name = i;
    let navTabTemplate = `<span
      class="nav-link my-5 my-lg-0 py-3 text-lg-left text-center"
      id="v-tabs-${temp_id}-tab"
      data-toggle="pill"
      href="#v-tabs-${temp_id}"
      role="tab"
      aria-controls="v-tabs-${temp_id}"
      aria-selected="false">
        ${temp_name}
      </span>`;
    $("#v-tabs-tab-projects").append(navTabTemplate);
  }

  $("#v-tabs-tab-projects > *").click(e => {
    displayProjects(e.target.innerHTML);
    displayProjectsCategory(e.target.innerHTML);
  });
}

// read from projects.JSON
var projects;
$.ajax({
  url: "js/blog/projects.json",
  dataType: "json",
  success: function (data) {
    projects = data;
    displayCategory();

    selectedProjects = projects.projects.filter(x => true);

    let currentQueries = getQueryObj();
    if (!Object.keys(currentQueries).length < 1) {
      if (currentQueries.category != undefined) {
        let category = decodeURI(currentQueries.category);
        displayProjects(category);
        displayProjectsCategory(category);
      }
    } else {
      displayProjectsCategory("All Projects");
      displayProjects("All Projects");
    }
  }
});

function displayProjectsCategory(targetCategory) {
  targetCategory = targetCategory.trim();
  let project = projects.projectCategories.filter(x => x.name == targetCategory)[0];
  let description = project.desc;
  $("#project-header-title").html(targetCategory);
  $("#project-header-subtitle").html(description.replace(/'\n'/g, '<br />'));
}

function displayProjects(targetCategory) {
  targetCategory = targetCategory.trim();
  let projs = projects.projects.filter(x => x.category == targetCategory);
  if (targetCategory == "All Projects") {
    projs = projects.projects.filter(x => true);
  }
  $("#projects").empty();
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
