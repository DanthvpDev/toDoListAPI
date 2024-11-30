async function ConexionAPI(clave, valor) {
    try {
        let promesaAPI;
        //* * Si ambos parámetros tienen
        console.log(clave != undefined && valor != undefined);
        (clave && valor != undefined) ? promesaAPI = await fetch(`https://jsonplaceholder.typicode.com/todos?${clave}=${valor}`) 
                         :promesaAPI = await fetch('https://jsonplaceholder.typicode.com/todos');
        //? Petición a la API

        //? Datos a JSON 
        const jsonDatos = await promesaAPI.json();
        return jsonDatos
    }
    catch (exc) {
        return null;
    }
}


async function GenerarListaCompleta(clave, valor, contenedorHtml) {
    try {
        contenedorHtml.classList.remove('fs-5');

        //* * Si el tbody no tiene hijos
        if(contenedorHtml.children.length == 0) {
            //? Guarda la promesa de la función .json() o un null
            let datosAPI = await ConexionAPI(clave, valor);

            //* * Si no es null
            if (datosAPI) {
                
                datosAPI.forEach(element => {
                    let tableRow = document.createElement('tr');
                    tableRow.className += 'text-center text-secondary'
                    tableRow.innerHTML = ` <td>${element.userId}</td>
                                        <td>${element.id}</td>
                                        <td>${element.title}</td>
                                        <td>${element.completed ? '<img src="/media/img/check.png" width="25" height="25">' : '<img src="/media/img/clock.png" width="30" height="30"'}</td> `
                    contenedorHtml.appendChild(tableRow)
                });

            }
            else {
                contenedorHtml.classList.add('fs-5')
                contenedorHtml.innerHTML = `<tr>
                                            <td colspan='2'>No hay datos para mostrar en este momento</td> 
                                            <td colspan="2"><img src="/media/img/shock.png" width="30" height="30"></td> 
                                        </tr>`
                console.log(`Error al cargar la información de la API` )
            }
        }
    }
    catch (exc) {
        console.log(`Error al cargar la información de la API: ${exc}` )
    }
}