$(document).ready(function () {
  var dataHardcoded = {states: [
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

  var reposHardcoded = {repositories: [
      {
        created:"2012-02-01T13:52:00Z",
        created_at: "2012-02-01T13:52:00Z"
      },
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

  var username;
  $('.loader-container').hide();

  // inside click function
  // -----------------------------------------------------------------------------
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
        var dataComingBack;
        console.log(data);
        console.log('data stringified', JSON.stringify(data.repositories[0]["username"]));
        username = JSON.stringify(data.repositories[0]["username"]);
        dataComingBack = JSON.stringify(data);
        // console.log('data coming back', dataComingBack.repositories);

        // $("#results").html();
        $("#results").toggleClass('hidden');

        $("#results").prepend(username);

        // variable for script it shows up on page
        var source = $("#myTemplate").html();
        console.log('reposHardcoded here', username);
        var template = Handlebars.compile(source);
        var html = template(reposHardcoded);
        $("#stateList").html(html);

      }
    })
    .done(function() {
      console.log("success");
    })
  });
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
