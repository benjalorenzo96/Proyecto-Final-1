const moment = require('moment');

const fechaActual = moment();

const fechaNacimiento = moment('1996-08-22');

if (fechaNacimiento.isValid()) {
  const diasPasados = fechaActual.diff(fechaNacimiento, 'days');

  console.log(`Han pasado ${diasPasados} días desde tu nacimiento.`);
} else {
  console.log('La fecha de nacimiento no es válida.');
}
