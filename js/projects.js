// read from projects.JSON
var projects;
var mlProjects;
var webProjects;
$.ajax({
  url: "/js/blog/projects.json",
  dataType: "json",
  success: function (data) {
    projects = data;
    mlProjects = projects.projects.filter(x => x.category == 'Machine Learning');
    webProjects = projects.projects.filter(x => x.category == 'Web');
  }
});
