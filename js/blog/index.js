// Activate all tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function displayCategory() {
  // Dynamically obtain categories
  let projectCategories = projects.projectCategories.map(x => x.name);

  for(let i of projectCategories){
    let temp_id = i.toLowerCase().replace(" ", "-");
    let temp_name = i;
    let navTabTemplate = `<span
      class="nav-link my-5 my-lg-0 py-3 text-lg-left text-center"
      id="v-tabs-${temp_id}-tab"
      data-toggle="pill"
      cg-name="${temp_name}"
      href="#v-tabs-${temp_id}"
      role="tab"
      aria-controls="v-tabs-${temp_id}"
      aria-selected="false">
        ${temp_name}
      </span>`;
    $("#v-tabs-tab-projects").append(navTabTemplate);
  }

  $("#v-tabs-tab-projects > *").click(e => {
    let category = e.target.attributes.getNamedItem('cg-name').nodeValue;

    // Display category desc and projects on category click
    displayProjects(category);
    displayProjectsCategory(category);

    // Update URL on category click
    changeQuery({category:category});
  });
}

function activateCategoryClass(category) {
  let id = category.toLowerCase().replace(" ", "-");
  $(`#v-tabs-${id}-tab`).trigger('click');
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
        activateCategoryClass(category);
      }
    } else {
      activateCategoryClass("All Projects");
    }
  }
});

// display project category description
function displayProjectsCategory(targetCategory) {
  let project = projects.projectCategories.filter(x => x.name == targetCategory)[0];
  let description = project.desc;
  $("#project-header-title").html(targetCategory);
  $("#project-header-subtitle").html(description.replace(/'\n'/g, '<br />'));
}

// display project by category
function displayProjects(targetCategory) {
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
    let projHash = i.hashId;
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
        <div class="pt-3 pb-1 font-main d-block text-body text-ml hover-underline" href="#" type="project-link" hash="${projHash}">
          ${projTitle}
        </div>
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
  $("[type='project-link']").on('click',
    function(){
      let id = $(this).attr('hash');
      displayProjectFromID(id);
      changeQuery({
        project: id
      })
    }
  );
}

// get url queries as object
function getQueryObj(){
  let queries = location.href.split('?')[1];
  let qArray = queries ? queries.split('&') : [];
  let qArrayDict = {}
  for(let i of qArray){
    qAttr = i.split('=')[0];
    qVal = i.split('=').slice(1).join('=');
    qArrayDict[qAttr] = qVal;
  }
  return qArrayDict;
}

// convert object to url queries
function joinObjToQuery(obj) {
  let objArray = [];

  for(let i in obj) {
    objArray.push(i + '=' + obj[i]);
  }

  return objArray.join('&');
}

// change url query
function changeQuery(query, page) {
  let baseUrl = 'blog.html?';

  if (page == undefined) {
    page = $('title')[0].innerHTML;
  }

  let url = joinObjToQuery(query)
  url = url ? baseUrl + url : baseUrl;
  if (typeof (history.pushState) != "undefined") {
    var obj = {Page: page, Url: url};
    history.pushState(obj, obj.Page, obj.Url);
  }
  document.title = page;
}
