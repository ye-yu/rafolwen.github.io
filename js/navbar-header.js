var navbarHeader = [];
var pushNavbarHeader = (name, link) => navbarHeader.push({name: name, src: link});

pushNavbarHeader('LinkedIn', 'https://www.linkedin.com/in/raflie');
pushNavbarHeader('Resume', 'https://www.linkedin.com/in/raflie');
pushNavbarHeader('Contact', 'https://www.linkedin.com/in/raflie');

for(i of navbarHeader) {
  let name = i.name;
  let src = i.src;
  let template = `
  <a target="_blank" class="link hover-black d-flex h-100" href="${src}">
    <div class="align-self-center text-md px-4 py-2 h5">${name}</div>
  </a>
                    `;
  $("#navbar-header").append(template);
}
