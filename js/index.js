$('.link').click(e => {
  window.location = $(e.target.parentElement).attr('href');
})
