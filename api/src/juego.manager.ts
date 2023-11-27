// ----- Logica tarjetas ----- //
import { tarjeta } from "./tarjeta";
const actividadSchema = require('./models/actividades.model');

export class JuegoManager {
    jugadores: any[];
    
    constructor(socket: any) {
        this.jugadores = [];
        

        this.webSocketConn(socket);
    }

    pingInterval: number = 5000;
    wsc: any;


    webSocketConn(ws: any) {
        this.wsc = ws;
        ws.on('connection', (conn: any) => {
            conn.emit('connected', { "ok": "ok"});
            ws.emit('actualizarJugadores', { 'jugadores': this.jugadores });
    
            // -------------------------------------------------------------------------------- //

            conn.on('addUser', (data: { [key: string]: any }) => {
                let user = data['user'];
                if(user != '') {
                    if(!this.jugadores.includes(user)) {
                        console.log('nuevo jugador: ' + user);
                        this.jugadores.push(user);
                        conn.user = user;
                        console.log(this.jugadores);
                    }
                    ws.emit('actualizarJugadores', { 'jugadores': this.jugadores });
                }else{
                    console.log('no se pudo agregar el jugador');
                }
            });

            conn.on('empezar', (data: { [key: string]: any }) => {
                console.log('empezar');
                console.log(this.tema);
                this.tema = data['tema'];
                this.empezarPartida();
            });

            // -------------------------------------------------------------------------------- //

            conn.on('sumarPuntos', (data: { [key: string]: any }) => {
                let tarjeta = data['tarjeta'];
                let user = data['user'];
                if(tarjeta != '') {
                    this.sumarPuntos(tarjeta, user);
                }else{
                    console.log('no se pudo sumar puntos');
                }
            });

            conn.on('restarPuntos', (data: { [key: string]: any }) => {
                let tarjeta = data['tarjeta'];
                let user = data['user'];
                if(tarjeta != '') {
                    this.restarPuntos(tarjeta, user);
                }else{
                    console.log('no se pudo restar puntos');
                }
            });

            conn.on('mensajeEnviado', (data: { [key: string]: any }) => {
                let message = data['message'];
                let user = data['user'];
                if(message != '') {
                    ws.emit('mensajeNuevo', { 'message': message ,  'user': user});
                }else{
                    console.log('no se pudo enviar el mensaje');
                }
            });

            conn.on('disconnect', () => {
                console.log('Client disconnected');

                const index = this.jugadores.indexOf(conn.user);
                if (index > -1) {
                    this.jugadores.splice(index, 1);
                }
                
                ws.emit('actualizarJugadores', { 'jugadores': this.jugadores });
            });

            conn.on('pedidoTarjetas', () => {
                console.log("pedido de tarjetas");
                this.wsc.emit('listaTarjetas' , { 'tarjetas': this.tarjetasSeleccionadas });
            });
        });
    }
    
    TARJETAS: tarjeta[] = [

    ];

    

    tarjetasPorTema: tarjeta[] = [];
    tarjetasSeleccionadas: tarjeta[] = [];

    id: number = 0;
    puntos: number = 0;
    votoEnviado: boolean = false; //para mostrar el mensaje de voto enviado
    tarjetaActual: number = 0; //lleva control de la tarjeta actual para el timeout
    cambio: any; //variable para el timeout, para que cambie la tarjeta cada 30 segundos
    tarjetaMasVotada: tarjeta | null = null;
    tema: string = '';
    votosHechos: { [user: string]: boolean } = {}; //para guardar los votos hechos por cada jugador

    async empezarPartida(){
        this.tarjetaActual = 0;
        await actividadSchema.find().then((data: any) => {
            this.TARJETAS = data;
        })
        this.seleccionarTarjetas();
        this.wsc.emit('empezarPartida');
        this.cambiarTarjeta();
        
    }

    sumarPuntos(tarj: tarjeta, user: string) {
        if (this.votosHechos[user] == true) {
            console.log("Ya votaste");
            return;
        }else{
            this.votosHechos[user] = true;
            console.log("voto enviado");
            let index = 0;
            this.TARJETAS.forEach(element => {
                if(element.id === tarj.id){
                    index = this.TARJETAS.indexOf(element);
                }
            });
            this.TARJETAS[index].puntos++;
        }
        
    }

    restarPuntos(tarj: tarjeta, user: string) {
        if (this.votosHechos[user] == true) {
            console.log("Ya votaste");
            return;
        }else{
            this.votosHechos[user] = true;
            console.log("voto enviado");
            let index = 0;
            this.TARJETAS.forEach(element => {
                if(element.id === tarj.id){
                    index = this.TARJETAS.indexOf(element);
                }
            });
            console.log(index);
            this.TARJETAS[index].puntos--;
            console.log(tarj.puntos);
        }
    }

    //Función para cambiar la tarjeta cada 20 segundos
    cambiarTarjeta() {
        this.cambio = setTimeout(() => {
            console.log("TARJETA: ", this.tarjetaActual);
            console.log("TARJETAS SELECCIONADAS: ", this.tarjetasSeleccionadas.length);
            if (this.tarjetaActual < this.tarjetasSeleccionadas.length - 1) {
                this.tarjetaActual++;
                this.votosHechos = {};
                console.log("tarjeta actual: ", this.tarjetaActual);
                this.wsc.emit('cambiarTarjeta', { 'tarjeta': this.tarjetaActual });
            } else {
                console.log("Se acabaron las tarjetas");
                this.calcularTarjetaMasVotada();
                return; //Para no seguir cambiando tarjetas
            }
            this.cambiarTarjeta(); // Llama a cambiarTarjeta() cada 15 segundos
        }, 15000);
    }

    //Funcion para calcular la tarjeta mas votada
    calcularTarjetaMasVotada() {
        let puntajeMasAlto = 0;
        for (let tarjeta of this.TARJETAS) {
            if (tarjeta.puntos > puntajeMasAlto) {
                this.tarjetaMasVotada = tarjeta;
                puntajeMasAlto = tarjeta.puntos;
            }
        }
        console.log("Tarjeta más votada:", this.tarjetaMasVotada);
        if (this.TARJETAS.length === 0) {
            console.log("No hay tarjetas seleccionadas");
        }
        this.wsc.emit('finalizarVotacion', { 'tarjetaMasVotada': this.tarjetaMasVotada });
        for (let tarjeta of this.TARJETAS) {
            tarjeta.puntos = 0;
        }
        return;
    }

    seleccionarTarjetas(){
        

        this.TARJETAS.forEach(element => {
            if(element.tema === this.tema){
                this.tarjetasPorTema.push(element);
            }
        });
        

        this.shuffleArray(this.tarjetasPorTema);
        this.tarjetasSeleccionadas = this.tarjetasPorTema.slice(0, 5);
        return this.tarjetasSeleccionadas;
    }
    
    //algoritmo para elegir tarjetas de forma random
    shuffleArray<T>(array: T[]): T[] {
        const newArray = array.slice(); // Create a copy of the original array to avoid modifying it directly
        for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements at i and j
        }
        return newArray;
    }

}




