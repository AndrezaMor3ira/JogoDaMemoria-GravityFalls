const fileiras = document.querySelector('.fileiras_cartas');
const Tempo = document.querySelector('.timer');
const modal = document.querySelector('.modal');
const btnReniciar = document.querySelector('#reniciarJogo');
const btnEncerrar = document.querySelector('#encerrarJogo');
const timeWin = document.querySelector('.time-win');


const personagens = [
    'CartaWaddles',
    'CartaStanley',
    'CartaMabelCat',
    'CartaFord',
    'CartaDipper',
    'CartaBill',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let tempoDeJogo = 0;


let primeiraCarta = '';
let segundaCarta = '';

const checarVenceu = () => {
    const desabilitarCartas = document.querySelectorAll('.desabilitar-carta');

    if (desabilitarCartas.length == 12) {
        clearInterval(this.loop);
        modal.classList.remove('hidden');
        timeWin.innerHTML = `${tempoDeJogo} segundos`;
    }
}

const checarCartas = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-character');
    const segundoPersonagem = segundaCarta.getAttribute('data-character');

    if (primeiroPersonagem == segundoPersonagem) {
        primeiraCarta.firstChild.classList.add('desabilitar-carta');
        segundaCarta.firstChild.classList.add('desabilitar-carta');

        primeiraCarta = '';
        segundaCarta = '';

        checarVenceu();
    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('revelar-carta');
            segundaCarta.classList.remove('revelar-carta');

            primeiraCarta = '';
            segundaCarta = '';
        }, 500);

    }
}

const revelarCarta = ({ target }) => {
    if (target.parentNode.className.includes('revelar-carta')) {
        return;
    }

    if (primeiraCarta == '') {
        target.parentNode.classList.add('revelar-carta');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta == '') {
        target.parentNode.classList.add('revelar-carta');
        segundaCarta = target.parentNode;

        checarCartas();
    }

}

const createCarta = (personagem) => {
    const carta = createElement('div', 'carta');
    const frente = createElement('div', 'lado frente');
    const costas = createElement('div', 'lado costas');

    frente.style.backgroundImage = `url('../assets/${personagem}.svg')`;

    carta.appendChild(frente);
    carta.appendChild(costas);

    carta.addEventListener('click', revelarCarta);
    carta.setAttribute('data-character', personagem)

    return carta;
}

const carregarJogo = () => {

    const duplicarPersonagens = [...personagens, ...personagens];

    const embaralharArrayPersonagens = duplicarPersonagens.sort(() => Math.random() - 0.5);

    embaralharArrayPersonagens.forEach((personagem) => {
        const carta = createCarta(personagem);
        fileiras.appendChild(carta);
    });
}


const começarContagem = () => {
    this.loop = setInterval(() => {
        const currentTime = +Tempo.innerHTML;
        Tempo.innerHTML = currentTime + 1;
        tempoDeJogo = currentTime + 1;
    }, 1000);
}

const reniciarJogo = () => {
    primeiraCarta = '';
    segundaCarta = '';

    fileiras.innerHTML = '';

    carregarJogo();

    Tempo.innerHTML = '0';

    clearInterval(this.loop);
    começarContagem();

    modal.classList.add('hidden');
}

btnReniciar.addEventListener('click', reniciarJogo);

window.onload = () => {
    começarContagem();
    carregarJogo();
}



