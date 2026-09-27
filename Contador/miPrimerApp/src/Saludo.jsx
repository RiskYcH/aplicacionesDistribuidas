{/*props*/}
function Saludo({nombre, tipo}){

    return(
        <div>
            <p>Buenos {tipo} criaturitas del señor el mundo les dice hola{nombre} </p>
            {/*A props.nombre*/}
        </div>
    )
}
export default Saludo