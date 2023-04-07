let selectForm = document.querySelector(".form");
let modForm = document.querySelector(".modformhide");
let newBtn = document.querySelector(".btn-toggle");
let subNote = document.querySelector(".subnote");
let nextNote = document.querySelector(".prev-notes");
let cancelBtn = document.querySelector(".Cancel");
let modSaveBtn = document.querySelector(".subModify");
let modCancle = document.querySelector(".mod-Cancel");
let alertMsg = document.querySelector(".succes-msg");

newBtn.addEventListener("click", function () {
  modForm.classList.add("hide");
  selectForm.classList.toggle("hide");
});

modCancle.addEventListener("click", function (e) {
  e.preventDefault();
  modForm.classList.add("hide");
});

cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  selectForm.classList.toggle("hide");
  form.title.value = "";
  form.description.value = "";
});

// Function To Fetch Notes From Database

const fetchNotes = async () => {
  await fetch("http://localhost:5000/get")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      showNotes(data);
    });
};

// function to Show Previous Notes

function showNotes(d) {
  if (d.data.length > 0) {
    d.data.forEach((d) => {
      const notePost = document.createElement("div");
      notePost.classList.add("added-note");
      notePost.innerHTML = `
      <h4>${d.title}</h4>
      <p>${d.description}</p>
      <button class="delete">Delete</button>
      <button class="modify">Modify</button>
      `;
      nextNote.appendChild(notePost);

      deleteNotes(notePost, d);
      modifyNotes(notePost, d);
    });
  } else {
    nextNote.innerHTML = `Ops! Your Notes Are Empty!!!! <br>
    WRITE A NEW NODE`;
    nextNote.classList.add("empty-note");
  }
}

// Function For calling Alert

function alertPing() {
  setTimeout(() => {
    alertMsg.style.transform = "translateX(-300%)";
    alertMsg.style.transition = "all .5s ease-in";
  }, 2000);
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

// Function For Saving New Note

subNote.addEventListener("click", (e) => {
  if (
    form.title.value.trim().length > 0 &&
    form.description.value.trim().length > 0
  ) {
    e.preventDefault();
    subNote.disabled = true;
    fetch("http://localhost:5000/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: form.title.value,
        description: form.description.value,
      }),
    })
      .then((res) => {
        console.log("data potsed", res);
        form.title.value = "";
        form.description.value = "";

        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        alertMsg.classList.toggle("hide");
        alertMsg.classList.toggle("add-alert");
        alertMsg.textContent = data.message;
        nextNote.innerHTML = "";
        selectForm.classList.toggle("hide");
        alertPing();

      });
  } else {
    alert("Fill the form Correctly");
  }
});

// Api For Deleting Selected Notes

function deleteNotes(note, data) {
  note.querySelector(".delete").addEventListener("click", (e) => {
    console.log(e.target.classList);
    fetch("http://localhost:5000/delete", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: data._id,
      }),
    })
      .then((res) => {
        console.log("data deleted", res);
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        alertMsg.classList.toggle("hide");
        alertMsg.classList.toggle("del-alert");
        alertMsg.textContent = data.message;
        nextNote.innerHTML = "";
        alertPing();
      });
  });
}

// Function To Modify Notes

function modifyNotes(note, data) {
  let modifybtn = note.querySelector(".modify");

  modifybtn.addEventListener("click", function () {
    selectForm.classList.add("hide");
    modForm.classList.toggle("hide");
    newform.Newtitle.value = data.title;
    newform.Newdescription.value = data.description;

    modSaveBtn.addEventListener("click", (e) => {
      console.log(e.target);
      console.log(data._id);
      if (
        newform.Newtitle.value.trim().length > 0 &&
        newform.Newdescription.value.trim().length > 0
      ) {
        e.preventDefault();
        fetch("http://localhost:5000/modify", {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            id: data._id,
            title: newform.Newtitle.value,
            description: newform.Newdescription.value,
          }),
        })
          .then((res) => {
            console.log("data potsed", res);
            modifybtn.textContent = "Submitted";
            newform.Newtitle.value = "";
            newform.Newdescription.value = "";
            modForm.classList.toggle("hide");
            return res.json();
          })
          .then((data) => {
            console.log(data.message);
            alertMsg.classList.toggle("hide");
            alertMsg.classList.toggle("mod-alert");
            alertMsg.textContent = data.message;
            nextNote.innerHTML = "";
            alertPing();
          });
      } else {
        alert("Fill the form Correctly");
      }
    });
  });
}

(() => {
  fetchNotes();
})();
