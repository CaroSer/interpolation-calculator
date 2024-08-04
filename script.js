function Secante() {
    const formula = document.getElementById("formula_secante").value;
    let x0 = parseFloat(document.getElementById("x0_secante").value);
    let x1 = parseFloat(document.getElementById("x1_secante").value);
    const error_total = parseFloat(document.getElementById("error_total_secante").value);
    let iteraciones = 0;
    const iteraciones_maximas = 1000;
    let error_calculado = 100;
    let x2;

    const f = (x) => {
        return math.evaluate(formula, { x: x });
    };

    while (error_calculado > error_total && iteraciones < iteraciones_maximas) {
        const fx0 = f(x0);
        const fx1 = f(x1);

        if (fx1 - fx0 === 0) {
            alert("Error: División por cero en la fórmula.");
            return;
        }

        x2 = x1 - ((fx1 * (x1 - x0)) / (fx1 - fx0));
        error_calculado = Math.abs((x2 - x1) / x2) * 100;

        x0 = x1;
        x1 = x2;
        iteraciones++;
    }

    document.getElementById("xr_secante").value = x2;
    document.getElementById("iteraciones_realizadas_secante").value = iteraciones;
}

function Biseccion() {
    var formula = document.getElementById("formula_biseccion").value;
    var x0 = parseFloat(document.getElementById("x0_biseccion").value);
    var x1 = parseFloat(document.getElementById("x1_biseccion").value);
    var error_total = parseFloat(document.getElementById("error_total_biseccion").value);

    var error_relativo = 100;
    var xr_anterior = 0;
    var iteracion = 0;
    var valores_errores = [];
    var xr, f_xr, f_x0, f_x1;

    while (error_relativo > error_total) {
        iteracion++;
        xr = (x0 + x1) / 2;
        f_xr = eval(formula.replace(/x/g, xr));
        f_x0 = eval(formula.replace(/x/g, x0));
        f_x1 = eval(formula.replace(/x/g, x1));

        if ((f_x0 * f_xr) < 0) {
            x1 = xr;
        } else {
            x0 = xr;
        }

        if (iteracion > 1) {
            error_relativo = Math.abs((xr - xr_anterior) / xr) * 100;
        }

        xr_anterior = xr;
        valores_errores.push(error_relativo.toFixed(4));
    }

    document.getElementById("xr_biseccion").value = xr.toFixed(4);
    document.getElementById("error_relativo_biseccion").value = error_relativo.toFixed(4);
    document.getElementById("fxr_biseccion").value = f_xr.toFixed(4);
}
function Newton_Raphson() {
    let x0 = parseFloat(document.getElementById("x0_newton").value);
    let formula = document.getElementById("formula_newton").value;
    let error_total = parseFloat(document.getElementById("error_total_newton").value);
    let xr = document.getElementById("xr_newton");
    let error_aproximado = document.getElementById("error_aproximado_newton");

    let x1, fx0, fx0D, error_aproximado_calculado;

    try {
        let node = math.parse(formula);
        let code = node.compile();

        let derivativeNode = math.derivative(node, 'x');
        let derivativeCode = derivativeNode.compile();


        let iteration = 0;

        do {
            fx0 = code.evaluate({ x: x0 });
            fx0D = derivativeCode.evaluate({ x: x0 });

            if (fx0D === 0) {
                throw new Error("La derivada es cero. No se puede continuar con el método Newton-Raphson.");
            }

            x1 = x0 - (fx0 / fx0D);
            error_aproximado_calculado = Math.abs((x1 - x0) / x1);


            x0 = x1;
            iteration++;
        } while (error_aproximado_calculado > error_total && iteration < 100); 

        xr.value = x1;
        error_aproximado.value = error_aproximado_calculado;
    } catch (error) {
        console.log("An error occurred during calculation: " + error.message);
    }
}
