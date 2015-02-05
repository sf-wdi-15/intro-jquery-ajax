# Intro JQuery AJAX
## Rails Applications HW???

### Before Anything

You'll be expected to have a lot of question about this assignment. As you go through the assignment write down at least `10` questions. You'll be asked to share your top five tomorrow.

* `fork` and `clone` this lab.
* Once cloned `git checkout -b working`
* After each exercise
  * `git add . -A`
  * `git commit -m "some message"`
* Once **COMPLETELY FINISHED** 
  * make sure you `add` and `commit` everything.
    * `git checkout master`
    * `git merge working`
    * `git push origin master`
    * `git push origin working`
  * On git hub you should submit a [pull request](https://help.github.com/articles/creating-a-pull-request/).

If you have troubles with this workflow you'll have troubles when you're in a group and you should talk with an instructor.


### Background

Let's play around with a single model and jQuery to create and display a simple `restaurant` model to our rails application. 

**Be careful with spelling**

**Be careful with spelling**

**Be careful with spelling**

### Initial Setup

We will need some routes

* `resources` for `restaurants` and a `root to: "restaurants#index"`

We will need the following model

*  a `restaurant` with a `name`

We will need the following controller

* A `restaurants` controller with an `index` and `create`

### A Simple API

Let's start with building a partial API for `restaurants`. Let's setup the following `respond_to` for the index.

`restaurants_controller.rb`

```
  def index
    @restaurants = Restaurant.all

    respond_to do |f|
      f.html
      f.json { render json: @restaurants }
    end
  end

```

Go into you `rails console` and try to create a `Restaurant`. If that doesn't work start debugging... `:(`

Verify that going to [`/restaurants.json`](localhost:3000/restaurants.json) sends a json list of `restaurants.`


### A Simple AJAX Request

JQuery comes with every new rails application by default. To see this look at your `application.js`

`app/assets/javascripts/application.js`

```
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
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


```

see how it says the following:


```
...

//= require jquery
//= require jquery_ujs
...

```

Let's write a simple script in our `application.js` to get all articles.

`app/assets/javascripts/application.js`

```
...

// wait for the page to load
$(function () {
  // make a request to get all articles
  $.get("/articles.json")
    // wait for it to finish
    .done(function (data) {
      console.log(data);
    });
});

```

Verify it works. Start your application and go to `localhost:3000`. You should see something like the following in you **Chrome Console**:

```
> [Object]
```

### Creating

Let's make a post request to create a `restaurant` every time we load the `/restaurants` route.


```
// wait for the page to load
$(function () {
  // make a request to get all articles
  $.get("/articles.json")
    // wait for it to finish
    .done(function (data) {
      console.log(data);
    });

  // post to `restraunts.json`
  // the `.json` tells our rails 
  // app that we want `json` back
  // after it creates something.
  $.post("/restraunts.json",  {
      restaurant: {
        name: "blah"
      }
    })
    // newly created restaurant
    .done(function (data) {
      console.log("New Restaurant", data)
    });
});


```





However, we have to setup our backend to receive the request and `respond_to` the `json` format.


```
  def create
    @restaurant = Restaurant.create(params.require(:restaurant).permit(:name))
    
    respond_to do |f|
      # note how for HTML requests we still want to redirect
      f.html { redirect_to restaurants_path }
      # we send back the new restaurant as JSON.
      f.json { render json: @restaurant }
    end
  end

```

Now we our backend is setup to receive data and we should try to send data to it using `$.post`. Luckily we already wrote that code earlier so all we have to do is refresh the `localhost:3000` page, and we should see the data in the Chrome Console.

```
> New Restaurant Object {id: 2, name: "blah", created_at: "2015-01-21T23:09:40.431Z", updated_at: "2015-01-21T23:09:40.431Z"}
```


### Exercises

* Iterate through all the `restaurants` and append them to the `body`.
  * Add an `div` with `id` of `restaurants-container` to `restaurants/index.html.erb`. Append all the elements to that `div` instead.
* Put a `form_for` a restaurant in your `index.html.erb`. 

  ```
  <%= form_for @restaurant do |f| %>
    <div>
      <%= f.text_field :name %>
    </div>
    <div>
      <%= f.submit %>
    </div>
  <% end %>

  ```

  * Listen for a `submit` event on the `form`. Note that if you look at the rendered for in the browser and view page source you'll see that the rendered form has id of `#new_restaurant`. When the form is submitted add take in the event and `preventDefualt()`. Then alert `"submitted!"`.

    ```
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
    ```
  * After you `alert` use the `$.post` method like the one we used earlier to actually create something on the backend. Note before you do this you should probably grab the `name` of the restaurant out of the `form`. You might have to view the page source to see what that input's id is. 


### Bonus

* Use after you `post` from the `form` append the `createdRestaurant` to `
restaurants-container` in the index.html.erb.

### Extreme Bonus

* Add a button to `delete`. This will require you to setup a few things.

  * `restaurants#destroy` method in the controller.
  * It should append a `<button id="delete">Delete</delete>` with every new `restaurant` append to the page.

### Solutions If Stuck

* Iterate through all the `restaurants` and append them to the `body`

  ```
  $(function () {
    var $body = $("body");
    $.get("/restaurants.json")
      .done(function (restaurants) {
        restaurants.forEach(function (restaurant) {
          $body.append("<div>" + restaurant.name + "</div>");
        });
      });
  });

  ```
  * Add an `div` with `id` of `restaurants-container` to `restaurants/index.html.erb`. Append all the elements to that `div` instead.

    ```
      $(function () {
        var $container = $("#restaurants-container");
        $.get("/restaurants.json")
          .done(function (restaurants) {
            restaurants.forEach(function (restaurant) {
              $container.append("<div>" + restaurant.name + "</div>");
            });
          });

      });
    ```
* Put a `form_for` a restaurant in your `index.html.erb`. 

  ```
  <%= form_for @restaurant do |f| %>
    <div>
      <%= f.text_field :name %>
    </div>
    <div>
      <%= f.submit %>
    </div>
  <% end %>

  ```

  * Listen for a `submit` event on the `form`. Note that if you look at the rendered for in the browser and view page source you'll see that the rendered form has id of `#new_restaurant`. When the form is submitted add take in the event and `preventDefualt()`. Then alert `"submitted!"`.

    ```
    // Waiting for window to load
    $(function () {
      // fetch the restaurant
      var  $restaurantForm = $("#new_restaurant");

      // wait for a submit event. 
      // Read up on the `.on` method in JQuery docs
      $restaurantForm.on("submit", function (event) {
        // `event` is the event object that has info about
        //    what was submitted

        // This keeps the page from reloading.
        event.preventDefualt();
        alert("submitted");
      });
    });
    ```

  * After you `alert` use the `$.post` method like the one we used earlier to actually create something on the backend. Note before you do this you should probably grab the `name` of the restaurant out of the `form`. You might have to view the page source to see what that input's id is. 


    ```
    // Waiting for window to load
    $(function () {
      // fetch the restaurant
      var  $restaurantForm = $("#new_restaurant");

      // wait for a submit event. 
      // Read up on the `.on` method in JQuery docs
      $restaurantForm.on("submit", function (event) {
        // `event` is the event object that has info about
        //    what was submitted

        // This keeps the page from reloading.
        event.preventDefualt();
        alert("submitted");

        // view page source to see the input
        //  has this id. Then we grab it's value.
        var restName = $("#restaurant_name").val();

        // like before
        $.post("/restaurants.json", {
          restaurant: {
            name: restName
          }
        }).then(function (createdRestaurant) {
          console.log("CREATED:", createdRestaurant);
        });
      });
    });
    ```
