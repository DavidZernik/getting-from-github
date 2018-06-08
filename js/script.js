// sample data
// -----------------------------------------------------------------------------
$(document).ready(function () {
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

  // inside click function
  // -----------------------------------------------------------------------------
  $("#search").on("click", function() {
    var searchTerm = $('#searchTerm').val();
    var url =  "https://api.github.com/legacy/repos/search/";

    $.ajax({
      url: url + searchTerm,
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data, status, jqXHR) {
        // $("#search").addClass('hidden');

        // variable for script it shows up on page
        var source = $("#myTemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        console.log('reposHardcoded', reposHardcoded);
        console.log('data', data);
        $("#stateList").html(html);

        var monkeyList = new List('test-list', {
          valueNames: ['name'],
          page: 10,
          pagination: true
        });
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
  $('.loader-container').addClass('hidden');
});

$(document).ajaxStart(function () {
  console.log('ajax start');
  $('.loader-container').removeClass('hidden');
});
