async function createCookie(event){
    const cookie = {
        Nco : document.getElementById("Ncookie").value,
        desc : document.getElementById("descCookie").value,
        prix : document.getElementById("pCookie").value,
        photo: document.getElementById("canvas").toDataURL("image/jpeg", 0.2),
    };
    event.preventDefault();
    console.log(cookie.photo.length);
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
        if (video.readyState < 2) {
      console.warn("Vidéo pas encore prête");
      return;
    }
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