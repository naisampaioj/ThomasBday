const button = document.getElementById("openInvite");
const intro = document.getElementById("intro");
const invite = document.getElementById("invite");
const URL_SCRIPT =
"https://script.google.com/macros/s/AKfycbwwcPIYuFALEQGtH4oL6oyY_aIe7lzUTatFpZ6-_w_vgSvEVzp4ECyx16CglVvN1zW1/exec";

button.addEventListener("click", () => {

    intro.style.display = "none";

    invite.classList.remove("hidden");

    carregarHerois();

    invite.style.opacity = "0";

    setTimeout(() => {

    invite.style.opacity = "1";

}, 50);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
let classeSelecionada = "";

const cards = document.querySelectorAll(".classe-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c =>
            c.classList.remove("selected")
        );

        card.classList.add("selected");

        classeSelecionada =
            card.dataset.classe;

        console.log(
            "Classe escolhida:",
            classeSelecionada
        );

    });

});

const form =
    document.getElementById("rsvpForm");

const listaHerois =
    document.getElementById("listaHerois");

const contadorHerois =
    document.getElementById("contadorHerois");

const mensagemReino =
    document.getElementById("mensagemReino");

let presenca = "";

const btnAceitar =
    document.getElementById("aceitarMissao");

const btnRecusar =
    document.getElementById("recusarMissao");

    const btnRegistrar =
    document.getElementById("btnRegistrar");


btnAceitar.addEventListener(
    "click",
    () => {

        presenca = "Sim";

        btnAceitar.classList.add(
            "selecionado"
        );

        btnRecusar.classList.remove(
            "selecionado"
        );

        btnRegistrar.innerHTML =
            "📜 ENVIAR RESPOSTA AO REINO 📜";

    }
);

btnRecusar.addEventListener(
    "click",
    () => {

        presenca = "Nao";

        btnRecusar.classList.add(
            "selecionado"
        );

        btnAceitar.classList.remove(
            "selecionado"
        );

        btnRegistrar.innerHTML =
            "📜 ENVIAR RESPOSTA AO REINO 📜";

    }
);


form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const nome =
            document.getElementById("nome").value;

        if(!classeSelecionada){

            alert(
                "Escolhei uma classe antes de enviar uma resposta!"
            );

            return;
        }

if(!presenca){

    alert(
        "Informai aos escribas reais se aceitarei ou não a missão!"
    );

    return;
}


if(presenca === "Nao"){

    alert(
        "📜 Os escribas reais lamentam vossa ausência, mas compreenderão as circunstâncias de vossa jornada."
    );

    form.reset();

    

    return;
}


if(presenca === "Sim"){

    const titulo =
        getTitulo(classeSelecionada);

    try{

await fetch(URL_SCRIPT, {

    method:"POST",

    body:JSON.stringify({

        nome:nome,
        classe:classeSelecionada,
        titulo:titulo,
        presenca:presenca

    })

});

    }catch(error){

        console.error(error);

        alert(
            "⚠️ Os corvos reais encontraram dificuldades ao registrar vossa resposta."
        );

        return;
    }

    const heroi =
        document.createElement("div");

    heroi.classList.add("heroi-card");

    heroi.innerHTML = `
        <strong>
            ${getEmojiClasse(classeSelecionada)}
            ${nome}
        </strong>
        <br>
        ${titulo}
    `;

    listaHerois.appendChild(heroi);

    atualizarContador();

alert(
    "⚜️ MISSÃO ACEITA! ⚜️\n\n" +
    nome +
    ", vossa presença foi registrada nos anais do Reino.\n\n" +
    "Os corvos reais já levaram a notícia ao Castelo de Thomas. 🐦‍"
);

}

atualizarContador();

form.reset();
setTimeout(() => {

    mensagemReino.classList.add("hidden");

}, 6000);

classeSelecionada = "";
presenca = "";

cards.forEach(card =>
    card.classList.remove("selected")
);

btnAceitar.classList.remove(
    "selecionado"
);

btnRecusar.classList.remove(
    "selecionado"
);

btnRegistrar.innerHTML =
    "⚜️ REGISTRAR DECISÃO ⚜️";

});


function atualizarContador(){

    const total =
        listaHerois.children.length;

    if(total === 0){

        contadorHerois.innerHTML =
            "⚜️ Nenhum aventureiro respondeu ao chamado ainda ⚜️";

    }
    else if(total === 1){

        contadorHerois.innerHTML =
            "⚜️ 1 aventureiro já aceitou a missão ⚜️";

    }
    else{

        contadorHerois.innerHTML =
            `⚜️ ${total} heróis atenderam ao chamado do Reino ⚜️`;

    }

}

function getEmojiClasse(classe){

    const mapa = {

        Cavaleiro:"⚔️",

        Mago:"🧙",

        Arqueiro:"🏹",

        Bardo:"🎵",

        Taverneiro:"🍺",

        Nobre:"👑"

    };

    return mapa[classe];
}

function getTitulo(classeSelecionada){

    const titulos = {

        Cavaleiro: "Guardião do Reino",
        Mago: "Discípulo Arcano",
        Arqueiro: "Vigia das Fronteiras",
        Bardo: "Voz das Tavernas",
        Taverneiro: "Mestre das Canecas",
        Nobre: "Membro da Corte Real"

    };

    return titulos[classeSelecionada];

}

async function carregarHerois(){

    try{

        const resposta =
            await fetch(URL_SCRIPT);

        const dados =
            await resposta.json();

        listaHerois.innerHTML = "";

        dados.forEach(item => {

            const nome = item[0];
            const classe = item[1];
            const titulo = item[2];
            const presenca = item[3];

            if(presenca !== "Sim"){
                return;
            }

            const heroi =
                document.createElement("div");

            heroi.classList.add("heroi-card");

            heroi.innerHTML = `
                <strong>
                    ${getEmojiClasse(classe)}
                    ${nome}
                </strong>
                <br>
                ${titulo}
            `;

            listaHerois.appendChild(heroi);

        });

        atualizarContador();

    }catch(error){

        console.error(
            "Erro ao carregar heróis:",
            error
        );

    }

}



}); // fecha button.addEventListener

