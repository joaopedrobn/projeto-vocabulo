import React, { useState, useEffect, useCallback } from 'react';
import Grid from './components/Grid';
import Teclado from './components/Teclado';
import { getPalavrasDoDia } from './utils/palavras';
import { isPalpiteValido, validarTentativa } from './utils/validacao';

const LOCAL_STORAGE_KEY = 'meuTermoGameState';

function App() {
  const [solucao, setSolucao] = useState('');
  const [tentativas, setTentativas] = useState([]);
  const [tentativaAtual, setTentativaAtual] = useState('');
  const [statusLetras, setStatusLetras] = useState({});
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const { termo, diaIndex } = getPalavrasDoDia();
    const solucaoUpper = termo.toUpperCase();
    setSolucao(solucaoUpper);

    const estadoSalvo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (estadoSalvo && estadoSalvo.diaIndex === diaIndex) {
      setTentativas(estadoSalvo.tentativas);
      setStatusLetras(estadoSalvo.statusLetras);
      setJogoFinalizado(estadoSalvo.jogoFinalizado);
      if (estadoSalvo.jogoFinalizado) {
        mostrarMensagem(estadoSalvo.tentativas.some(t => t.every(l => l.status === 'correta'))
          ? 'Você já acertou hoje!'
          : `A palavra era: ${solucaoUpper}`, 3000);
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    console.log("Palavra do dia (para teste):", termo);
  }, []);

  useEffect(() => {
    if (solucao) {
      const { diaIndex } = getPalavrasDoDia();
      const estadoParaSalvar = {
        tentativas, statusLetras, jogoFinalizado, diaIndex
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(estadoParaSalvar));
    }
  }, [tentativas, statusLetras, jogoFinalizado, solucao]);

  const mostrarMensagem = (msg, duration = 2000) => {
    setMensagem(msg);
    setTimeout(() => setMensagem(''), duration);
  };

  const submeterTentativa = useCallback(() => {
    const triggerShake = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    };

    if (tentativaAtual.length !== 5) {
      mostrarMensagem('Apenas palavras de 5 letras');
      triggerShake();
      return;
    }

    if (!isPalpiteValido(tentativaAtual)) {
      mostrarMensagem('Palavra não existe');
      triggerShake();
      return;
    }

    const resultado = validarTentativa(tentativaAtual, solucao);
    const novasTentativas = [...tentativas, resultado];
    setTentativas(novasTentativas);

    const novoStatusLetras = { ...statusLetras };
    resultado.forEach(({ letra, status }) => {
      const letraNormalizada = letra.toLowerCase();
      const statusAtual = novoStatusLetras[letraNormalizada];
      if (statusAtual === 'correta' || (statusAtual === 'presente' && status === 'ausente')) return;
      novoStatusLetras[letraNormalizada] = status;
    });
    setStatusLetras(novoStatusLetras);
    setTentativaAtual('');

    const acertou = resultado.every(l => l.status === 'correta');
    if (acertou) {
      mostrarMensagem('Você acertou!', 3000);
      setJogoFinalizado(true);
    } else if (novasTentativas.length === 6) {
      mostrarMensagem(`A palavra era: ${solucao}`, 3000);
      setJogoFinalizado(true);
    }
  }, [tentativaAtual, solucao, tentativas, statusLetras]);

  const handleKeyPress = useCallback((key) => {
    if (jogoFinalizado) return;
    if (key === 'ENTER') {
      submeterTentativa();
    } else if (key === '⌫' || key === 'BACKSPACE') {
      setTentativaAtual((prev) => prev.slice(0, -1));
    } else if (tentativaAtual.length < 5 && /^[a-zA-Z]$/.test(key)) {
      setTentativaAtual((prev) => prev + key.toUpperCase());
    }
  }, [jogoFinalizado, submeterTentativa, tentativaAtual]);

  useEffect(() => {
    const listener = (e) => {
      const keyMap = { 'Backspace': '⌫', 'Enter': 'ENTER' };
      let key = keyMap[e.key] || e.key;
      if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        key = e.key;
      }
      handleKeyPress(key);
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handleKeyPress]);

  return (
    <div className="main-container">
      <header>
        <h1>Vocábulo</h1>
        {mensagem && <div className="mensagem">{mensagem}</div>}
      </header>
      <main>
        <Grid
          tentativas={tentativas}
          tentativaAtual={tentativaAtual}
          isShaking={isShaking}
        />
        <Teclado
          statusLetras={statusLetras}
          onKeyPress={handleKeyPress}
        />
      </main>
    </div>
  );
}

export default App;

