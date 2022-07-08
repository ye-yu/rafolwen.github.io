Portfolio
---

I have updated the layout of my portfolio to become less cluttered. As a result, the new portfolio looks cleaner and uses less script.

# Features & Improvement

The first improvement that I did is to remove a few texts at the header and give more space and time for viewer to observe the first page. Here, I am using orange highlight to draw attention at the programming language/framework that I mainly use and the resume button. The secondary highlight is at the top right navbar for redirecting viewer to about me page. I make it non-sticky so that it did not become the main attraction of the page.

Scrolling down the page is a dynamic list of my projects. The embedded javascript grabs the project meta in  `projects/projects.json`. I used a Python notebook to keep all the records of my projects so that I can dynamically export the project meta as well as the project post directory in `project/<project hash>/` of which the hash is the id of the project. After clicking on one of the projects, the viewer will be presented with the project post. In the URL, the query contains the project id, which indicates the javascript to grab the intended project post. This means I can reuse the page to view a different project without having to create a new page.

I have also make use of the bootstrap library by added the meta tag for viewport priority. Previously, I was not aware of this feature and ended up creating a stylesheet just for responsive text size.

# Future plan

In my old portfolio, there is an inactive app at the very top of the page. This is supposed to be a simulated SQL application for interested viewer to run custom query on my information. I am planning to add this but not at the top of the page because this would distract the viewer. I will probably put this at the end of the page. In addition, I might be adding easter egg and puzzles for my friends to view and explore around.

Another key feature that I would like to add is the project sorting and filter as well as search box. This can add more precision to the listing of the projects. Finally, I should add more projects to show off my skills in Python, Java, and Javascript.
