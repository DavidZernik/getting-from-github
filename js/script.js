$(document).ready(function () {
  $('.name').on('click', function() {
    if ($(this).next().is(':hidden')) {
      $(this).next().slideDown();
      $(this).css('color', '#E03616');

    } else {
      $(this).next().slideUp();
      $(this).css('color', 'black');
    }
  });

  // Variable where cache will be stored
  var requestCache = {};
  // Basic endpoint without search query
  var url =  "https://api.github.com/legacy/repos/search/";

  function getCacheOrMakeRequest(searchTerm) {
    if (requestCache[searchTerm]) {
      console.log('IT IS cached!');
    } else {
      console.log('not cached...make request!');
      requestCache[searchTerm] =
      $.ajax({
        url: url + searchTerm,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      });
    }

    return requestCache[searchTerm];
  }

  $('#search').on('click', function() {
    var searchTerm = $('#searchTerm').val();

    getCacheOrMakeRequest(searchTerm)
      // returns promise, now manipulate data
      .then(function(data, status, jqXHR) {
        var source = $("#myTemplate").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        $("#listForPagination").html(html);

        var paginationItems = new List('test-list', {
          valueNames: ['name'],
          page: 10,
          pagination: true
        });

        $('.category__extra-info-container').hide();
    })
  });
});

// This event needs to bound to static element in order to work with pagination
$(document).on('click', "li", function () {
  $('.category__extra-info-container').hide();
});

// This event also needs to bound to static element in order to work with pagination
$(document).on('click', '.name', function () {
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
