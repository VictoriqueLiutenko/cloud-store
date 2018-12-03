const $ = require('jquery')
const $slider = require('ion-rangeslider')

function initializeSliders($input, $slider) {
  $slider.ionRangeSlider({
    type: 'single',
    min: $slider.data('min'),
    max: $slider.data('max'),
    hide_min_max: true,
    hide_from_to: true,
    grid: true,
    grid_num: $slider.data('step'),
    onChange(data) {
      let multiplier = $slider.data('multiplier') || 1
      $input.val(data.from * multiplier)
    },
    prettify(num) {
      if ($slider.data('captionMax') && num === Number($slider.data('max'))) {
        return '1 ' + $slider.data('captionMax')
      }
      if ($slider.data('caption')) {
        return num + ' ' + $slider.data('caption')
      }
      return num
    }
  })

  $input.on('input', function() {
    let sliderData = $slider.data('ionRangeSlider')
    let currentInputValue = $(this).val()

    if ($slider.data('multiplier')) {
      currentInputValue /= $slider.data('multiplier')
    }

    sliderData.update({
      from: currentInputValue
    })
  })

  $input.on('focusout', function() {
    let sliderData = $slider.data('ionRangeSlider')
    let multiplier = $slider.data('multiplier') || 1
    let currentInputValue = $(this).val()

    currentInputValue = Math.max(currentInputValue, sliderData.options.min * multiplier)
    currentInputValue = Math.min(currentInputValue, sliderData.options.max * multiplier)

    $(this).val(currentInputValue)
  })
}

$('.formComparison-controlsSlider').each(function() {
  let $slider = $(this)
  let $input = $slider.parent().find('.formComparison-controlsInput')
  initializeSliders($input, $slider)
})

$('.js-checkboxIcon').click(function() {
  let checkbox = $(this).parent().find('.js-invisibleCheckbox')
  checkbox.prop('checked', !checkbox.is(':checked'))

  return false
})
