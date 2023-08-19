class TicketManager {
    constructor() {
      this.eventos = [];
      this.precioBaseDeGanancia = 0.15;
    }
  
    getEventos() {
      return this.eventos;
    }
  
    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) {
      const evento = {
        id: this.eventos.length + 1,
        nombre,
        lugar,
        precio: precio + precio * this.precioBaseDeGanancia,
        capacidad,
        fecha,
        participantes: [],
      };
  
      this.eventos.push(evento);
    }
  
    agregarUsuario(eventoId, usuarioId) {
      const evento = this.eventos.find((e) => e.id === eventoId);
  
      if (!evento) {
        console.log(`El evento con ID ${eventoId} no existe.`);
        return;
      }
  
      if (evento.participantes.includes(usuarioId)) {
        console.log(`El usuario con ID ${usuarioId} ya está registrado en el evento.`);
        return;
      }
  
      evento.participantes.push(usuarioId);
      console.log(`El usuario con ID ${usuarioId} ha sido registrado en el evento.`);
    }
  
    ponerEventoEnGira(eventoId, nuevaLocalidad, nuevaFecha) {
      const eventoExistente = this.eventos.find((e) => e.id === eventoId);
  
      if (!eventoExistente) {
        console.log(`El evento con ID ${eventoId} no existe.`);
        return;
      }
  
      const eventoEnGira = {
        ...eventoExistente,
        id: this.eventos.length + 1,
        lugar: nuevaLocalidad,
        fecha: nuevaFecha,
        participantes: [],
      };
  
      this.eventos.push(eventoEnGira);
      console.log(`El evento con ID ${eventoId} ha sido puesto en gira con nuevo ID ${eventoEnGira.id}.`);
    }
  }
  
  const ticketManager = new TicketManager();
  ticketManager.agregarEvento('Concierto', 'Estadio XYZ', 100, 200, '2023-08-15');
  ticketManager.agregarEvento('Teatro', 'Teatro ABC', 50);
  console.log(ticketManager.getEventos());
  
  ticketManager.agregarUsuario(1, 1001);
  ticketManager.agregarUsuario(1, 1002);
  ticketManager.agregarUsuario(2, 1001);
  ticketManager.agregarUsuario(2, 1003);
  
  ticketManager.ponerEventoEnGira(1, 'Plaza Central', '2023-09-10');
  console.log(ticketManager.getEventos());
  