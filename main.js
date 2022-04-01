
const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id = 0;
let  list;

const Fecha=new Date();

fecha.innerHTML=Fecha.toLocaleDateString('es-MX',{weekday:'long',month:'short',day:'numeric'})

function agregarTarea(tarea, id, realizado, eliminado) {

    if (eliminado) { return }

    const REALIZADO = realizado ? check : uncheck
    const line = realizado ? lineThrough : ''

    const elemento = `
    <li id="elemento"> 
    <i class="far ${REALIZADO}" data='realizado' id="${id}"></i>
    <i class="text ${line}">${tarea}</i>
    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>

        </li>

    `
    lista.insertAdjacentHTML("beforeend", elemento)
}


let tareaEliminada = (element) => {

    element.parentNode.parentNode.removeChild(element.parentNode)
    list[element.id].eliminado=true
    localStorage.setItem('Todo',JSON.stringify(list))

}



botonEnter.addEventListener('click', () => {

    const tarea = input.value

    if (tarea) {
        agregarTarea(tarea, id, false, false)
        list.push({
            
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false
        })
        

    }

    localStorage.setItem('Todo',JSON.stringify(list))
    input.value = "";
    id++


});


document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value
        if (tarea) {
            agregarTarea(tarea, id, false, false)
            list.push({
            
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false
        })
    
        }localStorage.setItem('Todo',JSON.stringify(list))
        input.value = "";
        id++
    }


});

lista.addEventListener('click', function (event) {


    const element = event.target 
    console.log(element)
    const elementData = element.attributes.data.value
    console.log(elementData)
   

    if(elementData == 'realizado') {
        tareaRealizada(element)
    
    } else if (elementData ) {
        tareaEliminada(element)

    }
});



function tareaRealizada (element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    list[element.id].realizado=list[element.id].realizado?false:true
    localStorage.setItem('Todo',JSON.stringify(list))


}

//generar el local store y recuperarlo
let data =localStorage.getItem('Todo')

if(data){
list=JSON.parse(data)
    id=list.length
    cargarLista(list)

}else{
    list=[]
    id=0

}

function cargarLista(DATA){
    DATA.forEach(function(i){

        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)

    })

}
