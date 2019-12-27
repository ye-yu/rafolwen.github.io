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
        paintCode();
        },
        error: function (e, status, errStr) {
          console.log(e);
          console.log(status);
          console.log(errStr);
        }
      });
    }
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
