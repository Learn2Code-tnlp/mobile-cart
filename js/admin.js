// store form elements
function admin() {
  this.form = document.getElementById("form");
}

//add evelt handlert for submit button
admin.prototype.bindEvents = function () {
  this.form.addEventListener("submit", (event) => {
    event.preventDefault(); // not perform action according to browser defaults ,only do if user clicks on submit button
    //using form data api
    const formData = new FormData(event.target);
    const formMap = {};
    for ([key, value] of formData.entries()) {
      console.log(key, value);
      formMap[key] = value;
    }

    if (localStorage.getItem("items")) {
      // if already some thing exists in localstorage, convert that storage string back to json object and then append new array to existin array
      const items = JSON.parse(localStorage.getItem("items")).concat([formMap]);
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      //converting formmap(object) to a string using json,stringy and storing formmap as an arrya
      localStorage.setItem("items", JSON.stringify([formMap]));
    }
    // after submission, we do reload
    window.location.reload();
  });
};

const adminInstance = new admin();
adminInstance.bindEvents();

// in this app we dont use db to store data yet but we store data in localstorage and session storage
// The setItem method is used to save data in the local storage, e.g.,

// localStorage.setItem('username', ‘ABC’)
// Here, the username ‘ABC’ is stored in the key ‘username’.

// The getItem method is used to extract the saved data from the local storage, e.g.,

// localStorage.get('username')

// The removeItem method is used to delete the data from the local storage, e.g.,

// localStorage.removeItem('username')
// This would drop the data associated with the key ‘username’.

// The clear method is used to delete all the data from local storage, e.g.,

// localStorage.clear()

// You also learnt that the data is stored in a string format in the local storage. Therefore, you cannot directly make store data from the code to the local storage or use it.
// Here, two very important methods help us:

// JSON.stringify()
// JSON.parse()
// When you want to store the object data into local storage, you need to convert it into a string form, which is used by the local storage by using JSON.stringify().
// Similarly, when you want to use the data stored in local storage, you need to convert it back to the object format by using JSON.parse().
// With this, you can now communicate with the storage internally and manipulate the data according to your need.

///---------------------third party libraries
// jquery is thirdparty js library which makes dom selection easier
