$( function() {

  // Color Temperature
  $( "#slider-range-color" ).slider({
    range: "min",
    value: 4000,
    min: 1700,
    max: 5000,
    slide: function( event, ui ) {
      var color = colorFromKelvin(ui.value);
      $('.lumen-target').css({"background-color": color});
    }
  });

  $('.lumen-target').css({"background-color":
    colorFromKelvin($( "#slider-range-color" ).slider( "value" ))
  });


  // Intesity
  $( "#slider-range-intensity" ).slider({
    range: "min",
    value: 200,
    min: 1,
    max: 500,
    slide: function( event, ui ) {
      $('.lumen-target').css({"opacity": ui.value / 1000});
    }
  });
  $('.lumen-target').css({"opacity": $( "#slider-range-intensity" ).slider( "value" ) / 1000});


  // Auto-enable
  $( "#slider-range-from" ).slider({
    range: "max",
    min: 15,
    max: 23,
    value: 19,
    slide: function( event, ui ) {
      $( "#from" ).val( ui.value + ':00 and ');
    }
  });
  $( "#from" ).val( $( "#slider-range-from" ).slider( "value" )+ ':00 and ' );
  $( "#slider-range-until" ).slider({
    range: "min",
    value: 3,
    min: 0,
    max: 9,
    slide: function( event, ui ) {
      $( "#until" ).val(ui.value + ':00');
    }
  });
  $( "#until" ).val($( "#slider-range-until" ).slider( "value" ) + ':00');


  // Moon/Sun Styling
  $('.lumen-state').click(function(){
    $(this).toggleClass("lumen-active");
    $('.lumen-target').fadeToggle( "slow", "linear" );
  });


  // Enable Schedule Styling
  $('#lumen-schedule').click(function(){
    if($( "#lumen-schedule" ).hasClass('lumen-scheduleOff')) {
      $(this).text('On').removeClass('lumen-scheduleOff');
      $('#until, #from').removeClass('lumen-timeOff');
    } else {
      $(this).text('Off').addClass('lumen-scheduleOff');
      $('#until, #from').addClass('lumen-timeOff');
    }
  });

  // Turn off when schedule is disabled
  $('#lumen-schedule').click(function() {
    if ($('#lumen-schedule').hasClass('lumen-scheduleOff')) {
      if ($('.lumen-state').hasClass('lumen-active')) {
        $('.lumen-state').toggleClass('lumen-active');
        $('.lumen-target').fadeToggle( "slow", "linear" );        
      }
    }
  })


  // Schedule Functionality
  var currentTime = new Date().getHours();

  setInterval(function() {
    currentTime = new Date().getHours();
  }, 60000)

  setInterval(function() {

    var startTime = $( "#slider-range-from" ).slider( "value" );
    var endTime = $( "#slider-range-until" ).slider( "value" );

    // Filter working = True
    if ($('.lumen-state').hasClass('lumen-active')) {
      // Auto-enable = True
      if (!$('#lumen-schedule').hasClass('lumen-scheduleOff')) {
        // Current Time is out of Schedule
        if (!(startTime <= currentTime || currentTime < endTime)) {
          $('.lumen-state').toggleClass("lumen-active");
          $('.lumen-target').fadeToggle( "slow", "linear" );
        }

      }
    // Filter is not working = False
    } else {
      // Auto-enable = True
      if (!$('#lumen-schedule').hasClass('lumen-scheduleOff')) {
        // Current time is within the Schedule
        if (startTime <= currentTime || currentTime < endTime) {
          $('.lumen-state').addClass("lumen-active");
          $('.lumen-target').fadeToggle( "slow", "linear" );

        }

      }
    }

//5000
  }, 1000)





});







function colorFromKelvin(kelvin){

    var temp = kelvin / 100;
    var red, green, blue;

    if( temp <= 66 ){

        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;

        if( temp <= 19){
            blue = 0
        } else {
            blue = temp-10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }

    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492 );
        blue = 255;
    }

      var red = parseInt(clamp(red,   0, 255));
      var green = parseInt(clamp(green, 0, 255));
      var blue = parseInt(clamp(blue,  0, 255));

      return rgbToHex(red, green, blue)
}


function clamp( x, min, max ) {

    if(x<min){ return min; }
    if(x>max){ return max; }

    return x;
}

function rgbToHex (r, g, b) {

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    if (b.length == 1) b = '0' + b;

    return '#' + (r + g + b).toUpperCase();
}
