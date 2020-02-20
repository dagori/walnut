'use strict';
$(document).ready(function() {
  var headerContainer = $('.header__container');
  var headerHeight = headerContainer.outerHeight();
  var logo = $('.logo');
  var phone = $('.phone');
  var phoneButton = $('.open-phone-form');
  var menu = $('.menu');
  var contacts = $('.contacts');
  var menuPopup = $('.menu-popup');
  var WIDTH_LIMIT = 1270;

  $('.request__phone').inputmask({
    "mask": "+7 ( 999 ) 999 - 99 - 99",
    "placeholder": "_"
  });

  function openMenu() {
    if(menuPopup.hasClass('open')) return;
    menuPopup.addClass('open');
    menu.addClass('mobile');
    contacts.addClass('mobile');
    menuPopup.append(menu);
    menuPopup.append(contacts);
  }

  function closeMenu() {
    menuPopup.removeClass('open');
    menu.removeClass('mobile');
    contacts.removeClass('mobile');
    headerContainer.append(menu);
    headerContainer.append(contacts);
  }

  function openPopup(elem) {
    $('.overlay').css({'display' : 'block'});
    elem.css({'display' : 'block'});
  }

  function closePopup(elem) {
    elem.css({'display' : 'none'});
    $('.overlay').css({'display' : 'none'});
  }

  function createStick() {
    if($(window).scrollTop() < headerHeight && !$('.header').hasClass('stick')) return;
    if($(window).scrollTop() < headerHeight && $('.header').hasClass('stick')) {
      $('.header').removeClass('stick');
      logo.children().last().css({'display' : 'block'}); // появляется текст к логотипу
    } else {
        $('.header').addClass('stick');
        logo.children().last().css({'display' : 'none'}); // убрать текст к логотипу
      }
  }

  $(document).scroll(createStick);
  $(window).resize(function() {
    if(menuPopup.hasClass('open') && $('body').width() >= WIDTH_LIMIT) {
      closeMenu();
    }
  });
  //открыть меню в мобильной и планшетной версии
  $('.open-menu').click(openMenu);
  //закрыть меню в мобильной и планшетной версии
  $('.menu-popup__close').click(closeMenu);
  menuPopup.mouseleave(closeMenu);
  //закрыть окно отправки формы
  $('.popup__close--request').click(function() {
    closePopup($('.popup--request'));
  });
  //закрыть сообщение успешной отправки формы
  $('.popup__close--success').click(function() {
    closePopup($('.popup--success'));
  });
  //открыть окно отправки формы
  $('.open-phone-form').click(function() {
    openPopup($('.popup--request'));
  });
  $('.contacts__link').click(function() {
    event.preventDefault();
    openPopup($('.popup--request'));
  });
  //зыкрыть меню при переходе по ссылке
  $('.link').click(function() {
    if(menuPopup.is(':visible')) {
      closeMenu();
    }
  });
  //закрыть попапы при клике по оверлэю
  $('.overlay').click(function() {
    $('.popup').each(function() {
      if($(this).is(':visible')) {
        closePopup($(this));
      }
    });
  });
  //обработка отправки формы

  $('.request').submit(function() {
    event.preventDefault();
    $.mockjax({url: '*'});
    $.ajax({
      type: 'POST',
      data: $('.request').serializeArray(),
      url: '*',
      error: function(obj, textStatus, errorThrown) {
        alert(textStatus + ': ' + errorThrown);
      },
      success: function(data, text, obj) {
        closePopup($('.popup--request'));
        openPopup($('.popup--success'));
        $('.request').trigger('reset');
      }
    });
  });
});
