const scriptURL = 'https://script.google.com/macros/s/AKfycbxfD0FXvTTT4vUSVwVjAW_zZD321oF44IMcBcOEncB3f_ViNBaYc0HfLO69c5ZgTzqEQg/exec' // Write your own app script url here
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Thank You For Subscribing!"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})