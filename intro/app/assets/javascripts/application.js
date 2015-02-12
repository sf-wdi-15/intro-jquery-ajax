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

//wait for page to load
$(function () {
					var $body = $("body");
					$.get("/restaurants.json")
							// wait for it to finish
							.done(function (rest) {
								rest.forEach(function(x) {
									$body.append("<div>" + x.name + "</div>");
								})
							})

					// post to 'restaurants.json'
					// the '.json' tells our rails
					// app that we want 'json' back
					// after it creates something.
					$.post("/restaurants.json", {
						restaurant: {
							name: "blah"
						}

					})

					// newly created restaurant
					.done(function (data) {
						console.log("New Restaurant", data)
						})
});

// having a routing error and can't move forward with the following.


// // Waiting for window to load
// $(function () {
//   // fetch the restaurant
//   var  $restaurantForm = $("#new_restaurant");

//   // wait for a submit event. 
//   // Read up on the `.on` method in JQuery docs
//   $restaurantForm.on("submit", function (event) {
//     // `event` is the event object that has info about
//     //    what was submitted

//     // This keeps the page from reloading.
//     event.preventDefualt();
//     alert("submitted");

//     // view page source to see the input
//     //  has this id. Then we grab it's value.
//     var restName = $("#restraunt_name").val();

//     // like before
//     $.post("/restaurants.json", {
//       restaurant: {
//         name: restName
//       }
//     }).then(function (createdRestaurant) {
//       console.log("CREATED:", createdRestaurant);
//     });
//   });
// });