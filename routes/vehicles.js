var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//build the REST operations at the base for vehicles
//this will be accessible from http://127.0.0.1:3000/vehicles if the default route for / is left unchanged
router.route('/')
    //GET all vehicles
    .get(function(req, res, next) {
        //retrieve all vehicles from Monogo
        mongoose.model('Vehicle').find({}, function (err, vehicles) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/vehicles folder. We are also setting "vehicles" to be an accessible variable in our jade view
              /*      html: function(){
                        res.render('vehicles/index', {
                              title: 'All my Vehicles',
                              "vehicles" : vehicles
                          });
                    },*/
                    //JSON response will show all vehicles in JSON format
                    json: function(){
                        res.json(vehicles);
                    }
                });
              }     
        });
    })
    //POST a new vehicle
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var brand_code = req.body.brand_code;
        var type_code = req.body.type_code;
        var brand_name = req.body.brand_name;
        var type_name = req.body.type_name;
        var y2015 = req.body.y2015;
        var y2014 = req.body.y2014;
        var y2013 = req.body.y2013;
        var y2012 = req.body.y2012;
        var y2011 = req.body.y2011;
        var y2010 = req.body.y2010;
        var y2009 = req.body.y2009;
        var y2008 = req.body.y2008;
        var y2007 = req.body.y2007;
        var y2006 = req.body.y2006;
        var y2005 = req.body.y2005;
        var y2004 = req.body.y2004;
        var y2003 = req.body.y2003;
        var y2002 = req.body.y2002;
        var y2001 = req.body.y2001;

        //call the create function for our database
        mongoose.model('Vehicle').create({
            brand_code : brand_code,
            type_code : type_code,
            brand_name : brand_name,
            type_name : type_name,
            years : {
              2015 : y2015,
              2014 : y2014,
              2013 : y2013,
              2012 : y2012,
              2011 : y2011,
              2010 : y2010,
              2009 : y2009,
              2008 : y2008,
              2007 : y2007,
              2006 : y2006,
              2005 : y2005,
              2004 : y2004,
              2003 : y2003,
              2002 : y2002,
              2001 : y2001

            }

        }, function (err, vehicle) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new vehicle: ' + vehicle);
                  res.format({
                    /*
                      //HTML response will set the  and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("vehicles");
                        // And forward to success page
                        res.redirect("/vehicles");
                    },
                    */
                    //JSON response will show the newly created vehicle
                    json: function(){
                        res.json(vehicle);
                    }
                });
              }
        })
    });

/* GET New vehicle page. */
router.get('/new', function(req, res) {
    res.render('vehicles/new', { title: 'Add New Vehicle' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Vehicle').findById(id, function (err, vehicle) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(vehicle);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Vehicle').findById(req.id, function (err, vehicle) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + vehicle._id);
        var vehicledob = vehicle.dob.toISOString();
        vehicledob = vehicledob.substring(0, vehicledob.indexOf('T'))
        res.format({
          json: function(){
            res.json(vehicles);
          }
        });
      }
    });
  });

router.route('/:id/edit')
  //GET the individual vehicle by Mongo ID
  .get(function(req, res) {
      //search for the vehicle within Mongo
      mongoose.model('Vehicle').findById(req.id, function (err, vehicle) {
          if (err) {
              console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
              //Return the vehicle
              console.log('GET Retrieving ID: ' + vehicle._id);
              var vehicledob = vehicle.dob.toISOString();
              vehicledob = vehicledob.substring(0, vehicledob.indexOf('T'))
              res.format({
                  //HTML response will render the 'edit.jade' template
                  html: function(){
                         res.render('vehicles/edit', {
                            title: 'Vehicle' + vehicle._id,
                            "vehicledob" : vehicledob,
                            "vehicle" : vehicle
                        });
                   },
                   //JSON response will return the JSON output
                  json: function(){
                         res.json(vehicle);
                   }
              });
          }
      });
  })
  //PUT to update a vehicle by ID
  .put(function(req, res) {
      // Get our REST or form values. These rely on the "name" attributes
      var brand_code = req.body.brand_code;
      var type_code = req.body.type_code;
      var brand_name = req.body.brand_name;
      var type_name = req.body.type_name;  
      var years = req.body.years;

      //find the document by ID
      mongoose.model('Vehicle').findById(req.id, function (err, vehicle) {
          //update it
          vehicle.update({
              brand_code : brand_code,
              type_code : type_code,
              brand_name : brand_name,
              type_name : type_name
          }, function (err, vehicleID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } 
            else {
                    //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                    res.format({
                        html: function(){
                             res.redirect("/vehicles/" + vehicle._id);
                       },
                       //JSON responds showing the updated values
                      json: function(){
                             res.json(vehicle);
                       }
                    });
             }
          })
      });
  })
  //DELETE a Vehicle by ID
  .delete(function (req, res){
      //find vehicle by ID
      mongoose.model('Vehicle').findById(req.id, function (err, vehicle) {
          if (err) {
              return console.error(err);
          } else {
              //remove it from Mongo
              vehicle.remove(function (err, vehicle) {
                  if (err) {
                      return console.error(err);
                  } else {
                      //Returning success messages saying it was deleted
                      console.log('DELETE removing ID: ' + vehicle._id);
                      res.format({
                          //HTML returns us back to the main page, or you can create a success page

                            html: function(){
                                 res.redirect("/vehicles");
                           },
                           //JSON returns the item with the message that is has been deleted
                          json: function(){
                                 res.json({message : 'deleted',
                                     item : vehicle
                                 });
                           }
                        });
                  }
              });
          }
      });
  });

module.exports = router;