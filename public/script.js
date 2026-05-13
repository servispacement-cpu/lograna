async function afficherCookies(){
    const dataCo = await getCo();
    for(let i = 0; i<dataCo.length; i++){
    const div = document.createElement("div");
    div.className = "spe";
    document.getElementById("par").appendChild(div);
    const Nco = document.createElement("h3");
    const desc = document.createElement("h3");
    const prix = document.createElement("h3");
    const img = document.createElement("img");
    Nco.textContent = "Nom du cookie : " + dataCo[i].Nco;
    desc.textContent = dataCo[i].desc;
    prix.textContent = "Ce cookie coûte " + dataCo[i].prix + " €";
    img.src = dataCo[i].photo
    div.appendChild(Nco);
    div.appendChild(desc);
    div.appendChild(prix);
    div.appendChild(img);
    }
}

afficherCookies();


async function getCo(){
    const url = 'https://lograna.onrender.com/cookies';
        try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        console.log(data);
        return (data);
    } catch (error) {
        console.error('Erreur :', error);
        throw error;
    } 
}