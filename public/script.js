async function afficherCookies(){
    const dataCo = await getCo();
    for(let i = 0; i>dataCo.length; i++){
    const div = document.createElement("div");
    div.id = "div";
    document.getElementById("par").appendChild(div);
    const Nco = document.createElement("h3");
    const desc = document.createElement("h3");
    const prix = document.createElement("h3");
    Nco.textContent = dataCo.Nco;
    desc.textContent = dataCo.desc;
    prix.textContent = dataCo.prix;
    div.appendChild(Nco);
    }
}

afficherCookies();


async function getCo(){
    const url = 'https://flygana.onrender.com/cookies';
        try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        return (data);
    } catch (error) {
        console.error('Erreur :', error);
        throw error;
    } 
}