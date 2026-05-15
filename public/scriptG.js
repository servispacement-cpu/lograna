

function createCookie(event){
    const cookie = {
        cat: document.getElementById("cat").value,
        Nco : document.getElementById("Ncookie").value,
        desc : document.getElementById("descCookie").value,
        prix : document.getElementById("pCookie").value,
        photo: document.getElementById("canvas").toDataURL("image/jpeg", 0.5),
        affichable: true,
    };
    event.preventDefault();
    post(cookie);
}

function createCookier(event){
    const cookie = {
        cat: document.getElementById("cat").value,
        Nco : document.getElementById("Ncookie").value,
        desc : document.getElementById("descCookie").value,
        prix : document.getElementById("pCookie").value,
        affichable: true,
    };
    event.preventDefault();
    post(cookie);
}

async function post(cookie){
    const invalidNco = (await getCo('https://lograna.onrender.com/cookies')).some(c => c.Nco === cookie.Nco);
    if (invalidNco){alert("Ce nom de cookie existe déjà. Veuillez en saisir un autre."); return;}
    const url = 'https://lograna.onrender.com/cookies';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cookie)
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        if (data){alert("Votre cookie a bien été crée")}
        console.log('Réponse du serveur :', data);
    } catch (error) {
        console.error('Erreur :', error);
    }
}



async function videocam(){
    try{
            const stream = await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:false
        });
        document.getElementById("video").srcObject = stream;
    } catch (error) {
        console.error(error);
    }
    }

videocam();

function photo(){ 
    try {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.style.display = "block";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    video.style.display = "none";
    document.getElementById("labvid").innerHTML = "Voici la photo du cookie :"
}
 catch (error) {
    console.error(error);
}
}


//////////////////////////////////////////////////Masq cookies

async function afficherCookies(){
    const cookies = await getCo('https://lograna.onrender.com/cookies')
    for (let i = 0; i<cookies.length; i++){
        const opt = document.createElement("option");
        opt.textContent = cookies[i].Nco;
        opt.value = cookies[i].Nco
        document.getElementById("selmas").appendChild(opt);
    }
}
afficherCookies();

async function affMasquCookies(){
    const dataCo = await getCo('https://lograna.onrender.com/medCookies')
    for (let i = 0; i<dataCo.length ; i++){
        const bt = document.createElement("button");
        bt.textContent = "Démasquer " + data[i].Nco;
        bt.onclick = demasquerCookie;
        document.getElementById("masq").appendChild(bt)
    }
}

affMasquCookies();


/////requetes

async function masquerCookie(){
    const cookie = document.getElementById("selmas").value;
    const url = `https://lograna.onrender.com/masqucookie/${encodeURIComponent(cookie)}`
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        console.log('Réponse du serveur :', data);
    } catch (error) {
        console.error('Erreur :', error);
    }

}   


async function demasquerCookie(){
    const cookie = document.getElementById("selmas").value;
    const url = `https://lograna.onrender.com/demasqucookie/${encodeURIComponent(cookie)}`
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        console.log('Réponse du serveur :', data);
    } catch (error) {
        console.error('Erreur :', error);
    }
}

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
/////////////////////Res

async function getRes(){
        const url = 'https://lograna.onrender.com/res';
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


async function afficherRes(){
    const res = await getRes();
    const par = document.getElementById("par")
    for (let i =0; i<res.length; i++){
    const nom = document.createElement("h3");
    const adresse = document.createElement("h3");
    const cookies = document.createElement("h3");
    const hr = document.createElement("hr");
    nom.textContent = "Nom du client : " + res[i].nom;
    adresse.textContent = "Adresse de livraison : " + res[i].adresse;
    cookies.textContent = "Contenu de la commande : " + res[i].cookies;
    par.appendChild(nom);
    par.appendChild(adresse);
    par.appendChild(cookies);
    par.appendChild(hr);
    }
}


afficherRes();