/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){

  // Sticky footer
  var bumpIt = function() {
      $('body').css('margin-bottom', $('.page__footer').outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if(didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);

  // init slimmenu responsive navigation
  $('#navigation').slimmenu(
  {
      collapserTitle: 'Menu',
      animSpeed: 'medium',
      easingEffect: null,
      indentChildren: true,
      expandIcon: '+',
      collapseIcon: '-',
      resizeWidth: '800',
      expandIcon: '<i>&#9660;</i>',
      collapseIcon: '<i>&#9650;</i>'
  });
});
