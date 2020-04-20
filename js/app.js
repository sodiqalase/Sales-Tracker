const showYear = (() => {
  const span = document.querySelector('.year');
  const year = new Date().getFullYear();
  span.textContent = year
})();


// storage design pattern
const Storage = (() => {
  return {
    clearAllItems: () => {
      let keepSt = JSON.parse(localStorage.getItem('keepSt'));
      keepSt.length = 0;
      localStorage.setItem('keepSt', JSON.stringify(keepSt));
    },
    deleteItem: (item) => {
      let keepSt = JSON.parse(localStorage.getItem('keepSt'));
      keepSt.forEach((each,index) => {
        if (each.id == item.id){
          keepSt.splice(index, 1)
        }
      });
      localStorage.setItem('keepSt', JSON.stringify(keepSt));
    },
    updateItem: (item) => {
      let keepSt = JSON.parse(localStorage.getItem('keepSt'));
      keepSt.forEach((each,index) => {
        if (each.id == item.id){
          keepSt.splice(index, 1, item)
        }
      });
      localStorage.setItem('keepSt', JSON.stringify(keepSt));
    },
    getItemFromStorage: () => {
      let keepSt;
      if (localStorage.getItem('keepSt') === null){
        keepSt = [];
      } else {
        keepSt = JSON.parse(localStorage.getItem('keepSt'));
      }
      return keepSt;
    },
    addItemToStorage: (item) => {
      let keepSt;
      if (localStorage.getItem('keepSt') === null){
        keepSt = [];
        keepSt.push(item);
        localStorage.setItem('keepSt', JSON.stringify(keepSt));
      } else {
        keepSt = JSON.parse(localStorage.getItem('keepSt'));
        keepSt.push(item);
        localStorage.setItem('keepSt', JSON.stringify(keepSt));
      }
    }
  }
})();



// Data design pattern

const DataCtr = (() => {
  const Item = function (id, name, price){
    this.id = id;
    this.name = name;
    this.price = price;
  };
  const data = {
    items: Storage.getItemFromStorage(),
    currentItem: null,
    totalSales: 0
  }
  // return statement
  return {
    clearAll: () => {
      data.items.length = 0;
    },
    deleteItem: (id) => {
      data.items.forEach((each,index) => {
        if (each.id === id){
          data.items.splice(index,1);
        }
      });
    },
    updateItem: (name,price) => {
      price = parseInt(price);
      let found;

      data.items.forEach((each) => {
        if (each.id === data.currentItem.id){
          each.name = name;
          each.price = price;
          found = each;
        }
      });
      return found;
    },
    getCurrentItem: () => {
      return data.currentItem;
    },
    setCurrentItem: (item) => {
      data.currentItem = item;
      return data.currentItem;
    },
    getElementById: (id) => {
      let item;
      data.items.forEach((each) => {
        if (each.id === id){
          item = each;
        }
      });
      return item;
    },
    getItems: () => {
      return data.items;
    },
    getTs: () => {
      let ts = 0;
      if (data.items.length === 0){
        ts = 0;
      } else {
        data.items.forEach((each) => {
          ts += each.price;
        });
      }
      data.totalSales = ts;
      return data.totalSales;
    },
    addItem: (name, price) => {
      let id;
      if (data.items.length > 0){
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      price = parseInt(price);

      const newItem = new Item(id,name,price);
      data.items.push(newItem);
      return newItem;
    }


  }
})();

// Ui design pattern
const UiCtr = (() => {
  const uiElements = {
    output: document.querySelector('.output'),
    submitContainer: document.querySelector('.submit'),
    submit: document.querySelector('.submit-input'),
    nameInput: document.querySelector('.name-input'),
    priceInput: document.querySelector('.calories-input'),
    buttons: document.querySelector('.edit-buttons'),
    editButton: document.querySelector('.item'),
    update: document.querySelector('.save'),
    delete: document.querySelector('.delete'),
    back: document.querySelector('.back'),
    section: document.querySelector('.calories-section'),
    clearAll: document.querySelector('.clear-all')
  };
// return statement
  return {
    clearAll: () => {
      let arr = Array.from(document.querySelectorAll('.output-item'));
      arr.forEach((each) => {
        if (each.hasAttribute('id')){
            each.remove();
        }
      });
    },
    deleteItem: (id) => {
      let arr = Array.from(document.querySelectorAll('.output-item'));
      arr.forEach((each) => {
        if (each.hasAttribute('id')){
          let ids = each.getAttribute('id');
          if (ids == id){
            each.remove();
          }
        }
      });
    },
    updateItem: (item) => {
      let arr = Array.from(document.querySelectorAll('.output-item'));
      arr.forEach((each) => {
        if (each.hasAttribute('id')){
          let id = each.getAttribute('id');
          if (id == item.id){
            each.innerHTML = 
            `
            <div class="meal-item">${item.name}</div>
            <div class="calorie-item">${item.price.toLocaleString()}</div>
            <div class="item-edit">
              <button class="item">Edit</button>
            </div>
            `
          }
        }
      });
    },
    fillInputField: (item) => {
      uiElements.nameInput.value = item.name;
      uiElements.priceInput.value = item.price;
    },
    showEditButtons: () => {
      uiElements.buttons.style.display = 'flex';
      uiElements.submitContainer.style.display = 'none';
    },
    hideEditButtons: () => {
      uiElements.buttons.style.display = 'none';
      uiElements.submitContainer.style.display = 'block';
    },
    hideListContainer: () => {
      uiElements.output.style.display = 'none';
    },
    clearInputs: () => {
      uiElements.nameInput.value = '';
      uiElements.priceInput.value = '';
    },
    addNewItem: (item) => {
      uiElements.output.style.display = 'block';
      const newItem = document.createElement('li');
      newItem.className = 'output-item';
      newItem.id = `${item.id}`;
      newItem.innerHTML = 
      `
        <div class="meal-item">${item.name}</div>
        <div class="calorie-item">${item.price.toLocaleString()}</div>
        <div class="item-edit">
          <button class="item">Edit</button>
        </div>
      `;
      uiElements.output.append(newItem);
    },
    getInputValues: () => {
      return {
      nameVal: document.querySelector('.name-input').value,
      priceVal: document.querySelector('.calories-input').value
      }
    },
    getUiElements: () => {
      return uiElements;
    },
    updateSales: () => {
      const ts = document.querySelector('.calories-content');
      ts.textContent = '$' + DataCtr.getTs().toLocaleString();
    },
    getAndPopulateList: (item) => {
      for (let i = 0; i <= item.length - 1; i++){
        uiElements.output.insertAdjacentHTML(`beforeend`, `
        <li id='${item[i].id}' class="output-item">
          <div class="meal-item">${item[i].name}</div>
          <div class="calorie-item">${item[i].price.toLocaleString()}</div>
          <div class="item-edit">
            <button class="item">Edit</button>
          </div>
        </li>
        `);
      }
    }
  }
})();

// App design pattern
const App = (() => {
  const loadEventListeners = () => {
    UiCtr.getUiElements().submit.addEventListener('click', addToList);
    UiCtr.getUiElements().output.addEventListener('click', activateEditState);
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });
    UiCtr.getUiElements().update.addEventListener('click', updateItem);
    UiCtr.getUiElements().back.addEventListener('click', (e) => {
      UiCtr.hideEditButtons();
      UiCtr.clearInputs();
      e.preventDefault();
    });
    UiCtr.getUiElements().delete.addEventListener('click', deleteItem);    
    UiCtr.getUiElements().clearAll.addEventListener('click', clearAllItems);
  };

  const addToList = (e) => {
    const input= UiCtr.getInputValues();
    if (input.nameVal !== '' && input.priceVal !== ''){
      let newItem = DataCtr.addItem(input.nameVal,input.priceVal);
      Storage.addItemToStorage(newItem);
      UiCtr.addNewItem(newItem);
      UiCtr.clearInputs();
      UiCtr.updateSales();
    }
    e.preventDefault();
  };

  const activateEditState = (e) => {
    if (e.target.className === 'item'){
      UiCtr.showEditButtons();
      UiCtr.getUiElements().section.scrollIntoView(top);
      let id = parseInt(e.target.parentElement.parentElement.id);
      const itemToEdit = DataCtr.getElementById(id);
      DataCtr.setCurrentItem(itemToEdit);
      UiCtr.fillInputField(DataCtr.getCurrentItem());
    }
    e.preventDefault();
  };

  const updateItem = (e) => {
    let newVal = UiCtr.getInputValues();
    let updatedItem = DataCtr.updateItem(newVal.nameVal,newVal.priceVal);
    UiCtr.updateItem(updatedItem);
    Storage.updateItem(updatedItem);
    UiCtr.clearInputs();
    UiCtr.hideEditButtons();
    UiCtr.updateSales();
    e.preventDefault();
  };

  const deleteItem = (e) => {
    const items = DataCtr.getItems();
    const itemToDelete = DataCtr.getCurrentItem();
    DataCtr.deleteItem(itemToDelete.id);
    UiCtr.deleteItem(itemToDelete.id);
    Storage.deleteItem(itemToDelete);
    UiCtr.clearInputs();
    UiCtr.hideEditButtons();
    UiCtr.updateSales();
    if (items.length === 0){
      UiCtr.hideListContainer();
    }

  };

  const clearAllItems = (e) => {
    DataCtr.clearAll();
    UiCtr.clearAll();
    UiCtr.updateSales();
    UiCtr.hideListContainer();
    Storage.clearAllItems();
  };
// return statement
  return {
    init: () => {
      const items = DataCtr.getItems();
      UiCtr.hideEditButtons();
      if (items.length === 0){
        UiCtr.hideListContainer();
      } else {
        UiCtr.getAndPopulateList(DataCtr.getItems());
      }
      UiCtr.updateSales();
      
      loadEventListeners();

    }
  }

})();

App.init();

