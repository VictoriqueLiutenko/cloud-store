const $ = require('jquery')

// $('.js-checkboxIcon').click(function() {
//   let checkbox = $(this).parent().find('.js-invisibleCheckbox')
//   checkbox.prop('checked', !checkbox.is(':checked'))
//   return false
// })

$('.js-radioHint').click(function() {
  let radiobutton = $(this).parent().find('.js-invisibleRadioButton')
  if(radiobutton.is(':checked')) {
    return false
  }

  radiobutton.prop('checked', true)
  $('.js-formInputHint').slideUp()

  if($(this).closest('.js-formInputWithHint').length > 0) {
    let radiobuttonWithHint = $(this).parent().find('.js-invisibleRadioButton')
    let hint = $(this).parent().parent().find('.js-formInputHint')
    hint.slideDown()
  }
  return false
})