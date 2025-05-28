
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: "/questions/",
    url: "./pages/questions.html", //  Combined questions page
  },
  {
      path: "/done/",
      url: "./pages/done.html", // finished page
  },
  {
      path: "/results/",
      url: "./pages/results.html", // show results page
  },
  
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
