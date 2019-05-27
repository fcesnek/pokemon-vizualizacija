function drawAll(data, id, pokemonNum) {
    var marginRadar = {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100
        },
        widthRadar = Math.min(700, window.innerWidth - 10) - marginRadar.left - marginRadar.right,
        heightRadar = Math.min(widthRadar, window.innerHeight - marginRadar.top - marginRadar.bottom - 20);

    d3.select(`#pokemon${pokemonNum}name`).html(data[id - 1]["Name"])
    d3.select(`#pokemon${pokemonNum}Image`).attr("src", `https://www.serebii.net/art/th/${id}.png`)
    pokeData[pokemonNum - 1] = []

    for (key in allowedKeys) {
        pokeData[pokemonNum - 1].push({
            axis: allowedKeys[key],
            value: data[id - 1][allowedKeys[key]]
        })
    }
    var colorRadar = d3.scale.ordinal()
        .range(["#EDC951", "#6fad5e"]);

    var radarChartOptions = {
        w: widthRadar - 100,
        h: heightRadar - 100,
        margin: marginRadar,
        maxValue: 100,
        levels: 5,
        roundStrokes: false,
        color: colorRadar
    };

    console.log(pokeData)
    RadarChart(".radarChart", pokeData, radarChartOptions);
    drawBarChart(pokeData[pokemonNum - 1], allowedKeys, `#pokemon${pokemonNum}data`, pokemonNum)
}

function findPokemonByName(name, data) {
    return data.find(obj => obj.Name == name)["#"];
}
