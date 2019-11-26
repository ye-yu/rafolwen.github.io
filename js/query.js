$('#query-input').keyup(e => {
  if(e.keyCode == 13) {
    console.log(e.target.value);
  }
})
