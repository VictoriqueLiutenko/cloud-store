const $ = require('jquery')

$(document).ready(function() {
  let slider = $('.promoBannerCarousel')
  slider.slick({
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    fade: false,
    adaptiveHeight: false,
    infinite: true,
    useTransform: true,
    speed: 400,
    cssEase: 'ease-out',
    easing: '_default',
    prevArrow:
      '<span class="promoBannerCarousel-arrow promoBannerCarousel-prevArrow"></span>',
    nextArrow:
      '<span class="promoBannerCarousel-arrow promoBannerCarousel-nextArrow"></span>',
    dotsClass: 'promoBannerCarousel-dots',
  })

  $('.promoBannerCarousel').parent().css('visibility', 'visible')
})

