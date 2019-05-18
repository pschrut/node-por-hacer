const descripcion = {
	demand: true,
	alias: 'd',
	desc: 'Descripcion de la tarea por hacer'
}

const completado = {
	alias: 'c',
	desc: 'Marca como completado o pendiente la tarea',
	default: true
}


const argv = require('yargs')
				.command('crear', 'Crear un elemento por hacer', {
					descripcion
				})
				.command('actualizar', 'Actualiza el estado completo de una tarea', {
					descripcion,
					completado
				})
				.command('borrar', 'Borra el elemento del array', {
					descripcion
				})
				.help()
				.argv;

module.exports = {
	argv
}