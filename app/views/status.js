import Carl from 'entities/Carl';
import DOM from 'DOM';
import Text from 'Text';
import World from 'World';

const sep = t => DOM.html('span.sep', [DOM.text(t)]);
const stat = c => DOM.html('span.stat', c);
const unit = t => DOM.html('span.unit', [DOM.text(t)]);

export default function renderStatus({ state, world }) {
  const carl = Carl.findIn(state.entities);

  const energySpan = DOM.html('span.energy');
  const energyLevel = 100 * carl.energy.current / carl.energy.max;
  energySpan.style.width = `${energyLevel}%`;
  if (energyLevel < 20) energySpan.classList.add('-critical');
  else if (energyLevel < 50) energySpan.classList.add('-low');

  const statusEl = DOM.html('div#Status', [
    DOM.html('section.-left', [
      stat([
        'HP', sep(':'),
        carl.health.current, sep('/'), carl.health.max
      ]),
      stat([
        'CPU', sep(':'),
        carl.cpuSlot.cpu.clockSpeed.toFixed(1), unit('GHz')
      ])
    ]),
    DOM.html('section.-center', [
      `(${carl.position.x + 1}, ${carl.position.y + 1}) `,
      sep(Text.capitalize(World.tileAt(world, carl.position)))
    ]),
    DOM.html('section.-right', [
      stat([
        Text.formatNumber(carl.energy.current), unit('J')
      ]),
      DOM.html('span.energy-bar', [energySpan])
    ])
  ]);
  document.body.replaceChild(statusEl, DOM.find('#Status'));
}
