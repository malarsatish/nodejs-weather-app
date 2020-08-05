const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//Define path for express config
const publidDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebards engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publidDirPath))

//Root or homepage
app.get('',(req, res) => {
    res.render('index',{
        title: 'MST Weather App',
        name: 'MST - W'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About MST App Templates',
        name : 'MST - A'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'MST Help!!!', 
        help: 'We are here to help!!!',
        name: 'Satish'
    })
})

app.get('/weather',(req, res)=>{
 
    if(!req.query.address){
        return res.send(
            {
                error: 'Please provide an input address to fetch weather details'
            }
        )
    }
    
    geocode(req.query.address, (error, {lat, lon, loc} = {}) => {
        
        if (error) {
          return res.send({
              address: 'Error while finding weather details for ' + req.query.address, 
              error //Shorthand usage
            }
            )
        } 
          //console.log('Current Weather details for', loc, '(', lat, ',', lon, ')',)
          weather(lat, lon, (error, data) => {
            if (error) {
                return res.send({
                    address: 'Error while finding weather details for ' + req.query.address, 
                    error //Short hand
                  }
                  )
            } 
                return res.send({
                    address: 'Weather details for ' + loc + ' is as below. Input address is ' + req.query.address, 
                    data //Shorthand
                  }
                  )
            
          })
        
      })
      
    /*res.send( 
        {weather: 'Request received to find Weather Report for ' ,
        address: req.query.address}
    )*/
})

app.get('/products',(req, res)=>{
    
    if(!req.query.search){
        return res.send({
            error: 'Please provide the search value'
        })
    }

        res.send( {
            products:[]
            }
        )
    
   // console.log(req.query)
    
})

app.get('/help/*',(req, res)=>{
   res.render('helpInvalid',{
       title: 'Invalid Help Page/URL',
       name: 'MST App Helper',
       errorMessage : 'The page you are searching is invalid or no longer exists'
   })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404 - Page not found',
        name: 'MST 404 App',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})

/*app.get('', (req, res) => {
    res.send('<h1>Its Express!!!</h1>')
})

app.get('/help',(req, res) => {
    const helpContent = [{
        name: 'MST',
        app : 'AppT'
    },{
        name: '2'
    }]
    //'<h1>App Help page</h1>',
    res.status(200).send(  helpContent)
})

app.get('/about',(req, res)=>{
    res.send('This is all about the About')
})
*/