// var dragged = null;
// var currText = "";

$(document).ready(function () {
  let allContent = [];
  $(".st-select2").select2({ templateSelection: formatState });
  function formatState(state) {
    console.log("State:::", state.id);
    const data = getTemplate(state.id);
  }

  const droppableElement = document.querySelectorAll(".allowDrop");
  const draggableElement = document.querySelectorAll(".draggable");
  const btn = document.querySelector("#btn");
  const saveContent = document.querySelector("#save");
  const textContent = document.querySelector("#textContent");
  const stInput = document.querySelector("#st-input");
  const stSelect2 = document.querySelector(".st-select2");

  draggableElement.forEach((x) =>
    x.addEventListener("dragstart", (event) => {
      /** use if dragging entire node is preferred */
      // dragged = event.target;
      event.dataTransfer.setData("text", event.target.innerText);

      /** use if getting current text in variable is preferred */
      // currText = event.target.innerText;
      event.target.innerHTML = event.target.innerText;
    })
  );

  droppableElement.forEach((x) =>
    x.addEventListener("dragover", (event) => {
      event.preventDefault();
    })
  );

  droppableElement.forEach((x) =>
    x.addEventListener("drop", (event) => {
      // event.preventDefault();
      if (event.target.className === "allowDrop") {
        /** use if entire node dragged should be removed */
        //   dragged.parentNode.removeChild(dragged);

        /** use if setting current text in variable is preferred */
        //   event.target.innerHTML = currText;
        event.target.innerHTML = event.dataTransfer.getData("Text");

        /** use if entire node append is preferred */
        //   event.target.appendChild(dragged);
      }
    })
  );

  btn.addEventListener("click", function () {
    if (textContent.getAttribute("contentEditable")) {
      textContent.removeAttribute("contentEditable");
      btn.innerHTML = "Allow Edit";
    } else {
      textContent.setAttribute("contentEditable", true);

      btn.innerHTML = "Prevent Edit";
    }

    const content = textContent.outerHTML;
    console.log("Content to be saved:::", content);
  });

  saveContent.addEventListener("click", function () {
    const content = textContent.outerHTML;
    console.log("All content:::", content);
    textContent.removeAttribute("contentEditable");
    btn.innerHTML = "Allow Edit";
  });

  stInput.addEventListener("keyup", function () {
    let filter, ul, li, i, txtValue;
    filter = this.value.toUpperCase();
    ul = document.querySelector(".st-ul");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  });

  const getData = (Method = "GET", Data = "") => {
    $.ajax({
      Method,
      url: "http://localhost:3000/templates",
    }).done(function (d) {
      console.log("Inside ajax:::", d);

      CKEDITOR.replace("editor2");

      CKEDITOR.instances.editor2.setData(d[1].template);

      stSelect2.innerHTML = Array.from(
        { length: d.length },
        (_, i) => `<option value=${d[i].id}>Template ${d[i].id}</option>`
      ).join("");
    });
  };

  const getTemplate = (id) => {
    $.ajax({
      url: `http://localhost:3000/templates?id=${id}`,
    }).done(function (d) {
      console.log("Inside template:::", d);
      CKEDITOR.replace("editor2");
      CKEDITOR.instances.editor2.setData(d[0].template);
      textContent.innerHTML = d[0].template;
    });
  };

  getData();
});
