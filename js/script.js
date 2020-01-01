$(document).ready(function() {
  var headerContainer = $('.header__container');
  var headerHeight = headerContainer.outerHeight();

  var logo = $('.logo');
  var phone = $('.phone');
  var phoneButton = $('.open-phone-form');

  var menu = $('.menu');
  var contacts = $('.contacts');
  var menuPopup = $('.menu-popup');
  var requestForm = $('.popup--request');

  function openMenu() {
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
    //requestForm.css({'display' : 'block'});
    elem.css({'display' : 'block'});
  }

  function closePopup(elem) {
    //requestForm.css({'display' : 'none'});
    elem.css({'display' : 'none'});
    $('.overlay').css({'display' : 'none'});
  }

  function createStick() {
    if($(window).scrollTop() < headerHeight && !headerContainer.parent().hasClass('stick')) return;
    if($(window).scrollTop() < headerHeight && headerContainer.parent().hasClass('stick')) {
      headerContainer.parent().removeClass('stick');
      logo.children().last().css({'display' : 'block'}); // появляется текст к логотипу
    } else {
        headerContainer.parent().addClass('stick');
        logo.children().last().css({'display' : 'none'}); // убрать текст к логотипу
      }
  }
  $(document).scroll(createStick);

  $(window).resize(function() {
    if(menuPopup.hasClass('open') && $('body').width() >= 1270) { //??????????
      closeMenu();
    }
  });

  $('body').click(function(event) {
    if(event.target.className === 'open-menu' && !menuPopup.hasClass('open')) {
      openMenu();
      return;
    }
    if(!event.target.closest('.menu-popup') && menuPopup.hasClass('open')) {
      event.preventDefault();
      closeMenu();
      return;
    }
    if(event.target.className === 'menu-popup__close') {
      closeMenu();
      return;
    }
    if(event.target.className === 'open-phone-form' || event.target.className === 'contacts__link') {
      openPopup($('.popup--request'));
      return;
    }
    if(event.target.closest('.popup__close--request') || (event.target.className === 'overlay' && $('.popup--request').css('display') === "block")) {
      closePopup($('.popup--request'));
      return;
    }
    if(event.target.closest('.popup__close--success') || (event.target.className === 'overlay' && $('.popup--success').css('display') === "block")) {
      closePopup($('.popup--success'));
      return;
    }
  });

  $('.request__phone').inputmask({
    "mask": "+7 ( 999 ) 999 - 99 - 99",
    "placeholder": "_"
  });

  $('.request').submit(function() {
    event.preventDefault();
    $.mockjax({url: '*'});
    $.ajax({
      type: 'POST',
      data: $('.request').serialize(),
      url: '*',
      error: function(obj, textStatus, errorThrown) {
        alert(textStatus + ': ' + errorThrown);
      },
      success: function(data, text, obj) {
        openPopup($('.popup--success'));
      }
    });
  });
});
