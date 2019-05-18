const fs = require('fs');

let listadoPorHacer = [];

let guardarDB = () => {
	let data = JSON.stringify(listadoPorHacer);

	fs.writeFile('db/data.json', data, err => {
		if (err){
			throw new Error('No se pudo grabar', err);
			return;
		}

		console.log('Datos guardados');
	});
}

let cargarDB = () => {
	try {
		listadoPorHacer = require('../db/data.json');
	} catch(error) {
		listadoPorHacer = [];
	}
}

let getListado = () => {
	cargarDB();
	return listadoPorHacer;
}

let actualizar = (descripcion, completado = true) => {
	cargarDB();

	let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

	if (index >= 0) {
		listadoPorHacer[index].completado = Boolean(completado);
		guardarDB();
		return true;
	} else {
		return false;
	}
}

let crear = descripcion => {
	cargarDB();

	let porHacer = {
		descripcion,
		completado: false
	};

	listadoPorHacer.push(porHacer);

	guardarDB();

	return porHacer;
}

let borrar = descripcion => {
	cargarDB();

	let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

	if (listadoPorHacer.length === nuevoListado.length) {
		return false
	} else {
		listadoPorHacer = nuevoListado
		guardarDB();
		return true;
	}
}

module.exports = {
	crear,
	getListado,
	actualizar,
	borrar
}