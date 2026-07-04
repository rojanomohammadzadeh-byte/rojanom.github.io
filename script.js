document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-text");

  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = "translateY(20px)";

    setTimeout(() => {
      hero.style.transition = "1.2s ease";
      hero.style.opacity = 1;
      hero.style.transform = "translateY(0)";
    }, 200);
  }
});

function showYear(year,event){

    document.querySelectorAll(".year-group")
    .forEach(group=>group.classList.remove("active"));

    document.querySelectorAll(".year")
    .forEach(year=>year.classList.remove("active"));

    document.getElementById(year)
    .classList.add("active");

    event.target.classList.add("active");

}
