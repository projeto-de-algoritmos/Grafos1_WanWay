const networkGraph = require("../data/graph.json");

const BFS = (startLAN, endLAN) => {
  const queue = [];
  const visited = [];
  const startNODE = networkGraph[startLAN].router;

  visited.push(startNODE);

  queue.push(networkGraph[startNODE]);

  while (queue.length > 0) {
    let visiting = queue.shift();

    console.log(`Visitei ${networkGraph[visiting.id].name}`)
    if (visiting.connectedLAN.find((el) => endLAN == el) != undefined) {
      console.log(`Cheguei em ${networkGraph[endLAN].name}`)
      break;
    }

    visiting.connectedWAN.forEach((indexNeighbor) => {
      if (visited.find((el) => el == indexNeighbor) == undefined) {
        visited.push(indexNeighbor);
        queue.push(networkGraph[indexNeighbor]);

      }
    });
  }
};

BFS(25, 14);
