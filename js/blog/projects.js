var md = new Remarkable();
let currentQueries = getQueryObj();
if (!Object.keys(currentQueries).length < 1) {
  if (currentQueries.project != undefined) {
    displayProjectFromID(currentQueries.project);
  }
}

function displayProjectFromID(id) {
  $("#project-header").hide();
  $("#projects").empty();

  let projectSrc = `js/blog/content/${id}.md`;

  // fetch md content
  $.ajax({
    url: projectSrc,
    contentType: "text/plain",
    success: function (data) {
      $("#projects").append(`
        <div class="project-markdown pt-5">
        ${md.render(data)}
        </div>`);
        paintCode();
      },
      error: function (e, status, errStr) {
        $("#projects").append('<p>Sorry! Project description not available yet.</p>')
      }
  });
}

function paintCode() {
  $('body')
  .find('code')
  .each(function() {
    var $code = $(this),
    cls = $code.attr('class'),
    language;

    // no language information at all
    if(typeof cls === 'undefined') {
      return;
    }

    // actually we should also check if a valid "lang-" class
    // (which is by default set through marked) is given
    language = cls.split('-')[1];

    // add the data-language to the <code> element
    $code.data('language', language);
    console.log(cls);
  });

  // let the rainbows shine
  Rainbow.color();
}
