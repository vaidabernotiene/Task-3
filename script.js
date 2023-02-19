/* ------------------------------ TASK 3 -----------------------------------
Parašykite JS kodą, kuris leis vartotojui paspaudus ant mygtuko "Show users"
pamatyti vartotojus iš Github API (endpoint'as pateiktas žemiau).

Paspaudus mygtuką "Show users":
1. Pateikiamas informacijos atvaizdavimas <div id="output"></div> bloke
1.1. Informacija, kuri pateikiama: "login" ir "avatar_url" reikšmės (kortelėje)
2. Žinutė "Press "Show Users" button to see users" turi išnykti;
"
Pastaba: Informacija apie user'į (jo kortelė) turi turėti bent minimalų stilių;
-------------------------------------------------------------------------- */
const ENDPOINT = "https://api.github.com/users";

const showUsersBtn = document.querySelector("#btn");
const displUsers = document.querySelector("#output");
displUsers.style.gap = "20px";

showUsersBtn.addEventListener("click", getUsersData);

async function getUsersData() {
  displUsers.innerHTML = "";

  await fetch(ENDPOINT)
    .then((res) => {
      if (res.ok) {
        console.log("GET request succesful");
      } else {
        console.log("GET request unsuccesful");
      }
      return res;
    })
    .then((res) => res.json())

    .then((data) => {
      data.forEach((element) => {
        const avatarContainer = document.createElement("div");
        avatarContainer.style.cssText =
          "background-color: #222; color: #fff; display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px; padding: 20px";

        const textEl = document.createElement("h2");
        textEl.style.alignSelf = "center";
        textEl.textContent = `Avatar name: <${element.login}>`;
        const avatarEl = document.createElement("img");
        avatarEl.src = element.avatar_url;
        avatarEl.textContent = element.login;

        // append elements to HTML ---------------------------------------
        displUsers.append(avatarContainer);
        avatarContainer.append(textEl, avatarEl);
      });
    })

    .catch((err) => console.log(err));
}
