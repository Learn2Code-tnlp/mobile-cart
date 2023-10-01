// DOM lets developers create interactive websites by allowing the access of web pages.
// In simple terms, the DOM is what allows developers to change what users see by modifying the HTML indirectly by only using scripts, which, in our case, is JavaScript.
// All the elements used in HTML are basically part of the DOM tree structure.
// As you learnt, every component on a web page is part of some element of DOM. Accessing these elements is the first step towards making these perform some functions
//creating a function which finds an element "name" using an api(document.getElementByclassname) provided by browser

function app() {
  //reading a DOM element using javascript
  this.nameInput = document.getElementsByClassName("text-input");
  this.selectInput = document.getElementsByTagName("select");
  this.select = document.getElementsByTagName("select");
  this.listing = document.getElementById("list");

  //   this.nameInput = document.getElementsByClassName("text-input");
  this.checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  //   this.checkboxLabel = document.querySelector(".price-filter label");
  //   document.querySelectorAll('.price-filter input[type="checkbox"]'); //selects ALL matching nodes from the web browser i.e all checkboxs
  //   document.querySelector('.price-filter input[type="checkbox"]'); //selects only first matching element i.e checkbox

  //diff between a queryelector and a tag selector is qsa returns static lists whereas tsa returns live lists
  //tag selectors works only by tag name whereas query selector works for any selector

  //how to select the content inside an element
  //console.log(document.querySelector(".filters h3").textContent);
  //console.log(document.querySelector(".filters h3").innerHTML);

  //chnaing the content
  //document.querySelector(".filters h3").innerHTML = "filter";
  //console.log(document.querySelector(".filters h3").innerHTML);

  //modifying the dom structure by adding new elements to the DOM
  //example - chaing static text of lists to dynamic using backend

  this.items = [
    {
      name: "Apple iPhone 11",
      rom: "128gb",
      ram: "4gb",
      color: "Green",
      price: 49000,
      brand: "iphone",
      imageUrl: "sample-mobile.webp",
    },
    {
      name: "Samsung Galaxy S20 Ultra",
      rom: "128gb",
      ram: "12gb",
      color: "Cosmic gray",
      price: 70000,
      brand: "samsung",
      imageUrl: "sample-mobile.webp",
    },
  ];
  // creating an array to store all filetered information
  this.filters = {};
  this.filteredResult = this.items;
}

app.prototype.render = function () {
  this.filteredResult.forEach((item) => {
    this.listing.innerHTML = ""; // clear out the exisint div contenet before displaying filtered data
    const { name, rom, ram, color, price } = item;
    const template = `             
         <div class="row">
            <div class="mobile-image">
              <img src="images/sample-mobile.webp" />
            </div>
            <div class="mobile-content">
              <h3>${name} (${rom} ROM, ${ram} RAM, ${color})</h3>
              <h3>INR ${price}</h3>
            </div>
          </div>`;
    const div = document.createElement("div");
    div.innerHTML = template;
    console.log(this.listing);
    this.listing.appendChild(div); // adding new element to dom

    // document.querySelector("#listing div").remove(); // to remove element from dom
  });
};

//attaching some events to make the wesite respond to all ser actions like filters
app.prototype.bindEvents = function () {
  this.nameInput[0].addEventListener("input", (event) => {
    console.log(event.target.value); // prints value that user typed
    this.filters.name = event.target.value; // if arrow function is not used, this.filter.name will give undefined as it cannot find filter aray in function/local scope
    this.filterResults();
  });

  this.select[0].addEventListener("change", (event) => {
    console.log(event.target.value);
    this.filters.brand = event.target.value;
    this.filterResults();
  });

  //looping through all checkboxes and attaching event to each checbox
  this.checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => {
      console.log(event.target.value);
      //price filter should be an array
      if (!this.filters.price) {
        this.filters.price = [];
      }
      // whwtever value is clicked , we check what is the index of that valu inside filters
      const index = this.filters.price.indexOf(event.target.value);
      if (index !== -1) {
        // if the filter is already pressent, remove it or cleear it
        this.filters.price.splice(index, 1);
      } else {
        this.filters.price.push(event.target.value);
      }

      this.filterResults();
    });
  });
};

//filtering the data using the filters stored in filter array

app.prototype.filterResults = function () {
  this.listing.innerHTML = "";
  //filter and store results inside filtered results
  //original data is stored inside items and we want to apply filters on that and stored the filteredt data inside filtered result

  //as we want the price filer to work with multiple values and a min and max price range
  const range = {
    //input checkbox 0, min is 0 and max is 10000 rupees
    0: {
      min: 0,
      max: 10000,
    },
    1: {
      min: 10000,
      max: 20000,
    },
    2: {
      min: 20000,
      max: 30000,
    },
    3: {
      min: 30000,
      max: 40000,
    },
    4: {
      min: 40000,
      max: 50000,
    },
    5: {
      min: 50000,
      max: Number.MAX_SAFE_INTEGER,
    },
  };

  console.log(this.filters);

  this.filteredResult = this.items.filter((item) => {
    //even if we uncheck
    let filter = true;
    //filter based on name
    if (
      filter &&
      this.filters.name &&
      !item.name
        .toLocaleLowerCase()
        .includes(this.filters.name.toLocaleLowerCase())
    ) {
      filter = false;
    }
    //filter based on brand
    if (
      filter &&
      this.filters.brand &&
      !item.brand
        .toLocaleLowerCase()
        .includes(this.filters.brand.toLocaleLowerCase())
    ) {
      filter = false;
    }

    //filter based on price
    if (filter && this.filters.price && this.filters.price.length > 0) {
      //filter = false;

      const result = this.filters.price.map((price) => {
        return range[price];
      });

      const filteredPrice = result.filter((eachItem) => {
        return item.price > eachItem.min && item.price < eachItem.max;
      });

      if (filteredPrice.length === 0) {
        filter = false;
      }
      console.log(this.filters.price);
    }

    return filter;
  });
  this.render();
};

const instance = new app();
instance.render();
instance.bindEvents();

//event
// event is any action on a web browser and the outcome is an event handler is called
/// a website which is able to respond to all user actions is called a responsive website

// event capturing
// when an event happpen, event flows from document -> html -> body -> div -> button

// event bubbling
// bottom to top

// in any webpage, both of thse happen but by default, browser will execute event handler when its flowing from bottom to top(bubbling pahse)
// in modern browsers, by default, all event handlers are registered for the bubling phase
// in cases, where both types of event handlers, bubbling and capturing are present. the capturing phase will run first, followed by the bubbling pahase
