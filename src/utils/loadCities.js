const networkGraph = require("../data/graph.json");

export const loadCities = () => {
  const cities = [];

  networkGraph.forEach((obj) => {
    if (obj.router != null) {
      cities.push({
        id: obj.id,
        name: `${networkGraph[obj.router].name} - ${obj.name}`,
      });
    }
  });
  return cities.sort();
};
