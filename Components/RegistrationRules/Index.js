const $ = require('jquery')

$('.js-toggleRulles').click(function() {
  event.preventDefault()

  let rules = $('.js-registrationRules')

  $(rules).toggle()
})