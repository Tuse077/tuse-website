/* TUȘE — interior pages: mobile menu only. */
(function(){
  var burger = document.getElementById('burger');
  var mnav = document.getElementById('mnav');
  if(!burger || !mnav) return;

  function setOpen(open){
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mnav.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
  }

  burger.addEventListener('click', function(){
    setOpen(burger.getAttribute('aria-expanded') !== 'true');
  });

  mnav.addEventListener('click', function(e){
    if(e.target.closest('a')) setOpen(false);
  });

  addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mnav.classList.contains('is-open')) setOpen(false);
  });
})();
