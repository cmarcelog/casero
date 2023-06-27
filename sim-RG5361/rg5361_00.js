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

// const btnCalcular = document.querySelector(".calcular");
openModal.addEventListener("click", (e) => {
    e.preventDefault();
    let tasa = Number(document.getElementById("tasa").value);
    let consolida = Number(document.getElementById("consolida").value);
    if (tasa != 0 && consolida != 0) {
        let cc = calculoCuota(consolida, tasa, contribuyente);

        mParagraph.innerHTML = `De acuerdo a los datos ingresados puede acceder a<br>${cc[1]} cuotas de $ ${cc[0]}, aproximadamente.`; // le doy el contenido a p
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

function calculoCuota(d, i, tc) {
    let c = 0;
    let tf = 0;
    let qc = 0;
    let pot = 0;
    if (
        tc == "tc-1i" ||
        tc == "tc-2i" ||
        tc == "tc-5i" ||
        tc == "tc-1iv" ||
        tc == "tc-2iv" ||
        tc == "tc-5iv"
    ) {
        qc = 84;
        tf = (i * 0.7) / 100;
    } else if (tc == "tc-3i" || tc == "tc-3iv") {
        qc = 48;
        tf = (i * 0.9) / 100;
    } else if (
        tc == "tc-4i" ||
        tc == "tc-6i" ||
        tc == "tc-4iv" ||
        tc == "tc-6iv"
    ) {
        qc = 36;
        tf = (i * 1) / 100;
    } else if (tc == "tc-1ii" || tc == "tc-2ii" || tc == "tc-5ii") {
        qc = 36;
        tf = (i * 0.7) / 100;
    } else if (tc == "tc-3ii") {
        qc = 24;
        tf = (i * 0.9) / 100;
    } else if (tc == "tc-4ii" || tc == "tc-6ii") {
        qc = 18;
        tf = (i * 1) / 100;
    } else if (tc == "tc-1iii" || tc == "tc-2iii" || tc == "tc-5iii") {
        qc = 12;
        tf = (i * 0.7) / 100;
    } else if (tc == "tc-3iii") {
        qc = 6;
        tf = (i * 0.9) / 100;
    } else if (tc == "tc-4iii" || tc == "tc-6iii") {
        qc = 3;
        tf = (i * 1) / 100;
    }

    pot = (1 + tf) ** qc;
    c = (d * pot * tf) / (pot - 1);
    while (c < 2000 && qc > 1) {
        --qc;
        pot = (1 + tf) ** qc;
        c = (d * pot * tf) / (pot - 1);
    }

    return [c.toFixed(2), qc];
}
