$('.link').click(e => {
  window.location = $(e.target.parentElement).attr('href');
})

var projectCategories = JSON.parse(`
  [
    \"Machine Learning\",
    \"Web\",
    \"Command Line Tools\"
  ]
`);

for(i of projectCategories){
  let temp_id = i.toLowerCase().replace(" ", "-");
  let temp_name = i;
  let navTabTemplate = `<span class="nav-link" id="v-tabs-${temp_id}-tab" data-toggle="pill" href="#v-tabs-${temp_id}" role="tab" aria-controls="v-tabs-${temp_id}" aria-selected="false">${temp_name}</span>`;
  $("#v-tabs-tab-projects").append(navTabTemplate);
}
