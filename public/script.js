async function afficherCookies(){
    //Cookies avec img
    const dataCo = await getCo('https://lograna.onrender.com/cookies');
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
    ///cookkies sans img
    const dataCor = await getCo('https://lograna.onrender.com/cookiesr')
        for(let i = 0; i<dataCor.length; i++){
    const divr = document.createElement("div");
    divr.className = "spe";
    document.getElementById("par").appendChild(div);
    const Ncor = document.createElement("h3");
    const descr = document.createElement("h3");
    const prixr = document.createElement("h3");
    const hr = document.createElement("hr");
    Ncor.textContent = "Nom du cookie : " + dataCor[i].Nco;
    descr.textContent = dataCor[i].desc;
    prixr.textContent = "Ce cookie coûte " + dataCor[i].prix + " €";
    divr.appendChild(Ncor);
    divr.appendChild(descr);
    divr.appendChild(prixr);
    divr.appendChild(hr);
    }
}

afficherCookies();


async function getCo(url){
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