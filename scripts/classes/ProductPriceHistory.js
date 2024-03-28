import { fetchData } from "../helpers/fetch";

export class ProductPriceHistory {
  constructor() {
    this.data;
  }

  loadHistory = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("q");
    const form = new FormData();
    form.append(
      "data",
      JSON.stringify({
        function: "get_price_history",
        id,
      })
    );
    this.data = await fetchData("./includes/ajax.inc.php", form);
    this.structureDataByStore();
  };

  structureDataByStore = () => {
    let stores = [];

    for (const priceRow of this.data) {
      const results = stores.filter((store) => store.name == priceRow.name);
      if (results.length == 1) {
        stores = stores.map((store) =>
          store.name === priceRow.name
            ? { name: store.name, prices: [...store.prices, priceRow.price] }
            : store
        );
      } else {
        stores.push({ name: priceRow.name, prices: [priceRow.price] });
      }
    }

    const colors = [
      "#e6194B", // Red
      "#3cb44b", // Green
      "#ffe119", // Yellow
      "#4363d8", // Blue
      "#f58231", // Orange
      "#911eb4", // Purple
      "#42d4f4", // Cyan
      "#f032e6", // Magenta
      "#bfef45", // Lime
      "#fabed4", // Pink
    ];

    let datasets = [];
    let i = 0;
    for (const store of stores) {
      datasets.push({
        label: "Price history for " + store.name,
        data: store.prices.map((row) => row),
        fill: false,
        borderColor: colors[i],
        tension: 0.1,
      });
      i++;
    }

    new Chart(document.getElementById("priceChart"), {
      type: "line",
      data: {
        labels: this.data.map((row) => row.date),
        datasets,
      },
    });
  };
}
