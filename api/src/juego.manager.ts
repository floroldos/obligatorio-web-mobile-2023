// ----- Logica tarjetas ----- //
import { tarjeta } from "./tarjeta";

export class JuegoManager {
    constructor() {
        /* --------------- SOCKET.IO --------------- */
        //Crea un servidor de socket.io
        const io = require('socket.io')(3001, { cors: { origin: '*' } });

        //Event handler para cuando un usuario se conecta
        io.on('connection', (socket: any) => {
            console.log('User connected');

            //Listener de eventos de 'message' de los clientes con broadcast para que a todos les llegue
            socket.on('message', (data: any) => {
                io.emit('message', data);
            });

            socket.on('jugadores', (data: any) => {
                io.emit('actualizarJugadores', data);
            });
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
    mostrarPuntaje: boolean = false; //para mostrar el puntaje si ya pasaron todas las tarjetas
    puntajes: { [tarjetaId: number]: number } = {}; //para guardar los puntajes de cada tarjeta
    tarjetaMasVotada: tarjeta | null = null;
    estadoVotacion: boolean = true;
    
    enviarVoto() {
        this.votoEnviado = true;
    }

    resetVoto() {
        this.votoEnviado = false;
    }

    sumarPuntos(tarj: tarjeta) {
        tarj.puntos++;
        this.puntajes[tarj.id] = tarj.puntos;
    }

    restarPuntos(tarj: tarjeta) {
        tarj.puntos--;
        console.log(tarj.puntos);
    }

    //Función para cambiar la tarjeta cada 20 segundos
    cambiarTarjeta() {
        this.resetVoto();
        this.cambio = setTimeout(() => {
            if (this.tarjetaActual < this.TARJETAS.length - 1) {
                this.tarjetaActual++;
            } else {
                this.finalizarVotacion();
                this.estadoVotacion = false; // Llama a finalizarVotacion al final de las tarjetas
                return; //Para no seguir cambiando tarjetas
            }
            this.cambiarTarjeta(); // Llama a cambiarTarjeta() cada 20 segundos
        }, 20000);
    }

    //Funcion para calcular la tarjeta mas votada
    calcularTarjetaMasVotada() {
        let tarjetaMasVotada: tarjeta | null = null;
        let puntajeMasAlto = 0;
        for (let tarjeta of this.TARJETAS) {
            if (tarjeta.puntos > puntajeMasAlto) {
                tarjetaMasVotada = tarjeta;
                puntajeMasAlto = tarjeta.puntos;
            }
        }
        console.log("Tarjeta más votada:", tarjetaMasVotada);
        if (this.TARJETAS.length === 0) {
            console.log("No hay tarjetas seleccionadas");
        }
        return tarjetaMasVotada;
    }
    //Funcion para finalizar la votacion de tarjetas y mostrar el puntaje
    finalizarVotacion() {
        this.tarjetaMasVotada = this.calcularTarjetaMasVotada();
        this.mostrarPuntaje = true;
    }
    //funcion para traer las tarjetas desde un endpoint del cliente
    traerTarjetas() {
        
    }
}




