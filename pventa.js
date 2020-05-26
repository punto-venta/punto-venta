let myStorage = window.localStorage;


let PVenta = { 
    /*  creamos un espacio de nombre PVenta
        vamos a crear un CRUD (Create, Read, Update, Delete)
        Vamos almacenar nuestras objetos en Arrays y respaldarlos con localStorage
        recordar que el id de cada Objeto debe ser unico en su Lista
    */

    
    _usuarios:[], //  Usuario(id,usuario,clave)
                  //  Ejemplo  {id:0,usuario:'admin',clave:'root'}
    _categorias:[], // Categoria (id, nombre , idPadre , detalle, porcgancia) 
                    // Ejemplo Categoria {id:0,nombre:'General',idPadre:0,detalle:'Todas las Categorias',porcganancia:35.5}
    _productos:[], // Producto(id,codigo,foto,nombre,idCategoria,precioc,preciov,conteo:[KILO | UNIDAD])
    _facturas:[],
    _detFacturas:[],

    
    // Metodos de nuestro Punto de Venta
    // Recordar solo agregar los metodos de la Api.

    getUsuario:function(idUsuario){
       let usuario=null;
       PVenta._usuarios.map((u)=> {if (u.id == idUsuario) return usuario=u});
       return usuario;
    },

    findByNameUsuario: function(nameusuario){
        let indice = -1;

        for (let i= 0; i < PVenta._usuarios.length; i++){
            if (PVenta._usuarios[i].usuario == nameusuario){
                indice = i;
            }
            if (indice >= 0){
                return PVenta._usuarios[indice];
            }
            else return null;
        }
    },

    getUsuarios(){
        return PVenta._usuarios;
    },

    deleteUsuario(idUsuario){
        let indice = -1;
        for (let i=0; i<PVenta._usuarios.length; i++){
            if (PVenta._usuarios[i].id == idUsuario){
                indice = i;
            }
            if (indice >= 0){
                PVenta._usuarios.splice(indice, 1);
                this.saveData();
            }
        }

    },
    updateUsuario(usuario){
        let indice = -1;
        for (let i=0; i<PVenta._usuarios.length; i++){
            if (PVenta._usuarios[i].id == usuario.id){
                indice = i;
            }
            if (indice >= 0){
                PVenta._usuarios[indice] = usuario;
                this.saveData();
            }
        }
    },

    addUsuario(usuario){
       PVenta._usuarios.push(usuario);
       this.saveData();

    },
    saveData(){
        let data={
            usuarios:this._usuarios,
            categorias: this._categorias,
            productos: this._productos,
            facturas: this._facturas,
            detFacturas: this._detFacturas
        }
        myStorage.setItem('datajson',JSON.stringify(data));
        console.log('OK');
    },
    init:function(){
        //cargamos todos nuestros array del localStorage
    let data = myStorage.getItem('datajson');
    if (data){
        data = JSON.parse(data);
        this._usuarios = data.usuarios;
        this._categorias = data.categorias;
        this._productos = data.productos;
        this._facturas = data.facturas;
        this._detFacturas = data.detFacturas;       
    }
    
        
    }

}

PVenta.init();// metodo obligatorio primero que todos para cargar datos desde el localStorage
PVenta.getUsuarios();