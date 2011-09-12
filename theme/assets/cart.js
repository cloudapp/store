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

  if (email) {
    $(document)
      .queue("cartAjax", function() {
        $.post("/cart/update.js", { "attributes[email]": email }, function() {
          $(document).dequeue("cartAjax");
        }, 'json');
      })

      .dequeue("cartAjax");

    // Attach the CloudApp user's email to the cart to auto-apply this purchase
    // to their account after the checkout is complete.
    $(function() { $("input[name='attributes[email]']").val(email); });
  }

  $(function() {
    $("form").submit(function() {
      var form      = $(this),
          productID = form.find("input[name=id]").val();

      form.addClass("loading");

      // This doesn't work yet, but it's close.
      $(document)
        .queue("cartAjax", function() {
          $.post("/cart/clear.js", function() {
            $(document).dequeue("cartAjax");
          }, 'json');
        })

        .queue("cartAjax", function() {
          $.post("/cart/add.js", { id: productID }, function() {
            window.location = "/checkout"
          }, 'json');
        })
        .dequeue("cartAjax");

      return false;
    });

    $("#one-month a").click(function() {
      $(this).closest("form").submit();
      return false;
    });
  });

}());
