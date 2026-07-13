// ---------Main Slider
let slideshowImages = [...document.querySelectorAll("div.main-box div.slideshow div.slideshow-img")];
let currentIndex = slideshowImages.findIndex(img => img.classList.contains("active"));

function changeSlider() {
  if (currentIndex == slideshowImages.length - 1) {
    console.log("ok");
    slideshowImages[currentIndex].classList.remove("active");
    currentIndex = 0
    slideshowImages[currentIndex].classList.add("active");
  } else {
    slideshowImages[currentIndex].classList.remove("active");
    slideshowImages[currentIndex + 1].classList.add("active");
    currentIndex++
  }
}

if (slideshowImages.length > 0) {
  setInterval(changeSlider, 10000);
}

// --------------------Social Media Link
let instaIcon = document.querySelector("div.main-box div.content-box div.social-media svg")
if (instaIcon) {
  instaIcon.addEventListener("click", function () {
    window.location.href = "https://www.google.com/"
  })
}

let allWorkItems = []
let currentIndexWorkItems = 0
let isModalOpen = false; // برای کنترل وضعیت مدال

// -------------------- Work Page JS
async function loadGallery() {
  const response = await fetch('./worksInfo.json');
  const items = await response.json();
  allWorkItems = items
  const gallery = document.querySelector('.gallery-box');
  
  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('gallery-item');
    card.id = index + 1

    card.innerHTML = `
      <img src="${item.src}" alt="${item.title}">
      <div class="gallery-item-title">${item.title}</div>
    `;

    gallery.appendChild(card);

    // رویداد کلیک برای هر کارت
    card.addEventListener("click", () => showModal(item, index))
  });

  // اضافه کردن ایون‌لیسنرهای دکمه‌ها فقط یک بار
  const prevButton = document.querySelector("section.gallery div#gallery-item-modal div.modal-content div.prev-next .prev")
  const nextButton = document.querySelector("section.gallery div#gallery-item-modal div.modal-content div.prev-next .next")
  
  if (prevButton) {
    prevButton.addEventListener("click", () => modalChange(-1))
  }
  if (nextButton) {
    nextButton.addEventListener("click", () => modalChange(1))
  }
}

if (document.querySelector('.gallery-box')) {
  loadGallery();
}

//--------------------------- Modal
let galleryModal = document.getElementById("gallery-item-modal")
let closeButton = document.querySelector("section.gallery div#gallery-item-modal div.modal-name-and-button div.close-button")

if (closeButton) {
  closeButton.addEventListener("click", closeModal)
}

let modalContainer = document.querySelector("section.gallery div#gallery-item-modal div.modal-content-box div.modal-img-and-info")

function showModal(item, index) {
  galleryModal.style.display = "block"
  isModalOpen = true
  currentIndexWorkItems = index // مقداردهی اولیه با ایندکس آیتم کلیک شده
  
  modalContainer.innerHTML = `
    <img key="${index}" src="${item.src}">
    <span class="work-title">${item.title}</span>
   
  `
}

function closeModal() {
  galleryModal.style.display = "none"
  isModalOpen = false
  // currentIndexWorkItems رو می‌تونیم ریست کنیم یا نگه داریم
}

function modalChange(direction) {
  if (!isModalOpen) return; // اگر مدال باز نیست، کاری نکن
  
  // محاسبه ایندکس جدید
  let newIndex = currentIndexWorkItems + direction;
  
  // کنترل مرزها
  if (newIndex < 0) {
    newIndex = allWorkItems.length - 1; // رفتن به آخرین آیتم
  } else if (newIndex >= allWorkItems.length) {
    newIndex = 0; // رفتن به اولین آیتم
  }
  
  currentIndexWorkItems = newIndex;
  
  // به‌روزرسانی محتوای مدال
  modalContainer.innerHTML = `
    <img key="${newIndex}" src="${allWorkItems[newIndex].src}">
    <span class="work-title">${allWorkItems[newIndex].title}</span>
   
  `
}