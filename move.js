// 옛 주소(kkiimmiinn.github.io/pyeongeo) → 새 주소(kimman.kr/pyeongeo)
// 이 브라우저에 옛 주소에서 입력한 학급이 있으면 바로 넘기지 않고, 새 주소의 [백업 불러오기]로 옮길 백업 파일부터 받게 한다.
(function () {
  var NEW = 'https://kimman.kr/pyeongeo', classes = {};
  try { var S = JSON.parse(localStorage.getItem('sgm-v4') || '{}'); if (S && S.classes && typeof S.classes === 'object') classes = S.classes; } catch (e) { /* 저장소 없음 */ }
  var used = {};
  Object.keys(classes).forEach(function (k) { var c = classes[k]; if (c && Array.isArray(c.entries) && c.entries.length) used[k] = c; });
  var n = Object.keys(used).length;
  if (!n) { location.replace(NEW); return; }
  document.getElementById('moving').hidden = true;
  document.getElementById('rescue').hidden = false;
  document.getElementById('n').textContent = n;
  document.getElementById('save').addEventListener('click', function () {
    // 새 주소의 [백업 저장]과 같은 형식(학생 이름 없음: 번호·단계·성취기준만)
    var d = new Date(), a = document.createElement('a'), p = function (x) { return String(x).padStart(2, '0'); };
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ app: 'sgm', v: 5, classes: used }, null, 1)], { type: 'application/json' }));
    a.download = '학기말종합의견_백업_' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
})();
