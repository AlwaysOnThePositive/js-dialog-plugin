const fruits = [
  {
    id: 1,
    title: "Oranges",
    price: 20,
    img:
      "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?ixlib=rb-1.2.1&auto=format&fit=crop&w=3024&q=80",
  },
  {
    id: 2,
    title: "Banana",
    price: 30,
    img:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "Mango",
    price: 40,
    img:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
];

const toHTML = (fruit) => `
  <div class="col">
    <div class="card" style="width: 18rem;">
      <img src="${
        fruit.img || ""
      }" style='height: 300px; object-fit: cover' class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn='price' data-id="${
          fruit.id
        }">Show price</a>
        <a href="#" class="btn btn-danger" data-btn='delete' data-id="${
          fruit.id
        }">Delete</a>
      </div>
    </div>
  </div>
`;

function render() {
  const html = fruits.map(toHTML).join("");
  document.querySelector("#fruits").innerHTML = html;
}

render();

const modal = $.modal({
  title: "Price modal",
  closable: true,
  content: `
    <h4>Modal is working</h4>
    <p>Lorem ipsum dolor sit amet</p>
  `,
  width: "400px",
  footerButtons: [
    {
      text: "Ok",
      type: "primary",
      handler() {
        modal.close();
      },
    },
    {
      text: "Cancel",
      type: "danger",
      handler() {
        modal.close();
      },
    },
  ],
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  const type = event.target.dataset.btn;
  const id = event.target.dataset.id;
  const fruit = fruits.find((f) => f.id === +id);
  const index = fruits.findIndex((f) => f.id === +id);

  if (type === "price") {
    modal.setContent(`
      <p>Price for ${fruit.title}: <strong>${fruit.price} rub</strong></p>
    `);
    modal.open();
  } else if (type === "delete") {
    $.confirm({
      title: "Are you sure?",
      content: `<p>You want to delete ${fruit.title}</p>`,
    })
      .then(() => {
        fruits.splice(index, 1);
        render();
      })
      .catch(() => {
        console.log("cancel");
      });
  }
});
