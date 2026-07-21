// ------------ Gallery Module ------------
const GalleryModule = (() => {
  // Private variables
  const baseURL = "https://cdn.jsdelivr.net/gh/rojanomohammadzadeh-byte/rojanom.github.io@main/";
  let allWorkItems = [];
  let currentDisplayItems = []; // آیتم‌های در حال نمایش (فیلتر شده)
  let currentIndex = 0; // ایندکس در currentDisplayItems
  let isModalOpen = false;

  // DOM elements
  const galleryContainer = document.querySelector('.gallery-box');
  const categoryBox = document.querySelector(".drop-down ul");
  const galleryModal = document.getElementById("gallery-item-modal");
  const modalContainer = document.querySelector("section.gallery div#gallery-item-modal div.modal-content-box div.modal-img-and-info");
  const closeButton = document.querySelector("section.gallery div#gallery-item-modal div.modal-name-and-button div.close-button");
  const prevButton = document.querySelector("section.gallery div#gallery-item-modal div.modal-content div.prev-next .prev");
  const nextButton = document.querySelector("section.gallery div#gallery-item-modal div.modal-content div.prev-next .next");

  // ---------- Private Methods ----------

  const loadData = async () => {
    try {
      const response = await fetch('./worksInfo.json');
      if (!response.ok) throw new Error('Network response was not ok');
      allWorkItems = await response.json();
      return allWorkItems;
    } catch (error) {
      console.error('Error loading gallery data:', error);
      return [];
    }
  };

  // استخراج دسته‌بندی‌ها از JSON
  const extractCategories = (items) => {
    const allCategories = [];
    items.forEach(item => {
      if (item.category && !allCategories.includes(item.category)) {
        allCategories.push(item.category);
      }
    });
    return allCategories;
  };

  // ساخت دکمه‌های دسته‌بندی
  const buildCategoryButtons = (categories) => {
    if (!categoryBox) return;

    categoryBox.innerHTML = '';

    // گزینه "همه"
    // const allLi = document.createElement('li');
    // allLi.textContent = 'All';
    // allLi.dataset.category = 'all';
    // allLi.classList.add('active-category');
    // categoryBox.appendChild(allLi);

    // دسته‌بندی‌های JSON
    categories.forEach(category => {
      const li = document.createElement('li');
      li.textContent = category;
      li.dataset.category = category;
      categoryBox.appendChild(li);
    });
  };
  // let flag = 0
  // فیلتر کردن آیتم‌ها
  const filterItems = (category) => {
    // if (category === 'all') {
    //   return [...allWorkItems];
    // }
    return allWorkItems.filter(item => item.category === category);
  };

  // رندر گالری
  const renderGallery = (items) => {
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '';

    // ذخیره آیتم‌های در حال نمایش
    currentDisplayItems = items;

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('gallery-item');
      card.dataset.index = index;

      card.innerHTML = `
        <img src="${baseURL + item.src}" alt="${item.title}" loading="lazy">
        <div class="gallery-item-title">${item.title}</div>
      `;

      galleryContainer.appendChild(card);

      // رویداد کلیک - ایندکس رو از currentDisplayItems می‌گیریم
      card.addEventListener("click", () => {
        showModal(index); // ایندکس در currentDisplayItems
      });
    });
  };

  // نمایش مودال با ایندکس در currentDisplayItems
  const showModal = (index) => {
    if (!galleryModal || !modalContainer || currentDisplayItems.length === 0) return;

    // ذخیره ایندکس فعلی
    currentIndex = index;
    const item = currentDisplayItems[index];

    if (!item) return;

    galleryModal.style.display = "block";
    isModalOpen = true;

    modalContainer.innerHTML = `
      <img src="${baseURL + item.src}" alt="${item.title}">
      <span class="work-title">${item.title}</span>
    `;
  };

  // بستن مودال
  const closeModal = () => {
    if (!galleryModal) return;
    galleryModal.style.display = "none";
    isModalOpen = false;
  };

  // تغییر آیتم مودال - اینجا ساده‌تر شده
  const modalChange = (direction) => {
    if (!isModalOpen || currentDisplayItems.length === 0) return;

    // محاسبه ایندکس جدید در currentDisplayItems
    let newIndex = currentIndex + direction;

    // چرخش
    if (newIndex < 0) {
      newIndex = currentDisplayItems.length - 1;
    } else if (newIndex >= currentDisplayItems.length) {
      newIndex = 0;
    }

    // نمایش آیتم جدید
    showModal(newIndex);
  };

  // رویداد کلیک روی دسته‌بندی
  const handleCategoryClick = (e) => {
    const categoryItem = e.target.closest('li');
    if (!categoryItem) return;

    const category = categoryItem.dataset.category;
    if (!category) return;

    // بروزرسانی کلاس فعال
    document.querySelectorAll('.drop-down ul li').forEach(li => {
      li.classList.remove('active-category');
    });
    categoryItem.classList.add('active-category');

    // فیلتر و رندر
    const filtered = filterItems(category);
    renderGallery(filtered);

    // بستن منو
    const dropDownKey = document.querySelector("header nav ul li.drop-down");
    if (dropDownKey) {
      dropDownKey.setAttribute("data-check", "0");
      const dropDown = document.querySelector("header nav ul li.drop-down ul");
      if (dropDown) {
        dropDown.style.height = "0";
        dropDown.style.display = "none";
      }
    }
  };

  // تنظیم رویدادهای مودال
  const setupModalEvents = () => {
    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => modalChange(-1));
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => modalChange(1));
    }

    // کلیک روی پس‌زمینه
    if (galleryModal) {
      galleryModal.addEventListener("click", (e) => {
        if (e.target === galleryModal) {
          closeModal();
        }
      });
    }

    // کلیدهای کیبورد
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
      if (e.key === "ArrowLeft" && isModalOpen) {
        modalChange(-1);
      }
      if (e.key === "ArrowRight" && isModalOpen) {
        modalChange(1);
      }
    });
  };

  // ---------- Public Methods ----------

  const init = async () => {
    const items = await loadData();
    if (items.length === 0) {
      console.warn('No items loaded from JSON');
      return;
    }

    const categories = extractCategories(items);
    buildCategoryButtons(categories);

    if (categoryBox) {
      categoryBox.removeEventListener('click', handleCategoryClick);
      categoryBox.addEventListener('click', handleCategoryClick);
    }

    // رندر اولیه
    const initialCategory = "bazm";
    const filteredItems = filterItems(initialCategory);
    renderGallery(filteredItems);

    document.querySelectorAll('.drop-down ul li').forEach(li => {
      li.classList.remove('active-category');
      if (li.dataset.category === initialCategory) {
        li.classList.add('active-category');
      }
    });


    setupModalEvents();
  };

  // ---------- Return Public API ----------
  return {
    init,
    closeModal,
    modalChange,
    getCurrentItems: () => currentDisplayItems,
    getCurrentIndex: () => currentIndex
  };
})();

// ------------ Main Slider Module ------------
const SliderModule = (() => {
  const init = () => {
    const slideshowImages = [...document.querySelectorAll("div.main-box div.slideshow div.slideshow-img")];
    if (slideshowImages.length === 0) return;

    let currentIndex = slideshowImages.findIndex(img => img.classList.contains("active"));
    if (currentIndex === -1) {
      currentIndex = 0;
      slideshowImages[0].classList.add("active");
    }

    const changeSlider = () => {
      slideshowImages[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slideshowImages.length;
      slideshowImages[currentIndex].classList.add("active");
    };

    setInterval(changeSlider, 10000);
  };

  return { init };
})();

// ------------ Social Media Module ------------
const SocialModule = (() => {
  const init = () => {
    const instaIcon = document.querySelector("div.main-box div.content-box div.social-media svg");
    if (instaIcon) {
      instaIcon.addEventListener("click", () => {
        window.location.href = "https://www.instagram.com/rojaano/";
      });
    }
  };

  return { init };
})();

// ------------ Dropdown Module ------------
const DropdownModule = (() => {
  const init = () => {
    const dropDownKey = document.querySelector("header nav ul li.drop-down");
    const dropDown = document.querySelector("header nav ul li.drop-down ul");

    if (!dropDownKey || !dropDown) return;

    const handler = () => {
      const isOpen = dropDownKey.getAttribute("data-check") === "1";

      if (isOpen) {
        dropDown.style.height = "0";
        dropDown.style.display = "none";
        dropDownKey.setAttribute("data-check", "0");
      } else {
        dropDown.style.height = "auto";
        dropDown.style.display = "block";
        dropDownKey.setAttribute("data-check", "1");
      }
    };

    dropDownKey.removeEventListener('click', dropDownKey._handler);
    dropDownKey._handler = handler;
    dropDownKey.addEventListener("click", handler);
  };

  return { init };
})();

// ------------ Initialize ------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing modules...');

  if (document.querySelector('.gallery-box')) {
    GalleryModule.init().then(() => {
      console.log('Gallery initialized successfully');
    }).catch(error => {
      console.error('Gallery initialization error:', error);
    });
  }

  SliderModule.init();
  SocialModule.init();
  DropdownModule.init();
});