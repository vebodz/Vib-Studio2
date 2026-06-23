// Simple interactive behaviors: year, fake server status check, form handler
document.addEventListener('DOMContentLoaded', function(){
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // server status simulation (replace with real API if available)
  const statusEl = document.getElementById('serverStatus');
  function checkServer(){
    // For demo: randomly online/offline. Replace with fetch(...) to your server API.
    const online = Math.random() > 0.25;
    if(online){
      statusEl.textContent = 'متصل (Online)';
      statusEl.classList.remove('offline');
      statusEl.classList.add('online');
    } else {
      statusEl.textContent = 'غير متصل (Offline)';
      statusEl.classList.remove('online');
      statusEl.classList.add('offline');
    }
    document.getElementById('statusNote').textContent = 'آخر تحديث: ' + new Date().toLocaleTimeString();
  }
  checkServer();
  setInterval(checkServer, 15000);

  // join button behavior
  const joinBtn = document.getElementById('ctaJoin');
  joinBtn.addEventListener('click', function(e){
    e.preventDefault();
    // يمكنك وضع رابط دعوة السيرفر هنا
    const inviteUrl = prompt('ضع رابط الدعوة الخاص بسيرفرك (Discord/غيره) أو انسخه هنا:');
    if(inviteUrl){
      window.open(inviteUrl,'_blank');
    }
  });

  // contact form basic alert (بدون backend)
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    alert('شكراً! نموذج الاتصال مرسل (هذه نسخة تجريبية — اربطه بخادم لإرسال فعلي).');
    contactForm.reset();
  });
});
