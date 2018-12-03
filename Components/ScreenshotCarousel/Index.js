const $ = require('jquery')

$(document).ready(function() {
  let sliderSingle = $('.screenshotCarousel-sliderSingle')
  let sliderNav = $('.screenshotCarousel-sliderNav')

  sliderSingle.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    adaptiveHeight: true,
    infinite: true,
    useTransform: true,
    speed: 400,
    asNavFor: sliderNav,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
    prevArrow: '<span class="screenshotCarousel-arrow screenshotCarousel-prevArrow"></span>',
    nextArrow: '<span class="screenshotCarousel-arrow screenshotCarousel-nextArrow"></span>',
  })

  sliderNav
    .on('init', function(event, slick) {
      sliderNav.find('.slick-slide.slick-current').addClass('is-active')
    })
    .slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      focusOnSelect: true,
      centerMode: true,
      infinite: true,
      asNavFor: sliderSingle,
      prevArrow:
        '<span class="screenshotCarousel-navArrow screenshotCarousel-navPrevArrow"></span>',
      nextArrow:
        '<span class="screenshotCarousel-navArrow screenshotCarousel-navNextArrow"></span>',
    })

  sliderSingle.on('afterChange', function(event, slick, currentSlide) {
    sliderNav.slick('slickGoTo', currentSlide)
    let currentNavSlide =
      sliderNav.find('.slick-slide[data-slick-index="' + currentSlide + '"]')

    sliderNav.find('.slick-slide.is-active').removeClass('is-active')
    $(currentNavSlide).addClass('is-active')
  })

  sliderNav.on('click', '.slick-slide', function(event) {
    let currentSlideIndex = $(this).data('slick-index')
    sliderSingle.slick('slickGoTo', currentSlideIndex)
  })

  if(sliderSingle.length > 0) {
    sliderSingle.slickLightbox({
      src: 'src',
      itemSelector: '.screenshotCarousel-image',
      layouts: {
        closeButton: '<span class="slickLightbox-closeButton"></span>'
      },
    })
  }
})

