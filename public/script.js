async function afficherCookies(){
    const dataCo = await getCo();
    const cats = [...new Set(dataCo.map(cookies => cookies.cat))];
    console.log(cats);
    for (let r = 0; r<cats.length; r++){
        const div = document.createElement("div");
        const tit = document.createElement("h1");
        div.className = "spe";
        div.id = cats[r];
        tit.textContent = "Pour la catégorie " + cats[r];
        document.getElementById("par").appendChild(div);
        div.appendChild(tit);
    }
    for(let i = 0; i<dataCo.length; i++){
    const Nco = document.createElement("h3");
    const desc = document.createElement("h3");
    const prix = document.createElement("h3");
    const img = document.createElement("img");
    const hr = document.createElement("hr");
    Nco.textContent = "Nom du cookie : " + dataCo[i].Nco;
    desc.textContent = dataCo[i].desc;
    prix.textContent = "Ce cookie coûte " + dataCo[i].prix + " €";
    img.src = dataCo[i].photo
    const idfa = String(dataCo[i].cat);
    const div = document.getElementById(idfa);
    div.appendChild(Nco);
    div.appendChild(desc);
    div.appendChild(prix);
    if (dataCo[i].photo){
    div.appendChild(img);
    }
    div.appendChild(hr);

    const opt = document.createElement("input");
    const lab = document.createElement("label");
    const br = document.createElement("br");
    opt.type = "checkbox";
    opt.name = "cookies"
    opt.value = dataCo[i].Nco
    lab.textContent = dataCo[i].Nco + " de la catégorie " + dataCo[i].cat
    document.getElementById("resco").appendChild(opt);
    document.getElementById("resco").appendChild(lab);
    document.getElementById("resco").appendChild(br);
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


///////////////////// Reserv cookies


async function rescookies(event){
    event.preventDefault();
    const res = {
        nom: document.getElementById("nom").value,
        adresse: document.getElementById("adresse").value,
        cookies: Array.from(document.querySelectorAll('input[name="cookies"]:checked')).map(cb => cb.value),
    }
    const url = 'https://lograna.onrender.com/res';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(res)
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        if(data){alert("Votre commande a été enregistrée ! Nous vous prierons de payer le livreur.")}
        console.log('Réponse du serveur :', data);
    } catch (error) {
        console.error('Erreur :', error);
    }
}