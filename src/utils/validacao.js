import { PALPITES } from '../data/palpites';

/**
 * Remove acentos de uma string e a converte para minúsculas.
 * Ex: "MÁGICO" -> "magico"
 * @param {string} palavra A palavra para normalizar.
 * @returns {string} A palavra normalizada.
 */
const normalizarPalavra = (palavra) => {
  return palavra
    .toLowerCase()
    .normalize('NFD') // Decompõe os caracteres acentuados (ex: 'á' -> 'a' + '´')
    .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos (diacríticos)
};

/**
 * Verifica se uma palavra de 5 letras existe na nossa lista completa de palpites.
 * Usa um Set para uma busca muito mais rápida (O(1)) em vez de Array.includes (O(n)).
 */
const dicionarioDePalpites = new Set(PALPITES);
export const isPalpiteValido = (palpite) => {
  return dicionarioDePalpites.has(normalizarPalavra(palpite));
};

/**
 * Compara o palpite do jogador com a solução e retorna o status de cada letra.
 * @param {string} palpite A palavra digitada pelo jogador.
 * @param {string} solucao A palavra correta.
 * @returns {Array<{letra: string, status: 'correta' | 'presente' | 'ausente'}>}
 */
export const validarTentativa = (palpite, solucao) => {
  const palpiteNormalizado = normalizarPalavra(palpite).split('');
  const solucaoNormalizada = normalizarPalavra(solucao).split('');

  const resultado = [];
  const solucaoLetrasRestantes = [...solucaoNormalizada];

  // 1ª Passada: Verificar letras corretas (verdes)
  for (let i = 0; i < 5; i++) {
    const letraPalpite = palpiteNormalizado[i];
    if (letraPalpite === solucaoNormalizada[i]) {
      resultado[i] = { letra: palpite[i], status: 'correta' };
      // Marca a letra da solução como "usada" para não ser contada novamente.
      solucaoLetrasRestantes[i] = null;
    }
  }

  // 2ª Passada: Verificar letras presentes (amarelas) e ausentes (cinzas)
  for (let i = 0; i < 5; i++) {
    // Se a letra já foi marcada como correta, pula para a próxima.
    if (resultado[i]) continue;

    const letraPalpite = palpiteNormalizado[i];
    const indiceNaSolucao = solucaoLetrasRestantes.indexOf(letraPalpite);

    if (indiceNaSolucao !== -1) {
      resultado[i] = { letra: palpite[i], status: 'presente' };
      // Marca a letra encontrada como "usada" para evitar contar letras duplicadas.
      solucaoLetrasRestantes[indiceNaSolucao] = null;
    } else {
      resultado[i] = { letra: palpite[i], status: 'ausente' };
    }
  }

  return resultado;
};
