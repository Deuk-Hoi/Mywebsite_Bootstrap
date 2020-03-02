$(function() {
    
    $(window).scroll(function() {
      var p = $("nav").last();
      var offset = p.offset();
      var pathname = $(location).attr('pathname');
      var a = pathname.split('/');
      console.log(a[1]);


      if(offset.top > 100) {
        $("nav").addClass("bg-dark");
        //alert("hi");
       
      }
      else {
        $("nav").removeClass("bg-dark");
      }
    });
  });