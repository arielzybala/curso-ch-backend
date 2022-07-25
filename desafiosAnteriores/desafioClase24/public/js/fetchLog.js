const formLog = document.querySelector("#formLog");
const nameLog = document.querySelector("#nameLog");
const boxLog = document.querySelector("#boxLog");

formLog.addEventListener("submit", (e) => {
  e.preventDefault();
  let userLog = nameLog.value;
  const data = { user: userLog };
  boxLog.innerHTML = `
    <h2  class="container__label"> 
        Bienvenido ${nameLog.value}!
    </h2>
    <a href="/api/logout" class="container__btn"> 
        Log out
    </a>`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`/api/login`, options);
});
