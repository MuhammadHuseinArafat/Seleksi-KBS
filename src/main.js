import * as pdfjsLib from 'pdfjs-dist';
import pdfUrl from '../SOAL SELEKSI KBS (1).pdf?url';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import './style.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const questions = [
  {
    title: 'Mudik Klaten ke Banjarnegara',
    section: 'Abstraksi Berpikir Komputasional',
    segments: [{ page: 1, top: 68, bottom: 635 }],
  },
  {
    title: 'Jadwal Belajarku',
    section: 'Abstraksi Berpikir Komputasional',
    segments: [
      { page: 2, top: 60, bottom: 585 },
    ],
  },
  {
    title: 'Permainan Kata',
    section: 'Abstraksi Berpikir Komputasional',
    segments: [{ page: 3, top: 60, bottom: 340 }],
  },
  {
    title: 'Pertandingan Futsal Grup CNWK',
    section: 'Pemecahan Masalah Komputasional',
    segments: [{ page: 4, top: 95, bottom: 570 }],
  },
  {
    title: 'Permainan Kursi di dalam kelas',
    section: 'Pemecahan Masalah Komputasional',
    segments: [
      { page: 5, top: 60, bottom: 770 },
      { page: 6, top: 60, bottom: 180 },
    ],
  },
  {
    title: 'Perhitungan Program C++',
    section: 'Algoritmik Bahasa C++',
    segments: [{ page: 7, top: 140, bottom: 420 }],
  },
  {
    title: 'Nilai Akhir Variabel x',
    section: 'Algoritmik Bahasa C++',
    segments: [{ page: 7, top: 510, bottom: 750 }],
  },
  {
    title: 'Nilai Akhir Variabel y',
    section: 'Algoritmik Bahasa C++',
    segments: [{ page: 8, top: 110, bottom: 340 }],
  },
];

const app = document.querySelector('#app');
app.innerHTML = `
  <header class="topbar">
    <a class="brand" href="#top" aria-label="Seleksi KBS Informatika">
      <span class="brand-mark" aria-hidden="true">INF</span>
      <span class="brand-copy"><strong>Seleksi KBS Informatika</strong><small>LEMBAR SOAL</small></span>
    </a>
    <div class="topbar-tools">
      <div class="topbar-meta"><span class="live-dot"></span>Mode baca</div>
      <div class="exam-timer" id="exam-timer" aria-live="off" hidden>
        <span class="timer-label">SISA WAKTU</span>
        <strong id="timer-value">80:00</strong>
      </div>
      <div class="student-session" id="student-session" hidden>
        <span class="student-identity" id="student-identity"></span>
        <button class="logout-button" id="logout-button" type="button">Keluar</button>
      </div>
    </div>
  </header>
  <section class="login-screen" id="login-screen" aria-labelledby="login-title">
    <div class="login-panel">
      <div class="login-intro">
        <div class="login-mark" aria-hidden="true">INF</div>
        <p class="login-kicker">SELEKSI KBS INFORMATIKA</p>
        <h1 id="login-title">Selamat datang,<br /><span>peserta.</span></h1>
        <p class="login-description">Isi nama dan kelas sebelum membuka lembar soal.</p>
        <div class="login-edition"><span></span>LEMBAR SELEKSI KBS INFORMATIKA</div>
      </div>
      <form class="login-form" id="login-form">
        <p class="form-eyebrow">IDENTITAS PESERTA</p>
        <h2>Mulai dengan namamu</h2>
        <label class="field-label" for="student-name">Nama lengkap</label>
        <input id="student-name" name="name" type="text" autocomplete="name" maxlength="80" placeholder="Tulis nama lengkap" required />
        <label class="field-label" for="student-class">Kelas</label>
        <input id="student-class" name="class" type="text" autocomplete="off" maxlength="30" placeholder="Contoh: 6A" required />
        <button class="login-submit" type="submit"><span>Masuk ke soal</span><span aria-hidden="true">→</span></button>
        <p class="session-note">Identitas hanya tersimpan selama sesi browser ini.</p>
      </form>
    </div>
  </section>
  <section class="instructions-screen" id="instructions-screen" aria-labelledby="instructions-title" hidden>
    <div class="instructions-panel">
      <div class="instructions-heading">
        <p class="form-eyebrow">SEBELUM MEMULAI</p>
        <h1 id="instructions-title">Petunjuk pengerjaan soal</h1>
        <p class="instructions-subtitle">Baca petunjuk berikut dengan saksama.</p>
      </div>
      <ol class="instruction-list">
        <li><span class="instruction-number">01</span><p><strong>Seleksi KBS Informatika</strong> terdiri dari <strong>8 soal</strong> yang harus dikerjakan oleh peserta.</p></li>
        <li><span class="instruction-number">02</span><p><strong>Waktu pengerjaan</strong> yang diberikan adalah <strong>80 menit</strong>.</p></li>
        <li><span class="instruction-number">03</span><p><strong>Tuliskan jawaban pada kertas yang telah disediakan</strong> dan pastikan jawaban sesuai dengan instruksi pada masing-masing soal.</p></li>
        <li><span class="instruction-number">04</span><p>Jika terdapat pertanyaan atau mengalami kendala selama ujian, <strong>silakan sampaikan kepada guru pengawas</strong>.</p></li>
        <li class="instruction-important"><span class="instruction-number">05</span><p><strong>PENTING! Jangan lupa berdoa sebelum mengerjakan.</strong> Kerjakan dengan tenang, teliti, dan percaya diri. Semoga sukses!</p></li>
      </ol>
      <div class="instructions-footer">
        <p>Waktu mulai dihitung setelah tombol ini ditekan.</p>
        <button class="start-exam-button" id="start-exam-button" type="button"><span>Mulai pengerjaan</span><span aria-hidden="true">→</span></button>
      </div>
    </div>
  </section>
  <section class="time-over-screen" id="time-over-screen" aria-labelledby="time-over-title" hidden>
    <div class="time-over-mark" aria-hidden="true">80:00</div>
    <p class="form-eyebrow">SELEKSI KBS INFORMATIKA</p>
    <h1 id="time-over-title">Waktu pengerjaan selesai</h1>
    <p>Silakan serahkan kertas jawaban kepada guru pengawas.</p>
  </section>
  <div class="fullscreen-warning" id="fullscreen-warning" hidden>
  <div class="fullscreen-warning-box">
    <div class="warning-icon">⚠️</div>

    <h2>Kembali ke Mode Ujian</h2>

    <p>
      Anda telah keluar dari mode layar penuh.
      Silakan kembali ke mode ujian untuk melanjutkan pengerjaan.
    </p>

    <button id="return-fullscreen-button" type="button">
      Kembali ke Mode Ujian
    </button>
  </div>
</div>
  <main class="layout" id="exam-app" hidden>
    <aside class="question-nav" aria-label="Navigasi soal">
      <div class="nav-heading"><span>DAFTAR SOAL</span><span id="total-count"></span></div>
      <nav class="question-list" id="question-list"></nav>
      <div class="nav-foot"><span class="nav-foot-mark">KBS</span><span>Seleksi<br />Komputasional</span></div>
    </aside>
    <section class="reader" aria-label="Pembaca soal">
      <div class="reader-top">
        <div>
          <p class="eyebrow" id="section-label"></p>
          <h1 id="question-title"></h1>
        </div>
        <div class="counter" aria-live="polite"><strong id="current-number">01</strong><span>/</span><span id="total-counter"></span></div>
      </div>
      <div class="progress-track" aria-hidden="true"><span id="progress-fill"></span></div>
      <div class="paper-frame" id="paper-frame">
        <div class="paper-loading" id="paper-loading">Memuat soal…</div>
        <canvas class="paper-canvas" id="paper-canvas" aria-label="Isi soal"></canvas>
        <div class="paper-error" id="paper-error" role="alert" hidden></div>
      </div>
      <footer class="reader-controls">
        <button class="previous-button" id="previous-button" type="button" aria-label="Soal sebelumnya">
          <span aria-hidden="true">←</span><span>Sebelumnya</span>
        </button>
        <div class="step-indicator" id="step-indicator" aria-hidden="true"></div>
        <button class="next-button" id="next-button" type="button" aria-label="Soal berikutnya">
          <span>Berikutnya</span><span aria-hidden="true">→</span>
        </button>
      </footer>
    </section>
  </main>
`;

const listElement = document.querySelector('#question-list');
const indicatorElement = document.querySelector('#step-indicator');
const buttons = [];
const dots = [];
let activeQuestion = 0;
let pdfDocument;
let renderToken = 0;
let resizeTimer;
const renderedPages = new Map();
const canvas = document.querySelector('#paper-canvas');
const canvasContext = canvas.getContext('2d', { alpha: false });
const paperFrame = document.querySelector('#paper-frame');
const loadingElement = document.querySelector('#paper-loading');
const errorElement = document.querySelector('#paper-error');
const loginScreen = document.querySelector('#login-screen');
const loginForm = document.querySelector('#login-form');
const instructionsScreen = document.querySelector('#instructions-screen');
const startExamButton = document.querySelector('#start-exam-button');
const timeOverScreen = document.querySelector('#time-over-screen');
const examApp = document.querySelector('#exam-app');
const studentSession = document.querySelector('#student-session');
const studentIdentity = document.querySelector('#student-identity');
const logoutButton = document.querySelector('#logout-button');
const examTimer = document.querySelector('#exam-timer');
const timerValue = document.querySelector('#timer-value');
let pdfLoadingPromise;
let timerInterval;
const examDurationMs = 80 * 60 * 1000;

// ===============================
// EXAM LOCK MODE
// ===============================

let warningCount = 0;
const maxWarnings = 3;

// Masuk fullscreen
async function enterFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    console.warn('Fullscreen tidak tersedia:', error);
  }
}

// Deteksi keluar fullscreen
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && !examApp.hidden) {

    warningCount++;

    alert(
      `PERINGATAN!\n\n` +
      `Anda keluar dari mode ujian.\n\n` +
      `Silakan tekan tombol "Kembali ke Mode Ujian".\n\n` +
      `Peringatan: ${warningCount}/${maxWarnings}`
    );

    if (warningCount >= maxWarnings) {
      alert(
        'Batas pelanggaran tercapai.\n\n' +
        'Silakan hubungi guru pengawas.'
      );

      window.clearInterval(timerInterval);
      examApp.hidden = true;
      timeOverScreen.hidden = false;

      return;
    }

    // Tetap berada di soal, tetapi minta kembali fullscreen
    showFullscreenWarning();
  }
});

// Deteksi pindah tab / minimize browser
document.addEventListener('visibilitychange', () => {
  if (document.hidden && !examApp.hidden) {
    warningCount++;

    console.warn(
      `Peserta meninggalkan halaman ujian. Peringatan ${warningCount}/${maxWarnings}`
    );

    if (warningCount >= maxWarnings) {
      alert('Batas pelanggaran tercapai. Silakan hubungi guru pengawas.');

      window.clearInterval(timerInterval);
      examApp.hidden = true;
      timeOverScreen.hidden = false;
    }
  }
});

// Blokir klik kanan
document.addEventListener('contextmenu', (event) => {
  if (!examApp.hidden) {
    event.preventDefault();
  }
});

// Blokir shortcut tertentu selama ujian
document.addEventListener('keydown', (event) => {
  if (examApp.hidden) return;

  const blocked =
    event.key === 'F11' ||
    event.key === 'F12' ||
    (event.ctrlKey && ['u', 'U', 's', 'S', 'p', 'P'].includes(event.key));

  if (blocked) {
    event.preventDefault();
    event.stopPropagation();
  }
});

const fullscreenWarning = document.querySelector('#fullscreen-warning');
const returnFullscreenButton = document.querySelector('#return-fullscreen-button');

function showFullscreenWarning() {
  fullscreenWarning.hidden = false;
}

function hideFullscreenWarning() {
  fullscreenWarning.hidden = true;
}

returnFullscreenButton.addEventListener('click', async () => {
  await enterFullscreen();
  hideFullscreenWarning();
});

questions.forEach((question, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'question-link';
  button.setAttribute('aria-label', `Soal ${index + 1}: ${question.title}`);
  button.innerHTML = `<span class="question-link-number">${String(index + 1).padStart(2, '0')}</span><span class="question-link-title">${question.title}</span><span class="question-link-check" aria-hidden="true"></span>`;
  button.addEventListener('click', () => showQuestion(index));
  listElement.append(button);
  buttons.push(button);

  const dot = document.createElement('span');
  dot.className = 'step-dot';
  indicatorElement.append(dot);
  dots.push(dot);
});

function updateNavigation() {
  const question = questions[activeQuestion];
  const total = String(questions.length).padStart(2, '0');
  document.querySelector('#total-count').textContent = total;
  document.querySelector('#total-counter').textContent = total;
  document.querySelector('#section-label').textContent = question.section;
  document.querySelector('#question-title').textContent = question.title;
  document.querySelector('#current-number').textContent = String(activeQuestion + 1).padStart(2, '0');
  document.querySelector('#progress-fill').style.width = `${((activeQuestion + 1) / questions.length) * 100}%`;
  document.querySelector('#previous-button').disabled = activeQuestion === 0;
  document.querySelector('#next-button').innerHTML = activeQuestion === questions.length - 1
    ? '<span>Selesai</span><span aria-hidden="true">✓</span>'
    : '<span>Berikutnya</span><span aria-hidden="true">→</span>';
  document.querySelector('#next-button').setAttribute('aria-label', activeQuestion === questions.length - 1 ? 'Soal terakhir' : 'Soal berikutnya');

  buttons.forEach((button, index) => {
    button.classList.toggle('is-active', index === activeQuestion);
    button.classList.toggle('is-complete', index < activeQuestion);
    button.setAttribute('aria-current', index === activeQuestion ? 'step' : 'false');
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index === activeQuestion);
    dot.classList.toggle('is-complete', index < activeQuestion);
  });
}

async function getRenderedPage(pageNumber, cssWidth) {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const cacheKey = `${pageNumber}:${Math.round(cssWidth)}:${pixelRatio}`;
  if (renderedPages.has(cacheKey)) return renderedPages.get(cacheKey);

  const page = await pdfDocument.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = (cssWidth * pixelRatio) / baseViewport.width;
  const viewport = page.getViewport({ scale });
  const pageCanvas = document.createElement('canvas');
  pageCanvas.width = Math.ceil(viewport.width);
  pageCanvas.height = Math.ceil(viewport.height);
  const pageContext = pageCanvas.getContext('2d', { alpha: false });
  pageContext.fillStyle = '#ffffff';
  pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    await page.render({ canvas: pageCanvas, canvasContext: pageContext, viewport, intent: 'print' }).promise;

  const rendered = { canvas: pageCanvas, scale, pixelRatio, width: baseViewport.width, height: baseViewport.height };
  renderedPages.set(cacheKey, rendered);
  return rendered;
}

async function renderQuestion(index) {
  if (!pdfDocument) return;
  const token = ++renderToken;
  loadingElement.hidden = false;
  canvas.hidden = true;
  errorElement.hidden = true;
  const question = questions[index];
  const cssWidth = Math.max(280, Math.min(paperFrame.clientWidth, 900));
  const renderedSegments = await Promise.all(question.segments.map(async (segment) => ({
    segment,
    page: await getRenderedPage(segment.page, cssWidth),
  })));
  if (token !== renderToken) return;

  const pixelRatio = renderedSegments[0].page.pixelRatio;
  const outputWidth = renderedSegments[0].page.canvas.width;
  const segmentHeights = renderedSegments.map(({ segment, page }) => {
    const top = Math.round(segment.top / page.height * page.canvas.height);
    const bottom = Math.round(segment.bottom / page.height * page.canvas.height);
    return Math.max(1, bottom - top);
  });
  const outputHeight = segmentHeights.reduce((sum, height) => sum + height, 0);

  canvas.width = outputWidth;
  canvas.height = outputHeight;
  canvas.style.width = `${outputWidth / pixelRatio}px`;
  canvas.style.height = `${outputHeight / pixelRatio}px`;
  canvasContext.fillStyle = '#ffffff';
  canvasContext.fillRect(0, 0, outputWidth, outputHeight);

  let destinationY = 0;
  renderedSegments.forEach(({ segment, page }, index) => {
    const sourceTop = Math.round(segment.top / page.height * page.canvas.height);
    const sourceBottom = Math.round(segment.bottom / page.height * page.canvas.height);
    const sourceHeight = sourceBottom - sourceTop;
    canvasContext.drawImage(page.canvas, 0, sourceTop, page.canvas.width, sourceHeight, 0, destinationY, outputWidth, sourceHeight);
    destinationY += segmentHeights[index];
  });

  loadingElement.hidden = true;
  canvas.hidden = false;
}

function showQuestion(index) {
  if (index < 0 || index >= questions.length || index === activeQuestion) return;
  activeQuestion = index;
  updateNavigation();
  paperFrame.scrollIntoView({ behavior: 'smooth', block: 'start' });
  renderQuestion(index).catch(showError);
}

function showError(error) {
  loadingElement.hidden = true;
  canvas.hidden = true;
  errorElement.hidden = false;
  errorElement.textContent = 'Soal belum dapat dimuat. Periksa koneksi lokal ke file PDF lalu muat ulang halaman.';
  console.error(error);
}

document.querySelector('#previous-button').addEventListener('click', () => showQuestion(activeQuestion - 1));
document.querySelector('#next-button').addEventListener('click', () => {
  if (activeQuestion < questions.length - 1) showQuestion(activeQuestion + 1);
});
document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLButtonElement) return;
  if (event.key === 'ArrowLeft') showQuestion(activeQuestion - 1);
  if (event.key === 'ArrowRight') showQuestion(activeQuestion + 1);
});

updateNavigation();

function showInstructions(student) {
  studentIdentity.textContent = `${student.name} · ${student.className}`;
  studentSession.hidden = false;
  loginScreen.hidden = true;
  instructionsScreen.hidden = false;
  examApp.hidden = true;
  timeOverScreen.hidden = true;
  examTimer.hidden = true;
}

function enterExam() {
  instructionsScreen.hidden = true;
  timeOverScreen.hidden = true;
  examApp.hidden = false;
  examTimer.hidden = false;

  // Aktifkan fullscreen
  enterFullscreen();

  updateTimer();
  timerInterval ??= window.setInterval(updateTimer, 1000);

  if (!pdfDocument) {
    pdfLoadingPromise ??= pdfjsLib.getDocument(pdfUrl).promise
      .then((document) => {
        pdfDocument = document;
        return renderQuestion(activeQuestion);
      })
      .catch((error) => {
        pdfLoadingPromise = undefined;
        showError(error);
      });

    return;
  }

  renderQuestion(activeQuestion).catch(showError);
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const student = {
    name: String(formData.get('name') || '').trim(),
    className: String(formData.get('class') || '').trim(),
  };
  if (!student.name || !student.className) return;

  sessionStorage.setItem('seleksi-kbs-student', JSON.stringify(student));
  sessionStorage.removeItem('seleksi-kbs-deadline');
  showInstructions(student);
});

function updateTimer() {
  const deadline = Number(sessionStorage.getItem('seleksi-kbs-deadline'));
  if (!Number.isFinite(deadline) || deadline <= 0) return;

  const remainingMs = Math.max(0, deadline - Date.now());
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerValue.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  examTimer.classList.toggle('is-urgent', remainingSeconds <= 5 * 60);

  if (remainingMs === 0) {
    window.clearInterval(timerInterval);
    timerInterval = undefined;
    examApp.hidden = true;
    timeOverScreen.hidden = false;
  }
}

startExamButton.addEventListener('click', () => {
  sessionStorage.setItem('seleksi-kbs-deadline', String(Date.now() + examDurationMs));
  enterExam();
});

logoutButton.addEventListener('click', () => {
  sessionStorage.removeItem('seleksi-kbs-student');
  sessionStorage.removeItem('seleksi-kbs-deadline');
  window.clearInterval(timerInterval);
  timerInterval = undefined;
  studentSession.hidden = true;
  examTimer.hidden = true;
  examApp.hidden = true;
  instructionsScreen.hidden = true;
  timeOverScreen.hidden = true;
  loginForm.reset();
  activeQuestion = 0;
  updateNavigation();
  loginScreen.hidden = false;
  document.querySelector('#student-name').focus();
});

try {
  const savedStudent = JSON.parse(sessionStorage.getItem('seleksi-kbs-student') || 'null');
  if (savedStudent?.name && savedStudent?.className) {
    const deadline = Number(sessionStorage.getItem('seleksi-kbs-deadline'));
    if (Number.isFinite(deadline) && deadline > 0) {
      studentIdentity.textContent = `${savedStudent.name} · ${savedStudent.className}`;
      studentSession.hidden = false;
      loginScreen.hidden = true;
      if (deadline <= Date.now()) {
        examTimer.hidden = false;
        timerValue.textContent = '00:00';
        examTimer.classList.add('is-urgent');
        timeOverScreen.hidden = false;
      } else {
        enterExam();
      }
    } else {
      showInstructions(savedStudent);
    }
  }
} catch {
  sessionStorage.removeItem('seleksi-kbs-student');
  sessionStorage.removeItem('seleksi-kbs-deadline');
}

new ResizeObserver(() => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    renderedPages.clear();
    renderQuestion(activeQuestion).catch(showError);
  }, 120);
}).observe(paperFrame);