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
// = require jquery
// = require jquery_ujs
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

$(function () {
  var $body = $("body");
  $.get("/restaurants.json")
    .done(function (restaurants) {
      restaurants.forEach(function (restaurant) {
        $body.append("<div>" + restaurant.name + "</div>");
      });
    });
});

$(function () {
  var $restaurantForm = $("#new_restaurant");
  $restaurantForm.on("submit", function (event){
    event.preventDefault();
    alert("submitted");
    var restName = $('#restaurant_name').val();
    $.post('/restaurants', {
      restaurant: {
        name: restName
      }
    }).then(function(createdRestaurant){
      console.log("Created:", createdRestaurant);
    });
  });
});

$(function () {
  var $container = $("#restaurants-container");
  $.get("/restaurants.json")
    .done(function (restaurants) {
      restaurants.forEach(function (restaurant) {
        $container.append("<div>" + restaurant.name + "</div>");
      });
    });

});
