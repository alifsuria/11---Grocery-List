(function() {
  const inputBox = document.querySelector(".input-box");
  const itemForm = document.querySelector(".item-form");
  const feedback = document.querySelector(".validate");
  const listItem = document.querySelector(".list-item");
  const clearAll = document.querySelector(".clear-button");
  let groceryList = [];

  //feedback when inputbox has a value
  const validateHasValue = function() {
    feedback.style.background = "lightgreen";
    feedback.innerHTML = `Item has been added to the list`;
    feedback.classList.add("show");
    setTimeout(function() {
      feedback.classList.remove("show");
    }, 3000);
  };

  //feedback when inputbox dont have value
  const validateNoValue = function() {
    feedback.style.background = "lightcoral";
    feedback.innerHTML = `Can not add empty value`;
    feedback.classList.add("show");
    setTimeout(function() {
      feedback.classList.remove("show");
    }, 3000);
  };

//delete item
  const trashIcon = function(itemName) {
    const items = document.querySelectorAll(".item");

    items.forEach(function(item) {
      if (item.querySelector(".text").textContent === itemName) {
        item.querySelector(".delete-button").addEventListener("click", function() {
        listItem.removeChild(item);

        const getLocalStorage =JSON.parse(localStorage.getItem("groceryList"))
          for(let i = 0 ;i<getLocalStorage.length;i++){
            var val =localStorage[i];

            var newStorage =getLocalStorage.filter(function(r){
              return r !== itemName
            })
            localStorage.setItem("groceryList",JSON.stringify(newStorage))
          }
          groceryList = groceryList.filter(function(item){
            return item !== itemName
          })
          });
      }
    });
  };

  const getList = function(groceryList) {
    listItem.innerHTML = "";

    groceryList.forEach(function(item) {
      listItem.insertAdjacentHTML(
        "beforeend",
        `<div class="item p-2 my-3 clearfix">
      <h5 class="text d-inline-block">${item}</h5>
      <span class="delete-button float-right"><i class="fas fa-trash"></i></span>
      </div>`
      );

      trashIcon(item);
    });
  };

  const getLocalStorage = function() {
    const storage = localStorage.getItem("groceryList");
    if (storage === "undefined" || storage === null) {
      groceryList = [];
    } else {
      groceryList = JSON.parse(storage);
      getList(groceryList);
    }
  };

  getLocalStorage();

  const setLocalStorage = function(groceryList) {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  };

  clearAll.addEventListener("click", function() {
    alert("click");
    groceryList = [];
    localStorage.clear();
    getList(groceryList);
  });

  itemForm.addEventListener("submit", function(e) {
    alert("click");
    e.preventDefault();
    const itemName = inputBox.value;
    if ((itemName === 0, itemName === "")) {
      validateNoValue();
    } else {
      validateHasValue();
      groceryList.push(itemName);
      setLocalStorage(groceryList);
      getLocalStorage(groceryList);
      getList(groceryList);
      console.log(groceryList);
    }

    inputBox.value = "";
  });
})();
