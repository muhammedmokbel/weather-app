const path = require('path')
const express = require('express') ; 
const hbs = require('hbs'); 
const geocode = require("./utilis/geocode"); 
const forecast = require("./utilis/forecast"); 


// init our app to be able to use all functionality of express
const app = express() ; 
const port = process.env.PORT || 3000; 

// setting paths for static or dynamic html pages
const publicpath = path.join(__dirname , '../public'); 
const views = path.join(__dirname, '../pages/views'); 
const partialheader = path.join(__dirname, '../pages/partials')

// change express config 
app.set('view engine' , 'hbs'); 
app.set('views' , views)

// hbs config
hbs.registerPartials(partialheader)



// use middleware ? 
app.use(express.static(publicpath)); 



app.get('' , (req , res) => {
    res.render('index', {
        
    })
})

app.get('/about' , (req, res) => {
    res.render('about', {
        name : "About page"
    })
})

app.get('/help' , (req, res) => {
    res.render('help' , {
        name : "Help page"
    })
})


// endpoint 
app.get('/weather' , (req , res) => {
    if (!(req.query.address))
    {
        return res.send({
            error : "you must send address !"
        })
    }

    geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {
        if (error)
        {
            return res.send({
                 error 
            })
        }

        forecast(latitude , longitude , (error , forecastdata) => {
            if (error)
            {
                return res.send({
                     error 
                })
            }
            res.send({
                 location,
                address : req.query.address , 
                summary : forecastdata.summary , 
                icon : forecastdata.icon 
                
            })

        })

    })


    
})

app.get('/help/*' , (req, res) => {
    res.render('404page' , {
        error : 'Article Not Found ! '
    })
})

app.get('*' , (req, res) => {
    res.render('404page' , {
        error : "404 Page"
       
    })
})


app.listen(port , () => {
    console.log('server is running !')
})