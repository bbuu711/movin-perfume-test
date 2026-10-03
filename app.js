/* ==========================================================================
   MOVIN (모빈) - 분위기를 디자인하다 TYPE TEST SCRIPT
   Flow: Cover -> Brand Intro -> Questions -> Loading -> Result -> Supabase & Modal
   ========================================================================== */

// SUPABASE CONFIGURATION
const SUPABASE_URL = 'https://jalyhmwzwxpsemswodro.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbHlobXd6d3hwc2Vtc3dvZHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NzA4MDQsImV4cCI6MjEwNjU0NjgwNH0.2jvNs9oYqbOYIhbp6Km3VTnOgFO54vhaDaALs4Mg8N8';
let supabaseClient = null;

if (window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn('Supabase initialization warning:', err);
  }
}

// Question Data (5 Total)
const QUESTIONS = [
  {
    id: 'Q1',
    badge: 'Question 1',
    title: '당신의 하루에서 향이 가장 필요할 것 같은 순간은?',
    subtitle: '모빈의 멀티퍼퓸은 시간대별로 가장 어울리는 향을 제안합니다.',
    options: [
      { code: 'A', label: '하루를 시작할 때 🌅', val: 'Q1_A' },
      { code: 'B', label: '사람을 만날 때 🤝', val: 'Q1_B' },
      { code: 'C', label: '혼자 여유를 즐길 때 ☕', val: 'Q1_C' },
      { code: 'D', label: '특별한 일이 있는 날 ✨', val: 'Q1_D' }
    ]
  },
  {
    id: 'Q2',
    badge: 'Question 2',
    title: '나에게 가장 가까운 주말은?',
    subtitle: '주말에 전해지는 당신만의 휴식 방식을 선택해 주세요.',
    options: [
      { code: 'A', label: '좋아하는 카페에서 혼자 여유롭게 🍰', val: 'Q2_A' },
      { code: 'B', label: '친구들과 만나서 신나게 🎉', val: 'Q2_B' },
      { code: 'C', label: '새로운 곳에 가거나 데이트하며 🌿', val: 'Q2_C' },
      { code: 'D', label: '집에서 푹 쉬면서 🛋️', val: 'Q2_D' }
    ]
  },
  {
    id: 'Q2_1',
    badge: 'Question 2-1',
    title: '그런데 평일의 나는?',
    subtitle: '평일을 채우는 당신의 주된 생활 공간과 이동 형태입니다.',
    options: [
      { code: 'A', label: '학교에서 시간을 많이 보내요 📚', val: 'Q2_1_A' },
      { code: 'B', label: '직장이나 알바를 해요 💼', val: 'Q2_1_B' },
      { code: 'C', label: '이동하는 시간이 많아요 🚶‍♂️', val: 'Q2_1_C' },
      { code: 'D', label: '대부분 집에서 보내요 🏡', val: 'Q2_1_D' }
    ]
  },
  {
    id: 'Q3',
    badge: 'Question 3',
    title: '사람들이 나를 어떻게 기억했으면 좋겠나요?',
    subtitle: '당신의 걸음 끝에 은은하게 남았으면 하는 잔향의 첫인상입니다.',
    options: [
      { code: 'A', label: '설렘지수 200% 썸남/썸녀 다 넘어오는 향 💕', val: 'Q3_A' },
      { code: 'B', label: '취업에 성공한 커리어맨/커리어우먼 👔', val: 'Q3_B' },
      { code: 'C', label: '발랄하고 mbti E같은 모습으로 비춰질 수 있는 향 ⚡', val: 'Q3_C' },
      { code: 'D', label: '영앤리치 처럼 보이는 향 💎', val: 'Q3_D' }
    ]
  },
  {
    id: 'Q4',
    badge: 'Question 4',
    title: '좋아하는 공간은?',
    subtitle: '당신의 마음이 가장 편안해지고 감성이 살아나는 장소입니다.',
    options: [
      { code: 'A', label: '호텔 🏨', val: 'Q4_A' },
      { code: 'B', label: '정원 🪴', val: 'Q4_B' },
      { code: 'C', label: '바 🍸', val: 'Q4_C' },
      { code: 'D', label: '서점 📖', val: 'Q4_D' }
    ]
  }
];

// Perfume Database mapped to Q1
const PERFUMES = {
  'Q1_A': {
    nameKr: '그린 베르가못',
    nameEn: 'GREEN BERGAMOT',
    img: 'images/green_bergamot.jpg',
    hashtags: ['#베르가못 🍋', '#만다린 🍊', '#풀향 🌿', '#흙향 🌱'],
    momentLabel: '하루를 시작하는 매력적인 아침 🌅',
    desc: '맑은 아침 이슬을 머금은 싱그러운 베르가못과 만다린의 상큼함이 지친 일상에 깊은 피톤치드 생기를 더해줍니다. 은은한 흙향과 잎향이 조화롭게 스며들어, 마치 숲속의 맑은 공기를 마시는 듯 인공적이지 않고 자연스러운 활력을 선사합니다.'
  },
  'Q1_B': {
    nameKr: '플라워 뮤게',
    nameEn: 'FLOWER MUGUET',
    img: 'images/flower_muguet.jpg',
    hashtags: ['#은방울꽃 🌸', '#자몽 🍊', '#화이트플로럴 🤍'],
    momentLabel: '사람들과 다정하게 조화되는 순간 🤝',
    desc: '하얀 은방울꽃의 순수한 단아함과 갓 짠 자몽의 톡 쏘는 노트가 화사하게 어우러진 프레시 플로럴 멀티퍼퓸입니다. 억지스럽지 않고 은은하게 피어나는 꽃향기가 다가오는 상대방에게 기분 좋은 설렘과 기억하고 싶은 인상을 안겨줍니다.'
  },
  'Q1_C': {
    nameKr: '베리 머스크',
    nameEn: 'BERRY MUSK',
    img: 'images/berry_musk.jpg',
    hashtags: ['#블랙베리 🫐', '#머스크 ☁️', '#잎향 🌿'],
    momentLabel: '혼자만의 온전한 여유와 휴식 ☕',
    desc: '탐스럽게 익은 블랙베리의 달콤 쌉싸름한 즙향과 나를 포근하게 감싸안는 소프트 머스크, 푸른 잎향이 겹겹이 레이어드된 오가닉 노벨리티 향입니다. 바쁜 일상에서 벗어나 혼자만의 조용하고 온전한 공간을 깊은 평온으로 채워줍니다.'
  },
  'Q1_D': {
    nameKr: '스모크 로즈',
    nameEn: 'SMOKE ROSE',
    img: 'images/smoke_rose.jpg',
    hashtags: ['#스모크우드 🪵', '#장미 🌹'],
    momentLabel: '특별한 아우라가 피어나는 날 ✨',
    desc: '그윽하게 타오르는 스모크 우드의 묵직한 잔향과 고혹적인 우아함의 딥 장미가 연출하는 감각적인 멀티퍼퓸입니다. 강렬하지만 과하지 않은 고급스러운 잔향이 당신이 지나가는 모든 자리를 한 편의 영화처럼 클래식하게 바꿉니다.'
  }
};

// Space Mood database mapped to Q4
const SPACE_MOODS = {
  'Q4_A': {
    name: '호텔 (Hotel)',
    vibe: '정갈하고 아늑한 스위트룸 무드 🏨',
    tip: '호텔의 고급스럽고 폭신한 패브릭처럼, 침구류나 드레스룸 커튼 주변에 2~3회 살짝 분사해 주세요. 공간 전체가 격조 높은 호텔식 안락함으로 디자인됩니다.'
  },
  'Q4_B': {
    name: '정원 (Garden)',
    vibe: '햇살과 바람이 스치는 맑은 정원 무드 🪴',
    tip: '햇살이 따스하게 들어오는 창가 베란다나 식물이 모여있는 거실 공간 공중에 살짝 노즐을 눌러주세요. 바람이 스칠 때마다 싱그러운 대자연의 미소가 맴돕니다.'
  },
  'Q4_C': {
    name: '바 (Bar)',
    vibe: '감각적 조명 아래 깊어지는 라운지 무드 🍸',
    tip: '외출 전 아우터 하단이나 자주 머무는 소파 쿠션 패브릭에 살짝 터치해 주세요. 은은하고 매혹적인 아우라가 당신의 동선을 따라 감각적으로 퍼져나갑니다.'
  },
  'Q4_D': {
    name: '서점 (Bookstore)',
    vibe: '종이 향과 조용한 차분함이 머무는 서재 무드 📖',
    tip: '책상 위 나무 트레이나 원목 서가 근처 공간에 향을 매칭해 주세요. 마음에 집중할 수 있는 편안함과 조용한 휴식을 선사하는 나만의 몰입 분위기가 완성됩니다.'
  }
};

// Lifestyle Mappings
const LIFESTYLE_MAP = {
  'Q2_A': '카페 혼자여유',
  'Q2_B': '친목 활력파',
  'Q2_C': '탐방 데이트파',
  'Q2_D': '집콕 힐링파',
  
  'Q2_1_A': '캠퍼스 학생',
  'Q2_1_B': '직장인/알바',
  'Q2_1_C': '이동/액티브',
  'Q2_1_D': '홈라이프'
};

const DESIRE_IMAGE_MAP = {
  'Q3_A': '설렘 200% 로맨틱 썸 분위기',
  'Q3_B': '당당하고 스마트한 커리어 아우라',
  'Q3_C': '발랄하고 친근한 비타민 E 타입',
  'Q3_D': '세련되고 유니크한 영앤리치 무드'
};

// App State
let currentStepIndex = 0;
let userAnswers = {};
let loadingInterval = null;

// DOM Elements
const stepCover = document.getElementById('step-cover');
const stepBrandIntro = document.getElementById('step-brand-intro');
const stepQuestion = document.getElementById('step-question');
const stepLoading = document.getElementById('step-loading');
const stepResult = document.getElementById('step-result');
const experienceModal = document.getElementById('experience-modal');

const questionBoxAnim = document.getElementById('question-box-anim');
const qSubBadge = document.getElementById('q-sub-badge');
const qTitle = document.getElementById('q-title');
const qSubtitle = document.getElementById('q-subtitle');
const answerList = document.getElementById('answer-list');
const questionStepNum = document.getElementById('question-step-num');
const questionStepPercent = document.getElementById('question-step-percent');
const progressBarFill = document.getElementById('progress-bar-fill');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnNextLabel = document.getElementById('btn-next-label');
const loadingTitle = document.getElementById('loading-title');

// Flow Navigation
function goToBrandIntro() {
  showStep('brand-intro');
}

function startQuestions() {
  currentStepIndex = 0;
  userAnswers = {};
  showStep('question');
  renderQuestion(true);
}

// Render Question
function renderQuestion(animate = false) {
  const qData = QUESTIONS[currentStepIndex];
  const total = QUESTIONS.length;
  const currentNum = currentStepIndex + 1;
  const percent = Math.round((currentNum / total) * 100);

  // Update Header Progress
  questionStepNum.textContent = `Q${currentNum} / ${total}`;
  questionStepPercent.textContent = `${percent}%`;
  progressBarFill.style.width = `${percent}%`;

  if (animate && questionBoxAnim) {
    questionBoxAnim.classList.remove('slide-in', 'slide-out');
    void questionBoxAnim.offsetWidth; // trigger reflow
    questionBoxAnim.classList.add('slide-in');
  }

  // Update Question Content
  qSubBadge.textContent = qData.badge;
  qTitle.textContent = qData.title;
  qSubtitle.textContent = qData.subtitle;

  // Render Options
  answerList.innerHTML = '';
  qData.options.forEach(opt => {
    const card = document.createElement('div');
    card.className = 'option-card';
    if (userAnswers[qData.id] === opt.val) {
      card.classList.add('selected');
    }

    card.innerHTML = `
      <div class="opt-text-wrap">
        <span class="opt-code">${opt.code}</span>
        <span class="opt-label">${opt.label}</span>
      </div>
      <span class="opt-check">✅</span>
    `;

    card.onclick = () => selectOption(qData.id, opt.val);
    answerList.appendChild(card);
  });

  // Manage Next Button state
  const hasSelected = !!userAnswers[qData.id];
  if (hasSelected) {
    btnNext.classList.remove('disabled');
    btnNext.disabled = false;
  } else {
    btnNext.classList.add('disabled');
    btnNext.disabled = true;
  }

  // Next Button Label
  if (currentStepIndex === total - 1) {
    btnNextLabel.textContent = '결과 확인하기';
  } else {
    btnNextLabel.textContent = '다음 질문';
  }

  // Prev Button visibility
  if (currentStepIndex > 0) {
    btnPrev.classList.remove('hidden');
  } else {
    btnPrev.classList.add('hidden');
  }
}

// Select Option (Highlight & Enable Next Button)
function selectOption(qId, val) {
  userAnswers[qId] = val;
  renderQuestion(false);
}

// Next Question Click
function nextQuestion() {
  const qData = QUESTIONS[currentStepIndex];
  if (!userAnswers[qData.id]) return; // Guard if not selected

  if (currentStepIndex < QUESTIONS.length - 1) {
    questionBoxAnim.classList.add('slide-out');
    setTimeout(() => {
      currentStepIndex++;
      renderQuestion(true);
    }, 200);
  } else {
    finishQuiz();
  }
}

// Previous Question Click
function prevQuestion() {
  if (currentStepIndex > 0) {
    questionBoxAnim.classList.add('slide-out');
    setTimeout(() => {
      currentStepIndex--;
      renderQuestion(true);
    }, 200);
  }
}

// Finish Quiz & Show Loading (Alternating Text) -> Result
function finishQuiz() {
  showStep('loading');

  // Alternating Loading Text Logic
  const loadingTexts = [
    '당신의 향을 디자인하는 중...',
    '나의 분위기를 찾는 중...'
  ];
  let textIndex = 0;
  if (loadingTitle) {
    loadingTitle.textContent = loadingTexts[0];
  }

  if (loadingInterval) clearInterval(loadingInterval);
  loadingInterval = setInterval(() => {
    textIndex = (textIndex + 1) % loadingTexts.length;
    if (loadingTitle) {
      loadingTitle.style.opacity = 0;
      setTimeout(() => {
        loadingTitle.textContent = loadingTexts[textIndex];
        loadingTitle.style.opacity = 1;
      }, 150);
    }
  }, 900);

  setTimeout(() => {
    if (loadingInterval) clearInterval(loadingInterval);
    calculateAndShowResult();
    showStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 2200);
}

// Weighted Points Mapping per Option Value (5 Questions total)
const PERFUME_KEYS = {
  'GREEN': { key: 'Q1_A', nameKr: '그린 베르가못' },
  'MUGUET': { key: 'Q1_B', nameKr: '플라워 뮤게' },
  'BERRY': { key: 'Q1_C', nameKr: '베리 머스크' },
  'ROSE': { key: 'Q1_D', nameKr: '스모크 로즈' }
};

const OPTION_SCORES = {
  // Q1: 향이 필요한 순간 (3점)
  'Q1_A': { GREEN: 3, MUGUET: 0, BERRY: 1, ROSE: 0 },
  'Q1_B': { GREEN: 0, MUGUET: 3, BERRY: 0, ROSE: 1 },
  'Q1_C': { GREEN: 1, MUGUET: 0, BERRY: 3, ROSE: 0 },
  'Q1_D': { GREEN: 0, MUGUET: 1, BERRY: 0, ROSE: 3 },

  // Q2: 나에게 가까운 주말 (2점)
  'Q2_A': { GREEN: 1, MUGUET: 0, BERRY: 2, ROSE: 0 },
  'Q2_B': { GREEN: 1, MUGUET: 2, BERRY: 0, ROSE: 0 },
  'Q2_C': { GREEN: 0, MUGUET: 1, BERRY: 0, ROSE: 2 },
  'Q2_D': { GREEN: 0, MUGUET: 0, BERRY: 2, ROSE: 1 },

  // Q2_1: 평일의 나 (2점)
  'Q2_1_A': { GREEN: 2, MUGUET: 1, BERRY: 0, ROSE: 0 },
  'Q2_1_B': { GREEN: 0, MUGUET: 0, BERRY: 1, ROSE: 2 },
  'Q2_1_C': { GREEN: 2, MUGUET: 0, BERRY: 0, ROSE: 1 },
  'Q2_1_D': { GREEN: 0, MUGUET: 1, BERRY: 2, ROSE: 0 },

  // Q3: 기억되고 싶은 이미지 (3점)
  'Q3_A': { GREEN: 0, MUGUET: 3, BERRY: 1, ROSE: 0 },
  'Q3_B': { GREEN: 2, MUGUET: 0, BERRY: 0, ROSE: 2 },
  'Q3_C': { GREEN: 1, MUGUET: 3, BERRY: 0, ROSE: 0 },
  'Q3_D': { GREEN: 0, MUGUET: 0, BERRY: 1, ROSE: 3 },

  // Q4: 좋아하는 공간 (2점)
  'Q4_A': { GREEN: 0, MUGUET: 1, BERRY: 1, ROSE: 2 },
  'Q4_B': { GREEN: 3, MUGUET: 1, BERRY: 0, ROSE: 0 },
  'Q4_C': { GREEN: 0, MUGUET: 0, BERRY: 0, ROSE: 3 },
  'Q4_D': { GREEN: 1, MUGUET: 0, BERRY: 3, ROSE: 0 }
};

function calculatePerfumeScores() {
  const scores = { GREEN: 0, MUGUET: 0, BERRY: 0, ROSE: 0 };

  Object.values(userAnswers).forEach(val => {
    if (OPTION_SCORES[val]) {
      scores.GREEN += OPTION_SCORES[val].GREEN;
      scores.MUGUET += OPTION_SCORES[val].MUGUET;
      scores.BERRY += OPTION_SCORES[val].BERRY;
      scores.ROSE += OPTION_SCORES[val].ROSE;
    }
  });

  // Tie breaker bonus based on Q1
  const q1Val = userAnswers['Q1'];
  if (q1Val === 'Q1_A') scores.GREEN += 0.1;
  else if (q1Val === 'Q1_B') scores.MUGUET += 0.1;
  else if (q1Val === 'Q1_C') scores.BERRY += 0.1;
  else if (q1Val === 'Q1_D') scores.ROSE += 0.1;

  // Determine highest scoring perfume
  let winningKey = 'GREEN';
  let maxScore = -1;
  Object.keys(scores).forEach(key => {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      winningKey = key;
    }
  });

  return { scores, winnerPerfumeKey: PERFUME_KEYS[winningKey].key, winningType: winningKey };
}

// Calculate & Populate Result Ticket
function calculateAndShowResult() {
  const { scores, winnerPerfumeKey, winningType } = calculatePerfumeScores();

  const q4Val = userAnswers['Q4'] || 'Q4_B';
  const q2Val = userAnswers['Q2'] || 'Q2_A';
  const q2_1Val = userAnswers['Q2_1'] || 'Q2_1_B';
  const q3Val = userAnswers['Q3'] || 'Q3_A';

  const perfume = PERFUMES[winnerPerfumeKey] || PERFUMES['Q1_A'];
  const space = SPACE_MOODS[q4Val] || SPACE_MOODS['Q4_B'];

  // 1. Set Image & Titles
  document.getElementById('res-perfume-img').src = perfume.img;
  document.getElementById('res-perfume-img').alt = perfume.nameKr;
  document.getElementById('res-perfume-name').textContent = perfume.nameKr;
  document.getElementById('res-perfume-name-en').textContent = perfume.nameEn;

  // 2. Set Hashtags
  const hashtagsContainer = document.getElementById('res-hashtags');
  hashtagsContainer.innerHTML = '';
  perfume.hashtags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'ingredient-pill';
    span.textContent = tag;
    hashtagsContainer.appendChild(span);
  });

  // 3. Set Scent & Mood Description
  document.getElementById('res-scent-desc').textContent = perfume.desc;

  // 4. Set Receipt Breakdown Specs
  document.getElementById('res-moment').textContent = perfume.momentLabel;
  document.getElementById('res-space').textContent = space.name;
  document.getElementById('res-space-vibe').textContent = space.vibe;
  
  const lifestyleText = `${LIFESTYLE_MAP[q2Val]} x ${LIFESTYLE_MAP[q2_1Val]}`;
  document.getElementById('res-lifestyle').textContent = lifestyleText;

  document.getElementById('res-desire-image').textContent = DESIRE_IMAGE_MAP[q3Val];

  // 5. Render Score Breakdown Bars
  const scoreBarsList = document.getElementById('score-bars-list');
  if (scoreBarsList) {
    scoreBarsList.innerHTML = '';
    const scoreItems = [
      { name: '그린 베르가못', pts: Math.floor(scores.GREEN), key: 'GREEN' },
      { name: '플라워 뮤게', pts: Math.floor(scores.MUGUET), key: 'MUGUET' },
      { name: '베리 머스크', pts: Math.floor(scores.BERRY), key: 'BERRY' },
      { name: '스모크 로즈', pts: Math.floor(scores.ROSE), key: 'ROSE' }
    ];

    const maxPtsInRun = Math.max(...scoreItems.map(i => i.pts), 1);

    scoreItems.forEach(item => {
      const isWinner = item.key === winningType;
      const pct = Math.round((item.pts / maxPtsInRun) * 100);
      
      const row = document.createElement('div');
      row.className = `score-item-row ${isWinner ? 'winner' : ''}`;
      row.innerHTML = `
        <span class="score-item-name">${item.name} ${isWinner ? '👑' : ''}</span>
        <div class="score-track-bg">
          <div class="score-track-fill" style="width: ${pct}%;"></div>
        </div>
        <span class="score-item-pts">${item.pts}점</span>
      `;
      scoreBarsList.appendChild(row);
    });
  }

  // 6. Space Styling Tip (if present)
  const tipEl = document.getElementById('res-space-tip');
  if (tipEl) {
    tipEl.textContent = space.tip;
  }

  // 7. Format Date & Random Receipt Serial
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  document.getElementById('receipt-date').textContent = `DATE: ${dateStr}`;

  const randomNo = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('receipt-no').textContent = `NO: #MV-${randomNo}`;
}

// Show Step Card Helper
function showStep(stepName) {
  [stepCover, stepBrandIntro, stepQuestion, stepLoading, stepResult].forEach(card => {
    if (card) {
      card.classList.remove('active');
      card.classList.add('hidden');
    }
  });

  if (stepName === 'cover' && stepCover) {
    stepCover.classList.remove('hidden');
    stepCover.classList.add('active');
  } else if (stepName === 'brand-intro' && stepBrandIntro) {
    stepBrandIntro.classList.remove('hidden');
    stepBrandIntro.classList.add('active');
  } else if (stepName === 'question' && stepQuestion) {
    stepQuestion.classList.remove('hidden');
    stepQuestion.classList.add('active');
  } else if (stepName === 'loading' && stepLoading) {
    stepLoading.classList.remove('hidden');
    stepLoading.classList.add('active');
  } else if (stepName === 'result' && stepResult) {
    stepResult.classList.remove('hidden');
    stepResult.classList.add('active');
  }
}

// Format Time in User Friendly Format (e.g. 2026.10.03 12:30pm, 1:10am)
function formatTimestamp(date = new Date()) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' -> '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}.${month}.${day} ${hours}:${minutesStr}${ampm}`;
}

// Option Text Helper for Clean Database Inspection
function getOptionText(qId, val) {
  if (!val) return null;
  const q = QUESTIONS.find(item => item.id === qId);
  if (!q) return val;
  const opt = q.options.find(o => o.val === val);
  return opt ? `${opt.label} [${val}]` : val;
}

// Supabase Save Helper
async function saveToSupabase(participantInfo = null) {
  const q1Val = userAnswers['Q1'] || 'Q1_A';
  const q4Val = userAnswers['Q4'] || 'Q4_B';
  const perfume = PERFUMES[q1Val] || PERFUMES['Q1_A'];
  const space = SPACE_MOODS[q4Val] || SPACE_MOODS['Q4_B'];

  const payload = {
    q1_answer: getOptionText('Q1', userAnswers['Q1']),
    q2_answer: getOptionText('Q2', userAnswers['Q2']),
    q2_1_answer: getOptionText('Q2_1', userAnswers['Q2_1']),
    q3_answer: getOptionText('Q3', userAnswers['Q3']),
    q4_answer: getOptionText('Q4', userAnswers['Q4']),
    perfume_result: `${perfume.nameKr} (${perfume.nameEn})`,
    space_result: space.name,
    name: participantInfo ? participantInfo.name : null,
    age: participantInfo ? participantInfo.age : null,
    phone: participantInfo ? participantInfo.phone : null,
    meeting_time: participantInfo ? participantInfo.meeting : null,
    created_at_formatted: formatTimestamp()
  };

  console.log('MOVIN Data Payload prepared:', payload);

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('movin_test_results')
        .insert([payload]);

      if (error) {
        console.error('Supabase save error:', error);
      } else {
        console.log('Successfully saved data to Supabase:', data);
      }
    } catch (e) {
      console.warn('Supabase request failed:', e);
    }
  } else {
    // Local storage fallback backup
    const logs = JSON.parse(localStorage.getItem('movin_test_results') || '[]');
    logs.push(payload);
    localStorage.setItem('movin_test_results', JSON.stringify(logs));
    console.log('Saved data to LocalStorage backup:', payload);
  }
}

// Modal Form Controls
function openModal() {
  if (experienceModal) {
    experienceModal.classList.remove('hidden');
    validateModalForm();
  }
}

function closeModal() {
  if (experienceModal) {
    experienceModal.classList.add('hidden');
  }
}

// Check if all 4 modal input fields (Name, Age, Phone, Meeting Date/Time) are filled
function validateModalForm() {
  const nameInput = document.getElementById('user-name');
  const ageInput = document.getElementById('user-age');
  const phoneInput = document.getElementById('user-phone');
  const meetingInput = document.getElementById('user-meeting');
  const submitBtn = document.getElementById('modal-submit-btn');

  if (!nameInput || !ageInput || !phoneInput || !meetingInput || !submitBtn) return;

  const isNameValid = nameInput.value.trim().length > 0;
  const isAgeValid = ageInput.value.trim().length > 0;
  const isPhoneValid = phoneInput.value.trim().length > 0;
  const isMeetingValid = meetingInput.value.trim().length > 0;

  if (isNameValid && isAgeValid && isPhoneValid && isMeetingValid) {
    submitBtn.classList.remove('disabled');
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.add('disabled');
    submitBtn.disabled = true;
  }
}

// Modal Form Submit ('신청하기')
function handleFormSubmit(e) {
  e.preventDefault();

  const nameVal = document.getElementById('user-name').value.trim();
  const ageVal = document.getElementById('user-age').value.trim();
  const phoneVal = document.getElementById('user-phone').value.trim();
  const meetingVal = document.getElementById('user-meeting').value.trim();

  if (!nameVal || !ageVal || !phoneVal || !meetingVal) return;

  // Save to Supabase with Participant Info
  saveToSupabase({ name: nameVal, age: ageVal, phone: phoneVal, meeting: meetingVal });

  closeModal();
  showToast('신청이 완료되었습니다!');
}

// Direct Result Submit ('제출하기')
function directSubmitResult() {
  saveToSupabase(null);
  showToast('제출되었습니다!');
}

// Restart Quiz -> Goes to First Cover Page (#step-cover)
function restartQuiz() {
  currentStepIndex = 0;
  userAnswers = {};
  showStep('cover');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (msg) toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
