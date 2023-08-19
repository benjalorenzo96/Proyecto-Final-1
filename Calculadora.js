function suma(a, b) {
    return new Promise((resolve, reject) => {
      if (a === 0 || b === 0) {
        reject("Operación innecesaria");
      } else if (a + b < 0) {
        reject("La calculadora sólo debe devolver valores positivos");
      } else {
        resolve(a + b);
      }
    });
  }
  
  function resta(a, b) {
    return new Promise((resolve, reject) => {
      if (a === 0 || b === 0) {
        reject("Operación inválida");
      } else if (a - b < 0) {
        reject("La calculadora sólo puede devolver valores positivos");
      } else {
        resolve(a - b);
      }
    });
  }
  
  function multiplicacion(a, b) {
    return new Promise((resolve, reject) => {
      if (a < 0 || b < 0) {
        reject("La calculadora sólo puede devolver valores positivos");
      } else {
        resolve(a * b);
      }
    });
  }
  
  function division(a, b) {
    return new Promise((resolve, reject) => {
      if (b === 0) {
        reject("No se puede dividir por 0");
      } else {
        resolve(a / b);
      }
    });
  }
  
  async function cálculos() {
    try {
      const resultadoSuma = await suma(5, 10);
      console.log("Suma:", resultadoSuma);
  
      const resultadoResta = await resta(10, 5);
      console.log("Resta:", resultadoResta);
  
      const resultadoMultiplicacion = await multiplicacion(5, 10);
      console.log("Multiplicación:", resultadoMultiplicacion);
  
      const resultadoDivision = await division(10, 2);
      console.log("División:", resultadoDivision);
  
      const resultadoDivisionPorCero = await division(10, 0);
      console.log("Esto no se imprimirá porque la división por cero generará un error.");
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  cálculos();
  