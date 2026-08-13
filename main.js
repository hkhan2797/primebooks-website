(function(){
  "use strict";
  document.getElementById("yr").textContent = new Date().getFullYear();

  var header = document.querySelector("header.site");
  var onScroll = function(){
    if(window.scrollY > 12){ header.classList.add("scrolled"); } else { header.classList.remove("scrolled"); }
  };
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();

  var burger = document.getElementById("burger");
  var drawer = document.getElementById("drawer");
  var scrim  = document.getElementById("scrim");
  var closeBtn = document.getElementById("drawerClose");
  function openDrawer(){ drawer.classList.add("open"); scrim.classList.add("open"); drawer.setAttribute("aria-hidden","false"); burger.setAttribute("aria-expanded","true"); }
  function closeDrawer(){ drawer.classList.remove("open"); scrim.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); burger.setAttribute("aria-expanded","false"); }
  burger.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", closeDrawer); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeDrawer(); });

  var revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, {threshold:0.12, rootMargin:"0px 0px -8% 0px"});
    revealEls.forEach(function(el){ io.observe(el); });
  } else { revealEls.forEach(function(el){ el.classList.add("in"); }); }
})();
