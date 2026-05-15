

function createCookie(event){
    const cookie = {
        cat: document.getElementById("cat").value,
        Nco : document.getElementById("Ncookie").value,
        desc : document.getElementById("descCookie").value,
        prix : document.getElementById("pCookie").value,
        photo: document.getElementById("canvas").toDataURL("image/jpeg", 0.5),
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
    };
    event.preventDefault();
    post(cookie);
}

async function post(cookie){
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
    const cookiesc = await getCo('https://lograna.onrender.com/cookies');
    const cookiesr = await getCo('https://lograna.onrender.com/cookiesr');
    const cookies = [...cookiesc, ...cookiesr];
    for (let i = 0; i<cookies.length; i++){
        const opt = document.createElement("option");
        opt.textContent = cookies[i].Nco;
        opt.value = cookies[i].Nco
        document.getElementById("selmas").appendChild(opt);
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

afficherCookies();



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