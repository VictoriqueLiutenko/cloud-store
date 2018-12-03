const $ = require('jquery')

let configureButton = $('.js-configureButton')

configureButton.each(function() {
  $(this).click(function() {
    let parent = $(this).closest('.js-subscriptionDetails')
    let blockToShow = $(parent).find('.js-onConfigureButtonClickShow')

    if(blockToShow.css('display') === 'none') {
      blockToShow.slideDown()
      $(this).addClass('subscriptionDetails-configureButton--active')
    } else {
      blockToShow.slideUp()
      $(this).removeClass('subscriptionDetails-configureButton--active')
    }
  })
})

let commentSubmit = $('.js-subscriptionConfigurations-commentSubmit')

commentSubmit.click(function() {
  let commentInput = $(this).parent().find('.js-subscriptionConfigurations-comment')
  let parent = $(this).closest('.js-subscriptionDetails')
  let commentLine = $(parent).find('.js-subscriptionDetails-comment')

  commentLine.text(commentInput.val())
})