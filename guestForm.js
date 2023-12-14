// import { createGuestList } from './data/guestdata.js'
const createGuestList = require('./data/guestdata.js')

// 65130500099 Chaimongkon Sokgampang
const guestList = createGuestList()
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList

  // 1. register event for searching and adding
  function registerEventHandling() {
    let searhinput = document.getElementById('search-input')
    searhinput.addEventListener('keyup',searchGuest)


    let addguestBtn = document.getElementById('add-guest-btn')
    addguestBtn.addEventListener('click',addGuest)
    
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    let displaylist = document.querySelector('#display-area')
    let guestdiv = document.createElement('div')
    let name = document.createElement('span')
    name.textContent = `${guestItem.firstname} ${guestItem.lastname}`
    let xbtn = document.createElement('span')
    xbtn.addEventListener('click',removeGuest)
    xbtn.innerHTML = `<span class="remove-icon" id=${guestItem.firstname}-${guestItem.lastname} style="cursor:pointer;color:red">[X]</span>`
    guestdiv.appendChild(name)
    guestdiv.appendChild(xbtn)
    displaylist.appendChild(guestdiv)
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    let displaylist = document.querySelector('#display-area')
    displaylist.textContent = ''
    guestResult.forEach((guest) =>{
      displayGuest(guest)
    })
  }
    

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    let searchvalue = document.getElementById('search-input').value
    console.log(searchvalue)
    console.log(guests)
    let realguest = guests.getAllGuests()
    let newguest = realguest.filter((guest) => 
    (guest.firstname.toLowerCase().includes(searchvalue.toLowerCase()) || 
    guest.firstname.toUpperCase().includes(searchvalue.toUpperCase()) || 
    guest.firstname.includes(searchvalue)) ||
    (guest.lastname.toLowerCase().includes(searchvalue.toLowerCase()) || 
    guest.lastname.toUpperCase().includes(searchvalue.toUpperCase()) || 
    guest.lastname.includes(searchvalue)))
    displayGuests(newguest)
  }

  // 5. Function to add a new guest
  function addGuest() {
    const fnameInput = document.getElementById('firstname-input')
    const lnameInput = document.getElementById('lastname-input')
    // console.log(fnameInput.value,lnameInput.value)
    let newguest = guests.addNewGuest(fnameInput.value,lnameInput.value)
    // console.log(newguest.length)
    // console.log(newguest[newguest.length-1])
    displayGuest(newguest[newguest.length-1])
    
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    let displayarea = document.getElementById('display-area')
    let eventtarget = event.target.id.split('-')
    let deleteobject = {firstname:eventtarget[0],lastname:eventtarget[1]}
    const deleteIndex = guests.getAllGuests().findIndex(
      (guest) =>
        deleteobject.firstname.toLowerCase() === guest.firstname.toLowerCase() &&
        deleteobject.lastname.toLowerCase() === guest.lastname.toLowerCase()
    )
    guests.removeGuest(deleteobject)
    displayarea.removeChild(displayarea.children[deleteIndex])
    displayGuests(guests.getAllGuests())
    console.log(displayarea.children.length)
    console.log(guestList.getAllGuests().length)
   
    

  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest
  }
}
module.exports = guestForm
// export { guestForm }
// const { registerEventHandling, displayGuests } = guestForm()
// registerEventHandling()
// displayGuests(guestList.getAllGuests())
