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
    

setInterval(changeSlider, 10000);

// --------------------Social Media Link
let instaIcon=document.querySelector("div.main-box div.content-box div.social-media svg")


instaIcon.addEventListener("click",function(){
    window.location.href="https://www.google.com/"
    
    
})
