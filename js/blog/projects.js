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

function joinObjToQuery(obj) {
  let objArray = [];

  for(let i in obj) {
    objArray.push(i + '=' + obj[i]);
  }

  return objArray.join('&');
}
var queries = getQueryObj();

function changeQuery(query, page) {
  let baseUrl = 'blog.html?';

  for(let i in query) {
    queries[i] = query[i];
  }

  if (page == undefined) {
    page = $('title')[0].innerHTML;
  }

  let url = joinObjToQuery(queries)
  url = url ? baseUrl + url : baseUrl;
  if (typeof (history.pushState) != "undefined") {
    var obj = {Page: page, Url: url};
    history.pushState(obj, obj.Page, obj.Url);
  }
  document.title = page;
}

$("#v-tabs-tab-projects > *").click(e => {
  // Update URL
  changeQuery({category:e.target.innerHTML});
});
