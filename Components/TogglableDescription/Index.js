const $ = require('jquery')

$('.js-togglableDescription-toggle').click(function() {
  let hiddenContent = $(this).parent().find('.js-togglableDescription-hide')

  if(hiddenContent.css('display') === 'none') {
    hiddenContent.slideDown()
    $(this).addClass('arrowRotate')
  } else if(hiddenContent.css('display') === 'block') {
    hiddenContent.slideUp()
    $(this).removeClass('arrowRotate')
  }

  return false
})