document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-text");
  hero.style.opacity = 0;
  hero.style.transform = "translateY(20px)";

  setTimeout(() => {
    hero.style.transition = "1.2s ease";
    hero.style.opacity = 1;
    hero.style.transform = "translateY(0)";
  }, 200);
});
<script>
function showYear(year){
  const groups = document.querySelectorAll('.year-group');
  const buttons = document.querySelectorAll('.year');

  groups.forEach(g => g.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  document.getElementById(year).classList.add('active');
  event.target.classList.add('active');
}
</script>
