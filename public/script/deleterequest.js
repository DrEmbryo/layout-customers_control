    $(document).ready(function() {
      $( ".deletecustomer" ).on('click', deleteCustomer);
    });

    function deleteCustomer() {
      var id = $(this).data('id');
      console.log(id);
      var confirmation = confirm("Are you sure?");
      if (confirmation) {
        $.ajax({
          type: 'DELETE',
          url: '/customer/delete/'+ id
        }).done(function(response) {
        });
       window.location.replace('/admin');
      } else {
        return false;
      }
    };
