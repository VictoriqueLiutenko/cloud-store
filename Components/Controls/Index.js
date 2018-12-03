const $ = require('jquery')

$('.js-showMore').click(function(event) {
  event.preventDefault()
  $(this).css('display', 'none')

  let controlUp = $(this).parent().find('.js-up')
  controlUp.css('padding-left', '0px').css('margin-right', '130px')

  let productsWrapper = $('.js-productsWrapper')
  let products = productsWrapper.find('.js-productWide')
  products.clone().appendTo(productsWrapper)

  return false
})
