const openMenu = document.querySelector('.open-menu');
const openPhoneForm = document.querySelector('.open-phone-form');
const menu = document.querySelector('.menu');
const contacts = document.querySelector('.contacts');

const menuPopup = document.querySelector('.menu-popup');
const closeMenu = document.querySelector('.menu-popup__close');

function openPopup() {
  if(!menuPopup.classList.contains('open')) {
    menuPopup.classList.add('open');
    menu.classList.add('mobile');
    contacts.classList.add('mobile');
    menuPopup.appendChild(menu);
    menuPopup.appendChild(contacts);
    document.body.style.overflow = 'hidden';
  }
}

function closePopup() {
  if(menuPopup.classList.contains('open')) {
    menuPopup.classList.remove('open');
    menu.classList.remove('mobile');
    contacts.classList.remove('mobile');
    document.querySelector('.header').appendChild(menu);
    document.querySelector('.header').appendChild(contacts);
    document.body.style.overflow = '';
  }
}

function createStick() {
  
  if(window.pageYOffset < 110) return;

}

document.onscroll = createStick;
openMenu.onclick = openPopup;
closeMenu.onclick = closePopup;
