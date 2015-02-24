// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
// wait for the page to load
$(function () {
  $.get("/restaurants.json")
    .done(function (data) {
      console.log(data);
    });
  $.post("/restaurants.json",  {
      restaurant: {
        name: "blah"
      }
    })
    .done(function (data) {
      console.log("New Restaurant", data)
    });
});
// Waiting for window to load
$(function () {
  // fetch the restaurant
  var  $restaurantForm = $("#new_restaurant");

  // wait for a submit event. 
  // Read up on the `.on` method in JQuery docs
  // code here...

    // `event` is the event object that has info about
    //    what was submitted


});

