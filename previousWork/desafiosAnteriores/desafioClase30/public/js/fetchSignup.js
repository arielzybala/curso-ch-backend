const formLog = document.querySelector("#formSignup");
const emailUser = document.querySelector("#email");
const passwordUser = document.querySelector("#password");

formLog.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = emailUser.value;
  let password = passwordUser.value;
  const data = { email: email, password: password};
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`/api/signup`, options);
});