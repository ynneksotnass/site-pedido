document.addEventListener('DOMContentLoaded', function() {
    initApp();
    createBackgroundHearts();
});

function initApp() {
    const feedEl = document.getElementById('feedCarousel');
    const modalEl = document.getElementById('modalCarousel');
    
    if (feedEl) new bootstrap.Carousel(feedEl, { interval: 3000, ride: 'carousel' });
    if (modalEl) new bootstrap.Carousel(modalEl, { interval: false });

    if (feedEl && modalEl) {
        feedEl.addEventListener('slid.bs.carousel', function (event) {
            const modalInstance = bootstrap.Carousel.getInstance(modalEl);
            if (modalInstance) modalInstance.to(event.to);
        });
    }

    updateLikeDisplay();
    renderComments();
    setInterval(countdown, 1000);
}

window.closeOnBackdrop = function(event) {
    if (event.target.id === 'instaModal') window.closePost();
};

window.openPost = function() {
    const modal = document.getElementById('instaModal');
    if (modal) {
        modal.style.display = 'block';
        const feedEl = document.getElementById('feedCarousel');
        if (feedEl) bootstrap.Carousel.getInstance(feedEl).pause();
        renderComments();
    }
};

window.closePost = function() {
    const modal = document.getElementById('instaModal');
    if (modal) {
        modal.style.display = 'none';
        const feedEl = document.getElementById('feedCarousel');
        if (feedEl) bootstrap.Carousel.getInstance(feedEl).cycle();
    }
};

function createBackgroundHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart heart-particle';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        container.appendChild(heart);
    }
}

// CURTIDA UNIFICADA - DISPARA ANIMAÇÃO EM AMBOS
window.handleLike = function() {
    let likes = parseInt(localStorage.getItem('insta_likes')) || 0;
    likes++;
    localStorage.setItem('insta_likes', likes);
    updateLikeDisplay();
    
    const heart = document.getElementById('heart-anim');
    if (heart) {
        heart.classList.remove('animate');
        void heart.offsetWidth; // Força reinício da animação
        heart.classList.add('animate');
    }
};

function updateLikeDisplay() {
    const likes = localStorage.getItem('insta_likes') || 0;
    const display = document.getElementById('like-count-display');
    if (display) display.innerText = `${likes} curtidas`;
}

window.postComment = function() {
    const input = document.getElementById('comment-input');
    if (!input || !input.value.trim()) return;

    const now = new Date();
    const dataFormatada = now.toLocaleDateString('pt-BR');
    const horaFormatada = now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    
    const newComment = { 
        text: input.value, 
        time: horaFormatada,
        date: dataFormatada 
    };
    
    let comments = JSON.parse(localStorage.getItem('insta_comments')) || [];
    comments.push(newComment);
    localStorage.setItem('insta_comments', JSON.stringify(comments));
    
    input.value = '';
    renderComments();
};

function renderComments() {
    const box = document.getElementById('comments-list');
    if (!box) return;
    const comments = JSON.parse(localStorage.getItem('insta_comments')) || [];
    
    box.innerHTML = comments.map(c => `
        <div class="mb-3 text-start px-2">
            <strong>momo's</strong> ${c.text}
            <div class="text-muted" style="font-size: 0.7rem;">${c.date} às ${c.time}</div>
        </div>
    `).reverse().join('');
}

function countdown() {
    const target = new Date("2026-05-02T18:00:00").getTime();
    const now = new Date().getTime();
    const diff = target - now;
    const display = document.getElementById('countdown-special');
    if (display) {
        if (diff > 0) {
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            display.innerText = `${h}h ${m}m ${s}s`;
        } else {
            display.innerText = "CHEGOU O MOMENTO! ❤️";
        }
    }
}
// CONFIGURAÇÃO: Data de início do relacionamento (Ajuste aqui!)
const dataInicio = new Date("2025-09-02T00:00:00").getTime();

function atualizarCronometroProgressivo() {
    const agora = new Date().getTime();
    const diff = agora - dataInicio;

    if (document.getElementById('total-days')) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('total-days').innerText = d;
        document.getElementById('total-hours').innerText = h < 10 ? "0"+h : h;
        document.getElementById('total-minutes').innerText = m < 10 ? "0"+m : m;
        document.getElementById('total-seconds').innerText = s < 10 ? "0"+s : s;
    }
}

// Inicia a atualização contínua
setInterval(atualizarCronometroProgressivo, 1000);

// SCRIPT MOTIVOS

// Lista de adjetivos para o efeito aleatório
const listaAdjetivos = [
    "Linda", "Inteligente", "Carinhosa", "Perfeita", "Minha", "Cheirosa", 
    "Engraçada", "Dedicada", "Forte", "Incrível", "Amorosa", "Princesa linda",
    "Única", "Gatinha", "Gostosa", "Maravilhosa", "MOMO", "Preciosa",
    "Minha Namorada", "Doce", "Corajosa", "Fascinante", "Leal", "Companheira",
    "Sensacional", "Princesa"
];

function iniciarEfeitoAdjetivos() {
    const container = document.getElementById('adjectives-container');
    if (!container) return;

    // Criar adjetivos até chegar a 100 ao longo do tempo
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const adj = document.createElement('span');
            adj.className = 'adjective-item';
            adj.innerText = listaAdjetivos[Math.floor(Math.random() * listaAdjetivos.length)];
            
            // Posição aleatória na tela
            adj.style.left = Math.random() * 90 + 'vw';
            adj.style.top = Math.random() * 90 + 'vh';
            
            // Atraso aleatório para não surgirem todos juntos
            adj.style.animationDelay = Math.random() * 10 + 's';
            
            container.appendChild(adj);
        }, i * 100); // Espaçamento entre a criação de cada um
    }
}

// Chame a função dentro do DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', function() {
    // ... suas funções anteriores (initApp, createBackgroundHearts)
    iniciarEfeitoAdjetivos();
});

// CONTROLE DE MÚSICA
const music = document.getElementById('background-music');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');

if (music) {
    // Configura a barra ao carregar
    music.addEventListener('loadedmetadata', () => {
        progressBar.max = Math.floor(music.duration);
        const durM = Math.floor(music.duration / 60);
        const durS = Math.floor(music.duration % 60);
        document.getElementById('duration-time').innerText = `${durM}:${durS < 10 ? '0'+durS : durS}`;
    });

    // Atualiza progresso
    music.addEventListener('timeupdate', () => {
        progressBar.value = Math.floor(music.currentTime);
        const curM = Math.floor(music.currentTime / 60);
        const curS = Math.floor(music.currentTime % 60);
        document.getElementById('current-time').innerText = `${curM}:${curS < 10 ? '0'+curS : curS}`;
    });

    // Interatividade da barra
    progressBar.addEventListener('input', () => {
        music.currentTime = progressBar.value;
    });

    volumeControl.addEventListener('input', () => {
        music.volume = volumeControl.value;
    });
}

function restartMusic() {
    music.currentTime = 0;
}

function toggleMusic() {
    const btn = document.getElementById('music-control');
    const icon = btn.querySelector('i');
    if (music.paused) {
        music.play();
        icon.className = 'fas fa-pause';
    } else {
        music.pause();
        icon.className = 'fas fa-play';
    }
}
// QUIZ

// CONFIGURAÇÃO DAS PERGUNTAS (Altere aqui!)
const quizData = [
    { q: "Qual minha cor favorita? RS", a: "Roxo", options: ["Amarelo", "Roxo", "Preto", "Vermelho"] },
    { q: "Qual o carro dos meus sonhos", a: "Mustang GT", options: ["Mclaren", "Mercedes Benz", "Mustang GT", "BMW I8"] },
    { q: "Qual meu maior sonho?", a: "Viajar o mundo com você", options: ["Ser rico", "Casar com você", "Viajar o mundo com você", "Excelente carreira profissional"] },
    { q: "Qual meu anime favorito?", a: "Naruto", options: ["Demon Slayer", "Naruto", "Dragon Ball", "Attack On Titan"] },
    { q: "Quantos filhos eu quero ter?", a: "2", options: ["Nenhum", "3", "2", "1"] },
    { q: "Qual comida eu mais odeio?", a: "Cebola", options: ["Berinjela", "Pequi", "Coentro", "Cebola"] },
    { q: "Qual minha maior insegurança?", a: "Pele", options: ["Nariz", "Sorriso", "Corpo", "Pele"] },
    { q: "DIFÍCIL: Em qual área eu quero me especializar?", a: "IA", options: ["IA", "Testes", "Desenvolvedor", "Redes"] },
    { q: "DIFÍCIL: Qual meu apelido carinhoso na infância que meu pai me chamava?", a: "Coelhinho", options: ["Kennyzinho", "Coalinho", "Filhote", "Coelhinho"] },
    { q: "DIFÍCIL: Qual foi o dia que eu me apaixonei por você?", a: "Dia do Pastel", options: ["Primeira vez que te vi", "Dia do Pastel", "Show Sorriso Maroto", "Parque com Pagode"] }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    if (currentQuestion < quizData.length) {
        const quiz = quizData[currentQuestion];
        document.getElementById('question-text').innerText = quiz.q;
        document.getElementById('quiz-progress').innerText = `Pergunta ${currentQuestion + 1} de 10`;
        
        const optionsBox = document.getElementById('options-container');
        optionsBox.innerHTML = '';
        
        quiz.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-quiz-option shadow-sm';
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(opt);
            optionsBox.appendChild(btn);
        });
    } else {
        showResults();
    }
}

function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].a) score++;
    currentQuestion++;
    loadQuiz();
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.add('d-none');
    
    const resBox = document.getElementById('result-container');
    resBox.classList.remove('d-none');
    
    const title = document.getElementById('result-title');
    const scoreText = document.getElementById('result-score');
    const icon = document.getElementById('result-icon');

    scoreText.innerText = `Você acertou ${score} de 10!`;

    if (score <= 5) {
        title.innerText = "Me odeia";
        icon.innerHTML = '<i class="fas fa-heart-broken fa-5x text-secondary shake"></i>';
        // Aplica o cinza apenas ao cartão de resultado, não ao body inteiro
        resBox.classList.add('grayscale'); 
    } 
    else if (score >= 6 && score <= 9) {
        title.innerText = "Da pra chegar no 10";
        icon.innerHTML = '<i class="fas fa-smile-beam fa-5x text-warning"></i>';
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } 
    else {
        title.innerText = "EU TE AMO";
        icon.innerHTML = '<i class="fas fa-crown fa-5x text-warning heart-beat"></i>';
        const duration = 5 * 1000;
        const end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#8e44ad', '#f1c40f'] });
            confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#8e44ad', '#f1c40f'] });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
}

// Iniciar quiz se estiver na página correta
if (document.getElementById('quiz-container')) {
    loadQuiz();
}

// SEGREDO

// Lista de frases para o fundo dark
const frasesSecretas = ["paz", "eternidade", "Deus", "infinito", "dengo", "obra-prima", "💛", "💜"];

function iniciarChuvaDeFrases() {
    const container = document.getElementById('secret-effects-container');
    if (!container) return;

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'floating-phrase';
            span.innerText = frasesSecretas[Math.floor(Math.random() * frasesSecretas.length)];
            
            span.style.left = Math.random() * 95 + 'vw';
            span.style.animationDelay = Math.random() * 10 + 's';
            span.style.fontSize = Math.random() * 1 + 0.8 + 'rem';
            
            // Alterna entre roxo e amarelo suavemente
            span.style.color = i % 2 === 0 ? '#8e44ad' : '#f1c40f';
            
            container.appendChild(span);
        }, i * 300);
    }
}

// Lógica de Revelação
window.revelarSegredo = function() {
    const input = document.getElementById('secret-word').value.toLowerCase().trim();
    
    // Altere 'amor' para a palavra que você quiser
    if (input === 'pedido') {
        document.getElementById('full-screen-secret').classList.remove('d-none');
    } else {
        alert("Palavra errada... DICA: Algo que você estava ansiosa!");
    }
};

window.fecharSegredo = function() {
    document.getElementById('full-screen-secret').classList.add('d-none');
};

// Adicione ao seu DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('secret-effects-container')) {
        iniciarChuvaDeFrases();
    }
});

// BLOQUEIO

// CONFIGURAÇÃO: Data e Hora de Liberação
const dataLiberacao = new Date("2026-05-02T18:25:00").getTime();

function gerenciarBloqueioSite() {
    const agora = new Date().getTime();
    const diff = dataLiberacao - agora;

    const overlay = document.getElementById('global-lock-overlay');
    const conteudo = document.getElementById('site-content');
    const displayTimer = document.getElementById('lock-timer');

    if (diff > 0) {
        // Site Bloqueado - Atualiza o cronômetro
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (displayTimer) {
            displayTimer.innerText = `${d}d ${h}h ${m}m ${s}s`;
        }
        
        // Garante que o conteúdo permaneça escondido
        if (conteudo) conteudo.style.display = 'none';
        if (overlay) overlay.style.display = 'flex';
    } else {
        // HORA DE LIBERAR!
        if (overlay) overlay.style.display = 'none';
        if (conteudo) {
            conteudo.style.display = 'block';
            conteudo.style.opacity = '1';
        }
        
        // Se houver confetes na liberação inicial (opcional)
        if (!window.liberado) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            window.liberado = true;
        }
    }
}

// Executa a verificação a cada segundo
setInterval(gerenciarBloqueioSite, 1000);

// Chama uma vez ao carregar para evitar "piscada" de conteúdo
document.addEventListener('DOMContentLoaded', gerenciarBloqueioSite);