

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

async function affMasquCookies(url, par, d){
    const cookies = await getCo(url)
    if (d){
        for (let i = 0 ; i<cookies.length ; i++){
            const opt = document.createElement("button")
            opt.textContent = "Démasquer " + cookies[i].Nco;
            opt.value = cookies[i].Nco
            opt.id = cookies[i].Nco;
            opt.onclick = function(event){masquerCookie('https://lograna.onrender.com/demasqucookie' , opt.id);   
                event.preventDefault();};
            document.getElementById(par).appendChild(opt);
        }
    } else {
        for (let i = 0; i<cookies.length ; i++){
            const opt = document.createElement("option");
            opt.textContent = cookies[i].Nco;
            opt.value = cookies[i].Nco
            document.getElementById(par).appendChild(opt);
        }
    }
}

affMasquCookies('https://lograna.onrender.com/medCookies', "seldmas", true);
affMasquCookies('https://lograna.onrender.com/Cookies', "selmas");

/////requetes

document.getElementById("masqc").onclick = function(){masquerCookie('https://lograna.onrender.com/masqucookie' , "selmas");};


async function masquerCookie(url, sel){
    const cookie = document.getElementById(sel).value;
    const furl = `${url}/${encodeURIComponent(cookie)}`;
    try {
        const response = await fetch(furl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        if (data){
            if (sel === "selmas"){
                alert("Votre cookie a bien été masqué. Veuillez raffraichir la page.")
            } else {
                alert("Votre cookie a bien été démasqué. Veuillez raffraichir la page.")
            }
        } 
        console.log('Réponse du serveur :', data);
    } catch (error) {
        console.error('Erreur :', error);
    }

}   

//pour les masqu/verif Nco
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
    const bt = document.createElement("button");
    const hr = document.createElement("hr");
    nom.textContent = "Nom du client : " + res[i].nom;
    adresse.textContent = "Adresse de livraison : " + res[i].adresse;
    cookies.textContent = "Contenu de la commande : " + res[i].cookies;
    bt.textContent = "Livraison terminée";
    bt.onclick = function(){supres(res[i]._id);};
    par.appendChild(nom);
    par.appendChild(adresse);
    par.appendChild(cookies);
    par.appendChild(bt);
    par.appendChild(hr);
    }
}
afficherRes();


async function supres(resid){
    const url = `https://lograna.onrender.com/supres/${resid}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        if (data){alert("La reservation a été livrée, par conséquent elle est suprimmée.")}
        console.log('Reservation suprimée :', data);
    } catch (error) {
        console.error('Erreur :', error);
    }
}