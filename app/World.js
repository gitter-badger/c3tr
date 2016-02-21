import Elevation from 'components/Elevation';
import Entity from 'Entity';
import FastSimplexNoise from 'fast-simplex-noise';
import Position from 'components/Position';
import Random from 'Random';
import Tile from 'Tile';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  generate,
  tileAt
};

// Functions -------------------------------------------------------------------

function generate(width, height) {
  const elevationNoise = new FastSimplexNoise({
    frequency: 0.03,
    max: 10,
    min: -10,
    octaves: 8
  });

  const start = Date.now();
  const tiles = new Array(width);
  for (let x = 0; x < width; x++) {
    tiles[x] = new Array(height);
    for (let y = 0; y < height; y++) {
      tiles[x][y] = Tile.create(elevationNoise.in2D(x, y));
    }
  }
  console.log('World generation took', Date.now() - start, 'ms');

  return {
    height,
    tiles,
    width
  };
}

function tileAt(world, { x, y }) {
  return world.tiles[x][y];
}
