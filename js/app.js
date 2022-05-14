const pop = document.getElementById("ajouter");
function closePop() {
  pop.style.display = "none";
}
function openPopup() {
  pop.style.display = "block";
}

// pop.onclick = (e) => {
//   if (pop.style.display == "none") {
//     openPopup();
//   } else closePop();
// };

async function init() {
  let users = await fetchUsers();
  displayUsers(users);
  //Add user To dataBase
  const addUser = async (e) => {
    e.preventDefault();
    let id = Math.floor(Math.random() * 100000);
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let userName = document.getElementById("userName").value;
    let registrationNumber =
      document.getElementById("registrationNumber").value;
    let status = document.getElementById("status").value;
    let createdDate = document.getElementById("createdDate").value;
    let data = {
      id,
      firstName,
      lastName,
      userName,
      registrationNumber,
      status,
      createdDate,
    };
    users.push(data);
    displayUsers(users);
    closePop();
  };

  showSupprimer = () => {
    let supprimer = document.getElementById("supprimer");
    supprimer.style.display = "block";
    supprimer.onclick = (e) => {
      if (supprimer.style.display == "none") {
        supprimer.style.display = "block";
      } else supprimer.style.display = "none";
    };
  };

  deleteUser = (id) => {
    users = users.filter((user) => user.id != id);
    displayUsers(users);
  };

  const add = document.getElementById("add-user");
  add.addEventListener("submit", addUser);
}

//fetch json
const fetchUsers = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5500/js/data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function displayUsers(users) {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  users.forEach((user) => {
    tbody.innerHTML += `
        <tr>
                      <td class="">
                          <div class="flex items-center" > ${user.id}
                          </div>
  
                      </td>
                      <td class="" >
                          <div>
                            ${user.createdDate}
                          </div>
                      </td>
                      <td class="">
                         <span>
                              ${user.status}
                         </span>
                      </td>
                      <td class="" >
                          <span> ${user.firstName}
                          </span>
                      </td>
                      <td class="">
                          <span> ${user.lastName} </span>
                      </td>
                      <td class="">
                          <span>${user.userName} </span>
                      </td>
                      <td class="">
                          <span> ${user.registrationNumber} </span>
                      </td>
                      <td class="">
                          <button id="${user.id}" onclick="showSupprimer()">
                          <svg style="height:24px;width:24px;" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                              <path d="M0 0h24v24H0z" fill="none"/>
                          </svg>
                      </button>
                      <section class="section-c2b" id="supprimer" onclick="showSupprimer()">
                      <div class="popup">
                        <h1>voulez vous suprimer cette utilisateur</h1>
                        <div class="choix">
                          <button class="" id="oui" onclick="deleteUser(${user.id})">OUI</button>
                          <button id="non">NON</button>
                        </div>
                        
                      </div>
                    </section >
                          
                      </td>
                  </tr>
        `;
  });
}

// displayUsers(users);

init();

// window.onclick = function (event) {
//   closePop();
// };
