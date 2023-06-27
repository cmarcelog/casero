let contribuyente = "";
document.getElementById("btnCalcular").onclick = function () {
    let tRadios = document.getElementsByName("t-cont");
    let pRadios = document.getElementsByName("perfil");
    for (let radioT of tRadios) {
        if (radioT.checked) {
            contribuyente = radioT.value;
        }
    }
    for (let radioP of pRadios) {
        if (radioP.checked) {
            contribuyente += radioP.value;
        }
    }
};

const openModal = document.querySelector(".calcular");
const modall = document.querySelector(".modall");
const closeModal = document.querySelector(".modall__close");
const mParagraph = document.querySelector(".modall_paragraph");
openModal.addEventListener("click", (e) => {
    e.preventDefault();
    let tasa = Number(document.getElementById("tasa").value);
    let consolida = Number(document.getElementById("consolida").value);
    if (tasa != 0 && consolida != 0) {
        let cc = calculoCuota(consolida, tasa, contribuyente);
        mParagraph.innerHTML = `De acuerdo a los datos ingresados puede acceder a<br>Un pago a cuenta de $ ${cc[0]} mas ${cc[2]} cuotas de $ ${cc[1]}, aproximadamente.`;
        modall.classList.add("modall--show");
    } else {
        contribuyente = "";
        mParagraph.innerHTML = `CON LOS DATOS INGRESADOS NO PUDIMOS CALCULAR SU PLAN`;
        modall.classList.add("modall--show");
    }
});
closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modall.classList.remove("modall--show");
});

function calculoCuota(mc, i, tc) {
    let c = 0;
    let pac = 0;
    let d = 0;
    let tf = 0;
    let qc = 0;
    let pot = 0;
    pac = mc * 0.03;
    tf = (i * 1) / 100;
    d = mc - pac;
    qc = 36;
    pot = (1 + tf) ** qc;
    c = (d * pot * tf) / (pot - 1);
    if (pac > 0) {
        if (mc >= 2000) {
            if (pac <= 2000) {
                pac = 2000;
                d = mc - pac;
            } else {
                d = mc - pac;
            }
        } else {
            pac = mc;
            d = mc - pac;
        }
    }
    pot = (1 + tf) ** qc;
    c = (d * pot * tf) / (pot - 1);
    while (c < 2000 && qc > 1) {
        --qc;
        pot = (1 + tf) ** qc;
        c = (d * pot * tf) / (pot - 1);
    }
    return [pac.toFixed(2), c.toFixed(2), qc];
}
