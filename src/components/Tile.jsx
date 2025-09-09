import React from 'react';

/**
 * Representa um único "quadradinho" no grid do jogo.
 * @param {{ letra?: string, status?: 'correta' | 'presente' | 'ausente' | 'vazio' | 'digitando' }} props
 */
function Tile({ letra = '', status = 'vazio' }) {
  // Define as classes CSS com base no status do tile.
  // Isso permite que o estilo mude dinamicamente.
  const classes = `tile tile-status-${status}`;

  return (
    <div className={classes}>
      {letra}
    </div>
  );
}

export default Tile;

