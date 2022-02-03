const networkGraph = require("../data/graph.json");

export const loadCities = () => {
    const cities = []

    networkGraph.forEach(obj => {
        if(obj.router != null){
            cities.push(obj.name)
        }
    })
    return cities.sort()
}