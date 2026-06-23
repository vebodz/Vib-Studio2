// تهيئة واجهة تفاعلية: سنة، حالة سيرفر، محاكاة Terminal typing، نسخ كود، تشغيل مثال في الكونسول
document.addEventListener('DOMContentLoaded', function(){
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Server status simulation (replace with your real API)
  const statusEl = document.getElementById('serverStatus');
  const statusNote = document.getElementById('statusNote');
  function checkServer(){
    // demo: toggle online with higher chance online
    const online = Math.random() > 0.18;
    if(online){
      statusEl.textContent = 'متصل (Online)';
      statusEl.classList.remove('offline');
      statusEl.classList.add('online');
    } else {
      statusEl.textContent = 'غير متصل (Offline)';
      statusEl.classList.remove('online');
      statusEl.classList.add('offline');
    }
    statusNote.textContent = 'آخر تحديث: ' + new Date().toLocaleTimeString();
  }
  checkServer();
  setInterval(checkServer, 20000);

  // Terminal typing effect
  const lines = [
    'vib@studio:~$ git clone https://github.com/vib/starter.git',
    'vib@studio:~$ cd starter && npm i',
    'vib@studio:~$ npm run dev',
    '> Vib Studio running on http://localhost:3000',
    'vib@studio:~$ echo "مرحباً بك في Vib Studio"'
  ];
  const termBody = document.getElementById('termBody');
  const cursor = document.getElementById('termCursor');

  let li = 0, ch = 0;
  function typeLoop(){
    if(li >= lines.length){ // loop after short pause
      setTimeout(()=>{ termBody.innerHTML=''; li=0; ch=0; typeLoop(); }, 1600);
      return;
    }
    const current = lines[li];
    if(ch <= current.length){
      termBody.textContent = current.slice(0, ch) + (ch % 2 ? '' : ''); // no extra cursor inside
      ch++;
      setTimeout(typeLoop, 40 + Math.random()*30);
    } else {
      // newline
      const br = document.createElement('div');
      br.textContent = current;
      termBody.appendChild(br);
      termBody.scrollTop = termBody.scrollHeight;
      li++; ch=0;
      setTimeout(typeLoop, 600);
    }
  }
  typeLoop();

  // Join button
  document.getElementById('ctaJoin').addEventListener('click', function(e){
    e.preventDefault();
    const invite = localStorage.getItem('vib_invite') || '';
    if(invite){
      window.open(invite,'_blank');
    } else {
      const url = prompt('ضع رابط الدعوة الخاص بسيرفرك (Discord أو غيره):');
      if(url){ localStorage.setItem('vib_invite', url); window.open(url,'_blank'); }
    }
  });
  document.getElementById('joinBtn').addEventListener('click', ()=>document.getElementById('ctaJoin').click());
  document.getElementById('saveInvite').addEventListener('click', function(e){
    e.preventDefault();
    const url = prompt('ضع رابط الدعوة لحفظه هنا:');
    if(url){ localStorage.setItem('vib_invite', url); alert('تم حفظ رابط الدعوة'); }
  });

  // code copy
  document.getElementById('copyCode').addEventListener('click', function(){
    const code = document.getElementById('codeSample').innerText;
    navigator.clipboard.writeText(code).then(()=>{ alert('تم نسخ الكود'); }).catch(()=>{ alert('فشل النسخ — استخدم المتصفح الحديث'); });
  });

  // run demo
  document.getElementById('runDemo').addEventListener('click', function(){
    try{
      // eval only the sample's console log (safe-limited for demo)
      // We don't eval full content; just show sample message in console
      console.log('Running demo: افتح Console لتشاهد النتيجة — هذا محاكٍ آمن.');
      alert('تم تشغيل المحاكاة — افتح Console المتصفح لرؤية النتيجة.');
    }catch(e){
      console.error(e);
      alert('خطأ أثناء التشغيل.');
    }
  });

  // highlight.js init
  if(window.hljs) hljs.highlightAll();

  // simple menu toggle for mobile
  const menuToggle = document.getElementById('menuToggle');
  menuToggle && menuToggle.addEventListener('click', function(){
    const nav = document.querySelector('.nav-list');
    if(nav.style.display === 'flex'){ nav.style.display = 'none'; }
    else { nav.style.display = 'flex'; nav.style.flexDirection = 'column'; nav.style.gap='10px'; }
  });

  // theme toggle (simple accent inversion)
  document.getElementById('themeToggle').addEventListener('click', function(){
    document.documentElement.classList.toggle('alt-theme');
    // optional: persist choice
    localStorage.setItem('vib_theme_alt', document.documentElement.classList.contains('alt-theme') ? '1' : '0');
  });
  // restore theme
  if(localStorage.getItem('vib_theme_alt') === '1') document.documentElement.classList.add('alt-theme');
});
