$(document).ready(function() {
 $('input').on('click', create_cookie);
});

function create_cookie ()
{
  var pass = "pass=" + $('input').val();
  document.cookie = pass;
  console.log(pass);
};
