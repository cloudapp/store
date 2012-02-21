(function() {

  // Quick and dirty query string parser. https://gist.github.com/1101534
  $.extend({
    parseQueryString: function(){
      var nvpair = {},
          qs     = window.location.search.replace("?", ""),
          pairs  = qs.split("&");

      $.each(pairs, function(i, v) {
        var pair = v.split("=");
        nvpair[pair[0]] = decodeURIComponent(pair[1]);
      });

      return nvpair;
    }
  });

  // If a CloudApp user's email is present, clear the cart and add the email to
  // the cart attributes.
  var email = $.parseQueryString().email;

  $(function() {
    $("form").submit(function() {
      var form      = $(this),
          productID = form.find("input[name=id]").val(),
          quantity  = parseInt(form.find("input[name=quantity]").val(), 10) || 1;

      form.addClass("loading");

      // Clear any products from the cart, add one of the the selected product
      // to the cart, tack on the owner's CloudApp email address if present, and
      // hop over to the checkout page.
      $(document)
        .queue("cartAjax", function() {
          $.post("/cart/clear.js", function() {
            $(document).dequeue("cartAjax");
          }, 'json');
        })

        .queue("cartAjax", function() {
          params = { id: productID };
          if (quantity) { params.quantity = quantity; }

          $.post("/cart/add.js", params, function() {
            $(document).dequeue("cartAjax");
          }, 'json');
        })

        .queue("cartAjax", function() {
          if (email) {
            $.post("/cart/update.js", { "attributes[email]": email }, function() {
              $(document).dequeue("cartAjax");
            }, 'json');
          } else {
            $(document).dequeue("cartAjax");
          }
        })

        .queue("cartAjax", function() {
          window.location = "/checkout"
        })
        .dequeue("cartAjax");

      return false;
    });

    // Catch click on the one-month link and submit its parent form.
    $("#one-month a").click(function() {
      $(this).closest("form").submit();
      return false;
    });

    // Show quantity fields.
    $("#quantity").click(function() {
      $("#plans").toggleClass("quantity");
      return false;
    });
  });

}());
