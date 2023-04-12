let selectForm = document.querySelector(".form");
let modForm = document.querySelector(".modformhide");
let newBtn = document.querySelector(".btn-toggle");
let subNote = document.querySelector(".subnote");
let nextNote = document.querySelector(".prev-notes");
let cancelBtn = document.querySelector(".Cancel");
let modSaveBtn = document.querySelector(".subModify");
let modCancle = document.querySelector(".mod-Cancel");
let alertMsg = document.querySelector(".succes-msg");
let delConfirm = document.querySelector(".del-confirm");
let delPopUp = document.querySelector(".confim-delete");
let delpopCancle = document.querySelector(".del-Cancel");

const base_URL = "http://localhost:5000";

async function apifetch(method, url, data, successCallBack, errorCallBack) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json; charste=UTF-8",
    },
    body: data,
  })
    .then((res) => {
      console.log(successCallBack);
      successCallBack(res);
    })
    .catch((err) => {
      errorCallBack(err);
    });
}

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

delpopCancle.addEventListener("click", function () {
  console.log("hi");
  delPopUp.classList.add("hide");
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
    WRITE A NEW NOTE`;
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
    apifetch(
      "POST",
      `${base_URL}/create`,
      JSON.stringify({
        title: form.title.value,
        description: form.description.value,
      }),
      (res) => {
        res.json().then((data) => {
          form.title.value = "";
          form.description.value = "";
          alertMsg.classList.toggle("hide");
          alertMsg.classList.toggle("add-alert");
          alertMsg.textContent = data.message;
          nextNote.innerHTML = "";
          selectForm.classList.toggle("hide");
          alertPing();
        });
      },
      (err) => {
        alert(err);
      }
    );
  } else {
    alert("Fill the form Correctly");
  }
});

// Api For Deleting Selected Notes

function deleteNotes(note, data) {
  let delShowbtn = note.querySelector(".delete");
  delShowbtn.addEventListener("click", function () {
    delPopUp.classList.toggle("hide");
    delConfirm.addEventListener("click", (e) => {
      console.log(e.target.classList);
      apifetch(
        "DELETE",
        `${base_URL}/delete`,
        JSON.stringify({
          id: data._id,
        }),
        (res) => {
          res.json().then((data) => {
            console.log(data);
            delPopUp.classList.add("hide");
            alertMsg.classList.toggle("hide");
            alertMsg.classList.toggle("del-alert");
            alertMsg.textContent = data.message;
            nextNote.innerHTML = "";
            alertPing();
          });
        },
        (err) => {
          alert(err);
        }
      );
    });
  });
}

// Function To Modify Notes

function modifyNotes(note, data) {
  let modifyBtn = note.querySelector(".modify");

  modifyBtn.addEventListener("click", function () {
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
        apifetch(
          "PUT",
          `${base_URL}/modify`,
          JSON.stringify({
            id: data._id,
            title: newform.Newtitle.value,
            description: newform.Newdescription.value,
          }),
          (res) => {
            res.json().then((data) => {
              console.log(data);
              modifyBtn.textContent = "Submitted";
              newform.Newtitle.value = "";
              newform.Newdescription.value = "";
              modForm.classList.toggle("hide");
              console.log(data.message);
              alertMsg.classList.toggle("hide");
              alertMsg.classList.toggle("mod-alert");
              alertMsg.textContent = data.message;
              nextNote.innerHTML = "";
              alertPing();
            });
          },
          (err) => {
            alert(err);
          }
        );
      } else {
        alert("Fill the form Correctly");
      }
    });
  });
}

(() => {
  fetchNotes();
})();
