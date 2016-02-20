
// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  attach,
  create,
  get,
  has,
  remove
}

// Functions -------------------------------------------------------------------

function create(components = []) {
  // An entity should only have one component of each type, so filter to uniques
  return {
    components: components
      .filter((component, index) =>
        components.indexOf(components.find(cmp =>
          cmp.type === component.type
        )) === index
      )
  };
}

function attach(entity, component) {
  if (has(entity, component.type)) {
    console.error(`The entity already has a ${component.type} component.`);
    return entity;
  }

  return Object.assign({}, entity, {
    components: entity.components.concat(component)
  });
}

function get(entity, componentType) {
  return entity.components
    .find(component => component.type === componentType)
    .value;
}

function has(entity, componentType) {
  return entity.components
    .filter(component => component.type === componentType)
    .length > 0;
}

function remove(entity, componentType) {
  return Object.assign({}, entity, {
    components: entity.components
      .filter(component => component.type !== componentType)
  });
}

function update(entity, componentType, fn) {
  return Object.assign({}, entity, {
    components: entity.components
      .filter(component => component.type === componentType)
      .map(component => Object.assign({}, component, {
        value: fn(component.value)
      }))
  });
}