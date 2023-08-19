class Contador {
  static cuentaGlobal = 0; 

  constructor(nombre) {
    this.nombre = nombre;
    this.cuentaIndividual = 0;
  }

  getResponsable() {
    return this.nombre;
  }

  contar() {
    this.cuentaIndividual++;
    Contador.cuentaGlobal++; 
  }

  getCuentaIndividual() {
    return this.cuentaIndividual;
  }

  static getCuentaGlobal() {
    return Contador.cuentaGlobal;
  }
}


const contador1 = new Contador('Responsable 1');
const contador2 = new Contador('Responsable 2');

contador1.contar();
contador1.contar();
contador2.contar();

console.log(contador1.getResponsable()); 
console.log(contador1.getCuentaIndividual()); 
console.log(contador2.getCuentaIndividual()); 

console.log(Contador.getCuentaGlobal()); 
