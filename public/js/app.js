console.log('Browser client file log')
/*
fetch('http://puzzle.mead.io/puzzle')
.then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})
*/

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = searchLocation.value

    msg1.textContent = 'Fetching details...'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location)
.then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error
            msg2.textContent = ''
            console.log(data.error)
        }
        else{
            msg1.textContent = data.address 
            msg2.textContent = data.data
            console.log(data.address)
            console.log(data.data)
        }
    })
})

    //console.log('Add Event Testing', location)
})