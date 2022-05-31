module.exports = function (app, passport, db) {


  // //////////////
  // Landing page///

  app.get("/", (req, res) => {
    res.render("index.ejs");
  });


  // //////////////
  // LogOut page//
  app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  app.get("/home", isLoggedIn, function (req, res) {
    db.collection('ideas')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("home.ejs", {
          user : req.user,
          ideas: result,
        });
      });
  });

  app.post("/stormBoard", isLoggedIn, (req, res) => {
    db.collection('ideas').insertOne(
      { 
        userID: req.user,
        name: req.body.name,
        idea: req.body.idea
      },
      (err, result) => {
        if (err) return console.log(err);
        console.log("Stored the Idea");
        res.redirect("/home");
      }
    )
  });

  // /////////////////////
  // edit path////////////
  // /////////////////////

  // app.get('/edit', isLoggedIn, (req, res) => {
  //   db.collection('ratRecord').find().toArray((err, result) => {
  //       if (err) return console.log(err)
  //       res.render('index.ejs', {ratRecord: result})
  //   })
  // })
  
  app.put("/idea-approved", isLoggedIn, (req, res) => {
    db.collection('ideas').findOneAndUpdate(
        { 
          userID: req.user,
          name: req.body.name,
          idea: req.body.idea
        },
        { $set: {
            name: 'Approved'
        }   
    },
    {
        sort: {_id: -1},  
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
  });
  
  app.put("/idea-notApproved", isLoggedIn, (req, res) => {
    db.collection('ideas').findOneAndUpdate(
        { 
          userID: req.user,
          name: req.body.name,
          idea: req.body.idea
        },
        { $set: {
            name: 'Not Approved'
        }   
    },
    {
        sort: {_id: -1},  
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
  }); 

// //////////////////////////
// Delete ///////////////////
// //////////////////////////

app.delete('/deleteIdea', isLoggedIn, (req, res) => {
  db.collection('ideas').findOneAndDelete(
    {
      userID: req.user,
      name: req.body.name,
      idea: req.body.idea
      }, 
      (err, result) => {
    if (err) return res.send(500, err)
    res.send('Idea deleted!')
  }) 
})

  // ////////////////////////
  // Sign in and log in//////
  // ////////////////////////

  app.get("/signup", (req, res) => {
    res.render("signup.ejs");
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home",
      failureRedirect: "/",
      failureFlash: true,
    })
  );

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/home",
      failureRedirect: "/",
      failureFlash: true,
    })
  );
};


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
