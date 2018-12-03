const $ = require('jquery')


$(document).on('click', '.js-anchor', function (event) {
  event.preventDefault()

  $('html, body').animate({
    scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
  }, 500, 'swing')

  return false
})

let imageInitialTopCoordinates
$(document).ready(function() {
  let sidebarImage = $('.js-sidebarImage')
  if(sidebarImage.length > 0) {
    imageInitialTopCoordinates = $('.js-sidebarImage').offset().top
  }
})

$(document).scroll(function() {
  let purchaseBlock = $('.js-purchaseBlock')
  
  if(purchaseBlock.length > 0) {
    let purchaseBlockTopCoordinates = purchaseBlock.offset().top
    let purchaseBlockHeight = purchaseBlock.height()

    let image = $('.js-sidebarImage')
    let imageTopCoordinates = image.offset().top

    let currentScrollPosition = $(document).scrollTop()

    if(currentScrollPosition >= imageTopCoordinates) {
      image.parent().addClass('sidebar--fixed')
    } 
    if(currentScrollPosition <= imageInitialTopCoordinates) {
      image.parent().removeClass('sidebar--fixed')
    }

    if(currentScrollPosition >= (purchaseBlockTopCoordinates + purchaseBlockHeight)) {
      $('.js-purchaseBlock--sidebar').slideDown()
      $('.js-purchaseBlock--sidebar').css('display', 'flex')
    } else {
      $('.js-purchaseBlock--sidebar').slideUp()
    }
  }
})

let hintLink = $('.js-sidebarHintLink')

hintLink.click(function(event) {
  event.preventDefault()
  $(this).parent().find('.js-sidebarHint').slideToggle()
})
