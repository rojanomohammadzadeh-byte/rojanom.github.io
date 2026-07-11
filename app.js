// ---------Main Slider

let slideshowImages = [...document.querySelectorAll("div.main-box div.slideshow div.slideshow-img")];

let currentIndex = slideshowImages.findIndex(img => img.classList.contains("active"));

function changeSlider() {
        if(currentIndex==slideshowImages.length-1){
            console.log("ok");
            slideshowImages[currentIndex].classList.remove("active");
            
            currentIndex=0
           slideshowImages[currentIndex].classList.add("active");
           
        }
        else{
            slideshowImages[currentIndex].classList.remove("active");
           
            slideshowImages[currentIndex+1].classList.add("active");
           
            currentIndex++
        }
        
    }
    

if(slideshowImages.length>0) {
    setInterval(changeSlider, 10000);
} 

// --------------------Social Media Link
let instaIcon=document.querySelector("div.main-box div.content-box div.social-media svg")


if(instaIcon){
    instaIcon.addEventListener("click",function(){
    window.location.href="https://www.google.com/"
    
    
})
} 




// -------------------- Work Page JS
async function loadGallery() {
  const response = await fetch('./worksInfo.json');
  const items = await response.json();

  const gallery = document.querySelector('.gallery-box');

  items.forEach((item,index) => {
    const card = document.createElement('div');
    card.classList.add('gallery-item');
    card.id=index+1
    
    card.innerHTML = `
      <img src="${item.src}" alt="${item.title}">
      
      <div class="gallery-item-title">${item.title}</div>
    `;
    
    gallery.appendChild(card);

    card.addEventListener("click",function(){
        
        
    })
    
  });
}

// loadGallery();


//--------------------------- Modal
 let galleryImages=document.querySelectorAll("section.gallery div.gallery-box div.gallery-item")
 let galleryModal=document.getElementById("gallery-item-modal")
 let closeButton=document.querySelector("section.gallery div#gallery-item-modal div.modal-name-and-button div.close-button")
 for (const galleryImage of galleryImages) {
    galleryImage.addEventListener("click",showModal)
 }
closeButton.addEventListener("click",closeModal)


 function showModal(){
    
    galleryModal.style.display="block"
 }

function closeModal(){
    galleryModal.style.display="none"
}
