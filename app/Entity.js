import Format from 'Format';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  attach,
  create,
  get,
  has,
  remove,
  update
}

// Functions -------------------------------------------------------------------

function create(components = []) {
  return components
    .reduce((entity, component) => Object.assign({}, entity, {
      [Format.propName(component.type)]: component.value
    }), {});
}

function attach(entity, component) {
  const componentName = Format.propName(component.type);
  if (entity.hasOwnProperty(componentName)) {
    console.error(`The entity already has a ${componentName} property.`);
    return entity;
  }

  return Object.assign({}, entity, { [componentName]: component.value });
}

function get(entity, componentType) {
  return entity[Format.propName(componentType)];
}

function has(entity, componentType) {
  return entity.hasOwnProperty(Format.propName(componentType));
}

function remove(entity, componentType) {
  const propName = Format.propName(componentType);

  return Object.keys(entity)
    .filter(prop => prop !== propName)
    .reduce((newEntity, prop) => Object.assign({}, newEntity, {
      [prop]: entity[prop]
    }), {});
}

function update(entity, componentType, fn) {
  const propName = Format.propName(componentType);

  return Object.keys(entity)
    .reduce((newEntity, prop) => Object.assign({}, newEntity, {
      [prop]: prop === propName ? fn(entity[prop]) : entity[prop]
    }), {});
}
