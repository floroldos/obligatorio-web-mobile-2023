// ----- Logica tarjetas ----- //
import { tarjeta } from "./tarjeta";

export class JuegoManager {
    jugadores: any[];
    
    constructor(socket: any) {
        this.jugadores = [];

        this.webSocketConn(socket);
    }

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
                        console.log(this.jugadores);
                    }
                    ws.emit('actualizarJugadores', { 'jugadores': this.jugadores });
                }else{
                    console.log('no se pudo agregar el jugador');
                }
            });

            conn.on('empezar', (data: { [key: string]: any }) => {
                console.log('empezar');
                ws.emit('empezarPartida');
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

            /* conn.on('desconectar', (data: { [key: string]: any }) => {
                let user = data['user'];
                if(user != '') {
                    if(this.jugadores.includes(user)) {
                        console.log('jugador desconectado: ' + user);
                        this.jugadores.splice(this.jugadores.indexOf(user), 1);
                        console.log(this.jugadores);
                    }
                    ws.emit('actualizarJugadores', { 'jugadores': this.jugadores });
                }else{
                    console.log('no se pudo desconectar el jugador');
                }
            });
 */
            
            /* const enviarPing = () => {
                // Enviar Ping al cliente
                ws.emit('ping');
                console.log('Enviando Ping al cliente');
                // Establecer un temporizador para recibir Pong del cliente
                ws.temporizadorPong = setTimeout(() => {
                    console.log('Cliente no respondió al Ping');
                    // Cerrar la conexión con el cliente
                    ws.terminate();
                }, 4000);
            };

            enviarPing();

            setInterval(enviarPing, 5000);

            ws.on('pong', () => {
                console.log('Cliente respondió al Ping');
                // Limpiar el temporizador si se recibe un Pong
                clearTimeout(ws.temporizadorPong);
            }); */



        });
    }
    
    TARJETAS: tarjeta[] = [
        {
            id: 1,
            nombre: 'miamsi',
            descripcion: 'aaa',
            imagen: 'assets/img.png',
            puntos: 0,
            tema: 'el pepe'
        },
        {
            id: 1,
            nombre: 'pepe',
            descripcion: 'asdasdasd',
            imagen: 'assets/img.png',
            puntos: 0,
            tema: 'el pepe'
        }

    ];

    tarjetasPorTema: tarjeta[] = [];
    tarjetasSeleccionadas: tarjeta[] = [];

    id: number = 0;
    puntos: number = 0;
    votoEnviado: boolean = false; //para mostrar el mensaje de voto enviado
    tarjetaActual: number = 0; //lleva control de la tarjeta actual para el timeout
    cambio: any; //variable para el timeout, para que cambie la tarjeta cada 30 segundos
    tarjetaMasVotada: tarjeta | null = null;
    votosHechos: { [user: string]: boolean } = {}; //para guardar los votos hechos por cada jugador
    
    empezarPartida(){
        this.traerTarjetas();
        this.shuffleArray(this.TARJETAS);
        this.cambiarTarjeta();
    }

    sumarPuntos(tarj: tarjeta, user: string) {
        if (this.votosHechos[user] == true) {
            console.log("Ya votaste");
            return;
        }else{
            this.votosHechos[user] = true;
            console.log("voto enviado");
            let index = this.TARJETAS.findIndex(obj => obj.id === tarj.id);
            this.TARJETAS[index].puntos++;
            console.log(tarj.puntos);
        }
        
    }

    restarPuntos(tarj: tarjeta, user: string) {
        if (this.votosHechos[user] == true) {
            console.log("Ya votaste");
            return;
        }else{
            this.votosHechos[user] = true;
            console.log("voto enviado");
            let index = this.TARJETAS.findIndex(obj => obj.id === tarj.id);
            this.TARJETAS[index].puntos--;
            console.log(tarj.puntos);
        }
    }

    //Función para cambiar la tarjeta cada 20 segundos
    cambiarTarjeta() {
        this.cambio = setTimeout(() => {
            if (this.tarjetaActual < this.TARJETAS.length - 1) {
                this.tarjetaActual++;
                this.votosHechos = {};
                this.wsc.emit('cambiarTarjeta', { 'tarjeta': this.tarjetaActual });
            } else {
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
        return;
    }

    //funcion para traer las tarjetas desde un endpoint del cliente
    traerTarjetas() {
        
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




