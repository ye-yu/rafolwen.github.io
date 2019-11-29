var badges = [];
var badgesDir = './images/hackerrank/';
var pushBadge = (name, imgSrc) => badges.push({name: name, imgSrc: badgesDir + imgSrc});

pushBadge('Problem Solving', 'problem-solving.svg');
pushBadge('SQL', 'sql.svg');
pushBadge('C Lang', 'c.svg');

for(i of badges) {
  let name = i.name;
  let src = i.imgSrc;
  let template = `
                    <div class="hackerrank-image py-2 my-3 mx-2 bg-white d-flex flex-column text-center justify-content-center">
                      <img class="mx-auto pt-3" src="${src}" alt="${name}" />
                      <p class="text-xs px-3 text-dark font-weight-bold">${name}</p>
                    </div>
                    `;
  $("#badges-section").append(template);
}
