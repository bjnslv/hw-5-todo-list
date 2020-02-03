var todo = {
  data: [],
  load: function () {
    if (localStorage.list == undefined) {
      localStorage.list = "[]";
    }

    todo.data = JSON.parse(localStorage.list);
    todo.list();
  },

  save: function () {
    localStorage.list = JSON.stringify(todo.data);
    todo.list();
  },

  list: function () {
    var container = document.getElementById("todo-list");
    container.innerHTML = "";
    if (todo.data.length > 0) {
      var item = "",
        div = "";
      for (var key in todo.data) {
        // Row container
        item = document.createElement("div");
        item.classList.add("todo-item");
        item.dataset.id = key;

        div = document.createElement("div");
        div.classList.add("item");
        if (todo.data[key][1] == 1) {
          div.classList.add("done");
        }
        if (todo.data[key][1] == 2) {
          div.classList.add("line-through");
        }
        div.innerHTML = todo.data[key][0];
        item.appendChild(div);

        div = document.createElement("input");
        div.setAttribute("type", "button");
        div.value = "\u2716";
        div.classList.add("button-del");
        div.addEventListener("click", function () {
          todo.status(this, 2);
        });
        item.appendChild(div);

        div = document.createElement("input");
        div.setAttribute("type", "button");
        div.value = "\u2714";
        div.classList.add("button-done");
        div.addEventListener("click", function () {
          todo.status(this, 1);
        });
        item.appendChild(div);

        container.appendChild(item);
      }
    }
  },

  add: function () {

    todo.data.push([
      document.getElementById("todo-add").value, 0
    ]);
    document.getElementById("todo-add").value = "";
    todo.save();
  },

  status: function (div, stat) {
    var parent = div.parentElement;
    todo.data[parent.dataset.id][1] = stat;
    todo.save();
  },

  del: function (type) {
    if (type == 0) {
      todo.data = [];
      todo.save();
    } else {
      todo.data = todo.data.filter(function (item) {
        return item[1] == 0;
      });
      todo.save();
    }

  }
};


window.addEventListener("load", function () {
  document.getElementById("todo-all").addEventListener("click", function () {
    todo.del(0);
  });
  document.getElementById("todo-completed").addEventListener("click", function () {
    todo.del(1);
  });
  document.getElementById("todo-form").addEventListener("submit", function (evt) {
    evt.preventDefault();
    todo.add();
  });
  todo.load();
});
