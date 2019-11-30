// read from projects.JSON
var projects;
$.ajax({
  url: "/js/blog/projects.json",
  dataType: "json",
  success: function (data) {
    projects = data;
  }
});
