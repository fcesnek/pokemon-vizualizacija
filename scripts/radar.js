// Funkcija za crtanje stupčastog grafa, ispis imena Pokemona, prikaz slike Pokemona i crtanje radarskog grafa
// Parametri: skup podataka o Pokemonima, ID Pokemona koji se vizualizira, te pokemonNum (označava poziciju na
// stranici, ako je lijevo, onda je 1, ako je desno onda je 2)
function drawAll(data, id, pokemonNum) {
    // margine, visina i širina radara
    var marginRadar = {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100
    },
        widthRadar = Math.min(700, window.innerWidth - 10) - marginRadar.left - marginRadar.right,
        heightRadar = Math.min(widthRadar, window.innerHeight - marginRadar.top - marginRadar.bottom - 20);

    // Prikaz imena i slike pokemona
    d3.select(`#pokemon${pokemonNum}name`).html(data[id - 1]["Name"])
    d3.select(`#pokemon${pokemonNum}Image`).attr("src", `https://www.serebii.net/art/th/${id}.png`)
    // Inicijalizacija polja podataka za Pokemona koji se vizualizira
    pokeData[pokemonNum - 1] = []

    // Ako se prvo odabire crtanje Pokemona na desnoj strani (drugi Pokemon), podaci
    // za prvog Pokemona se postavljaju na 0 zbog načina na koji je biblioteka napisana
    if (pokemonNum == 2 && pokeData[0].length == 0) {
        for (key in allowedKeys) {
            pokeData[0].push({
                axis: allowedKeys[key],
                value: 0
            })
        }
    }
    // Formatiranje podataka kako bi se mogla koristiti RadarChart biblioteka
    for (key in allowedKeys) {
        pokeData[pokemonNum - 1].push({
            axis: allowedKeys[key],
            value: data[id - 1][allowedKeys[key]]
        })
    }
    
    // Definiranje boja za radarski graf
    var colorRadar = d3.scale.ordinal()
        .range(["#EDC951", "#6FAD5E"]);

    // Definiranje opcija za radarski graf
    var radarChartOptions = {
        w: widthRadar - 100,
        h: heightRadar - 100,
        margin: marginRadar,
        maxValue: 120,
        levels: 6,
        roundStrokes: false,
        color: colorRadar
    };

    // Crtanje radarskog grafa i stupčastog grafa
    // IZVORI:
    // http://bl.ocks.org/nbremer/21746a9668ffdf6d8242
    // https://gist.github.com/nbremer/21746a9668ffdf6d8242
    // https://www.visualcinnamon.com/2015/10/different-look-d3-radar-chart.html
    RadarChart(".radarChart", pokeData, radarChartOptions);
    drawBarChart(pokeData[pokemonNum - 1], allowedKeys, `#pokemon${pokemonNum}data`, pokemonNum)
}


//Funkcija za pronalaženje ID-ja Pokemona u ovisnosti o predanom imenu
function findPokemonByName(name, data) {
    return data.find(obj => obj.Name == name)["#"];
}
