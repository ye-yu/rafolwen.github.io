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
    displayProjects("All Projects");
  }
});

function displayProjects(targetCategory) {
  let project = projects.projectCategories.filter(x => x.name == targetCategory)[0];
  let description = project.desc;
  $("#project-header-title").html(targetCategory);
  $("#project-header-subtitle").html(description.replace(/'\n'/g, '<br />'));
  console.log(description.replace('\n', '<br />'));
}

$("#v-tabs-tab-projects > *").click(e => {
  displayProjects(e.target.innerHTML);
});
