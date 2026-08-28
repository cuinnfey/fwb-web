const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const releases = require("./content/releases.json");
const shows = require("./content/shows.json");

const app = express();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;


app.set("views", "./views");
app.set("view engine", "pug");
app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  //Heroku stores the origin protocol in a header variable. The app itself is isolated within the dyno and all request objects have an HTTP protocol.
  if (req.get('X-Forwarded-Proto') === 'https' || req.hostname === 'localhost') {
    //Serve app by passing control to the next middleware
    next();
  } else if (req.get('X-Forwarded-Proto') !== 'https' && req.get('X-Forwarded-Port') !== '443') {
    //Redirect if not HTTP with original request URL
    res.redirect('https://' + req.hostname + req.url);
  }
});
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', (req, res) => {
  res.render("home", { releases });
});

app.get("/music", (req, res) => {
  res.render("music", { releases });
});

app.get("/shows", (req, res) => {
  res.render("shows", { upcoming: shows.upcoming, past: shows.past });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


app.all('*', (req, res) => {
  res.status(404).render('404-page');
})

app.listen(port, host, () => {
  console.log(`fwb is listening on port ${port} of ${host}!`)
});
