const $ = require('jquery')

let products = $('.js-recommendedToTry-products > div')
let informationBlock = $('.js-recommendedToTry-informationBlock')
let arrow = $('.js-recommendedToTry-informationBlockArrow')
let arrowLeft = Math.round(products.first().width() / 4)

let productsWrapperWidth = products.parent().width()
let allProductsWidth = products.length * products.first().width()
let distanceBetweenProducts = Math.floor((productsWrapperWidth - allProductsWidth) / (products.length - 1))

let previousIndex = null
products.each(function(index, element) {
  $(this).click(function() {
    products.css('opacity','0.5')
    let current = informationBlock[index]

    if($(current).css('display') === 'none') {
      if(previousIndex !== null) {
        $(current).show()
      } else {
        $(current).slideDown()
      }
      $(current).css('display', 'flex')

      $(this).addClass('recommendedToTry-product--active')
      if(previousIndex !== null) {
        $(products[previousIndex]).removeClass('recommendedToTry-product--active')
        $(informationBlock[previousIndex]).hide()
      }
      let currentArrowLeftPosition = 
        arrowLeft + ((distanceBetweenProducts + $(this).width() - arrow.width()) * index)
      arrow.animate({
        left: currentArrowLeftPosition
      })

      previousIndex = index
    } else {
      products.css('opacity','1')
      $(current).slideUp()
      $(this).removeClass('recommendedToTry-product--active')
      previousIndex = null
    }
  })
})