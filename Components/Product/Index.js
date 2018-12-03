const $ = require('jquery')

$(document).ready(function() {
  let descriptions = $('.js-product-description')
  
  descriptions.each(function() {
    let moreDescription = $(this).parent().find('.js-moreDescription')
    let realHeight = this.scrollHeight

    if(realHeight > $(this).height()) {
      let blur = $(this).parent().find('.js-product-descriptionBlur')
      
      blur.css('display', 'block')
      moreDescription.css('display', 'block') 
      $(this).css('max-height', '150px')
    }
  }) 
})

$('.js-moreDescription').click(function() {
  $(this).css('display', 'none')

  let description = $(this).parent().find('.js-product-description')
  description.css({
    'overflow': 'visible',
    'max-height': 'none'
  })

  let blur = $(this).parent().find('.js-product-descriptionBlur')
  blur.css('display', 'none')

  return false
})