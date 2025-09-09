import { RESPOSTAS } from '../data/respostas';

// Define a data de início do jogo. Isso garante que a palavra do dia seja consistente.
// O fuso horário (-03:00) é importante para alinhar com o horário de Brasília.
const DATA_INICIO = new Date("2024-01-01T00:00:00-03:00");

/**
 * Calcula o número de dias que se passaram desde a data de início do jogo.
 * @returns {number} O índice do dia atual.
 */
const getIndiceDoDia = () => {
  const hoje = new Date();
  // Zera a hora para garantir que a data seja a mesma durante todo o dia,
  // independentemente do fuso horário do jogador.
  hoje.setHours(0, 0, 0, 0);
  const diffEmMs = hoje.getTime() - DATA_INICIO.getTime();
  // Converte a diferença de milissegundos para dias.
  return Math.floor(diffEmMs / (1000 * 60 * 60 * 24));
};

/**
 * Seleciona as palavras do dia para todos os modos de jogo de forma determinística.
 * @returns {{termo: string, dueto: string[], quarteto: string[]}}
 */
export const getPalavrasDoDia = () => {
  const indiceBase = getIndiceDoDia();
  
  // O operador de módulo (%) garante que o índice sempre "dê a volta" na lista,
  // nunca estourando o tamanho do array.
  const getPalavraPorIndice = (offset = 0) => RESPOSTAS[(indiceBase + offset) % RESPOSTAS.length];

  // Seleciona as palavras para cada modo de jogo.
  // Usamos um 'offset' (deslocamento) para garantir que sejam palavras diferentes.
  return {
    termo: getPalavraPorIndice(0),
    dueto: [getPalavraPorIndice(1), getPalavraPorIndice(2)],
    quarteto: [
      getPalavraPorIndice(3),
      getPalavraPorIndice(4),
      getPalavraPorIndice(5),
      getPalavraPorIndice(6),
    ],
  };
};
