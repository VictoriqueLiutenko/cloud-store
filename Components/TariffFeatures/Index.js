const $ = require('jquery')

let firstTime = true

$('.js-tariffOption').change(function() {

  $('.js-tariffFeatures > div').hide()

  const selectedOption = $(this).find('option:selected')
  const featureClass = selectedOption.data('target')
  const feature = $('.' + featureClass)

  if(firstTime) {
    feature.slideDown()
  } else {
    feature.show()
  }

  firstTime = false

  return false
})
