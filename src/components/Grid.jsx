import React from 'react';
import Tile from './Tile';

function Grid({ tentativas, tentativaAtual, isShaking }) {
  const linhasVazias = Array(6 - tentativas.length - 1).fill(null);
  const shakeClass = isShaking ? 'row-shake' : '';

  return (
    <div className="grid-container">
      {/* Renderiza as tentativas já feitas */}
      {tentativas.map((tentativa, i) => (
        <div key={i} className="grid-row submitted">
          {tentativa.map((tile, j) => (
            <Tile key={j} letra={tile.letra} status={tile.status} />
          ))}
        </div>
      ))}

      {/* Renderiza a linha da tentativa atual, aplicando o shake se necessário */}
      {tentativas.length < 6 && (
        <div className={`grid-row ${shakeClass}`}>
          {tentativaAtual.split('').map((letra, i) => (
            <Tile key={i} letra={letra} status="digitando" />
          ))}
          {Array(5 - tentativaAtual.length).fill(null).map((_, i) => (
            <Tile key={i} />
          ))}
        </div>
      )}

      {/* Renderiza as linhas vazias restantes */}
      {linhasVazias.map((_, i) => (
        <div key={i} className="grid-row">
          {Array(5).fill(null).map((_, j) => (
            <Tile key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;

