import React from 'react';

// Layout igual ao TERMO
const LINHA1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const LINHA2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '⌫'];
const LINHA3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'];

function Teclado({ statusLetras, onKeyPress }) {
  const renderLinha = (letras, extraClass = '') => (
    <div className={`teclado-linha ${extraClass}`}>
      {letras.map((letra) => {
        const status = statusLetras[letra.toLowerCase()] || 'padrao';
        const isSpecial = letra === 'ENTER' || letra === '⌫';
        const classe = `teclado-botao status-${status} ${isSpecial ? 'special' : ''}`;

        return (
          <button
            key={letra}
            className={classe}
            onClick={() => onKeyPress(letra)}
            aria-label={letra === '⌫' ? 'Backspace' : letra}
          >
            {letra}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="teclado-container">
      {renderLinha(LINHA1)}
      {renderLinha(LINHA2, 'offset')}   {/* 2ª fila com leve recuo lateral */}
      {renderLinha(LINHA3)}
    </div>
  );
}

export default Teclado;
