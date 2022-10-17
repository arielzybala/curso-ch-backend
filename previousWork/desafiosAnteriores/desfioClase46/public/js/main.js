const toggle = document.querySelector('.bar_toggle')
const listLinks = document.querySelector('.bar_listLinks')

toggle.addEventListener('click', ()=>{
    listLinks.classList.toggle('active')
})