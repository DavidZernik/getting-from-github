$(document).ready(function () {
  var username;
  $('.loader-container').hide();
  $("#search").on("click", function() {
    var searchTerm = $('#searchTerm').val();
    var url =  "https://api.github.com/legacy/repos/search/";
    console.log('search term!!', searchTerm);

    $.ajax({
      url: url + searchTerm,
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data, status, jqXHR) {
        console.log(data);
        console.log('stringified', JSON.stringify(data.repositories[0]["username"]));
        username = JSON.stringify(data.repositories[0]["username"]);
        // $("#results").html();
        $("#results").toggleClass('hidden');

        $("#results").prepend(username);

      }
    })
    .done(function() {
      console.log("success");
    })
  });

// Handlebars templating
// -----------------------------------------------------------------------------
    var data = {states: [
        {name:"Pennsylvania"},
        {name:"NJ"},
        {name:"Florida"},
        {name:"California"},
        {name:"Texas"},
        {name:"New Mexico"},
        {name:"Arizona"},
        {name:"Maine"},
        {name:"NH"},
        {name:"Montana"},
        {name:"Oklahoma"}
    ]};

    // variable for script it shows up on page
    var source = $("#myTemplate").html();
    //
    var template = Handlebars.compile(source);
    var html = template(username);
    $("#stateList").html(html);
});

// Stop and start for loader image
// -----------------------------------------------------------------------------
$(document).ajaxStop(function () {
  console.log('ajax stop');
  $('.loader-container').hide();
});

$(document).ajaxStart(function () {
  console.log('ajax start');
  $('.loader-container').show();
});
