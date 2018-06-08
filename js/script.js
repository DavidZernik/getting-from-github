$(document).ready(function () {
  $('.name').on('click', function() {
    console.log('clicked name!!!');
        if ($(this).next().is(':hidden')) {
          $(this).next().slideDown();
          $(this).css('color', '#E03616');

        } else {
          console.log('worked name!!!');

            $(this).next().slideUp();
            $(this).css('color', 'black');
        }
  });

  var requestCache = {};
  var url =  "https://api.github.com/legacy/repos/search/";

  function cacheOrApiCall(searchTerm) {
    if (!requestCache[searchTerm]) {
      console.log('not cached!!!');
      requestCache[searchTerm] =
      $.ajax({
        url: url + searchTerm,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      });
    } else {
      console.log('NOW ITS cached!');
    }

    return requestCache[searchTerm];
  }

  // inside click function
  // ------------------------------------------------------------
  $("#search").on("click", function() {
    var searchTerm = $('#searchTerm').val();

    cacheOrApiCall(searchTerm)
      .then(function(data, status, jqXHR) {
        // variable for script it shows up on page
        var source = $("#myTemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        console.log('data', data);
        $("#stateList").html(html);

        var monkeyList = new List('test-list', {
          valueNames: ['name'],
          page: 10,
          pagination: true
        });

        $('.category__extra-info-container').hide();
    })
  });  // closes click event
});

// This event needs to bound to static element in order to work with pagination
$(document).on('click', "li", function () {
  console.log('harry!');
  $('.category__extra-info-container').hide();
});

// This event also needs to bound to static element in order to work with pagination
$(document).on('click', '.name', function () {
  console.log('clicked name!!!');
      if ($(this).next().is(':hidden')) {
        $(this).next().slideDown();
        $(this).css('color', '#eaeaea');

      } else {
          $(this).next().slideUp();
          $(this).css('color', 'black');
      }
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
