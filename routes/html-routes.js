// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/splash.html"));
  });

   app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/admin/index.html"));
  });

  app.get("/database.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/admin/database.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/login.html"));
  });

  // cms route loads cms.html
  app.get("/form", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/client/form.html"));
  });

   // cms route loads cms.html
  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/client/contact.html"));
  });

   // cms route loads cms.html
  app.get("/adminform", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/admin/createsurveyform.html"));
  });

  app.get("/editsurvey/:snum", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/admin/editsurvey.html"));
  });

  // blog route loads blog.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/client/signup.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

};
