console.log("i am client side");

const form =document.querySelector("form"); 
const input = document.querySelector("input"); 
const img = document.getElementById("myimg") ; 
const error = document.getElementById("error-text") ; 
const loc = document.getElementById("loc") ; 
const summary = document.getElementById("summary"); 
const desc = document.getElementById("desc"); 






function fetching (location) {
   fetch("http://localhost:3000/weather?address=" + location).then((res) => {
    
   res.json().then((data) => {
    if (data.error)
    {
       img.src = ""; 
       loc.textContent = "" ; 
       summary.textContent = "" ; 
       desc.textContent = "" ; 
       error.textContent = data.error ; 
       
    }
    else 
    {
      error.textContent= "" ; 
       if (data.icon === "clear-day")
       {
          img.src = "/img/clear-day.gif"; 
       }
       else if (data.icon === "clear-night" || data.icon === "partly-cloudy-night")
       {
       
          img.src = "/img/clear-night.gif"; 
       }
       else if (data.icon === "rain")
       {
          img.src = "/img/gif1.gif";
       }
       else if (data.icon === "snow" || data.icon === "sleet")
       {
          img.src = "/img/snow2.gif"; 
       }
       else if (data.icon === "wind")
       {
         img.src = "/img/wind.gif"; 
       }
       else if (data.icon === "fog")
       {
         img.src = "/img/fog.gif"; 
       }
       else if (data.icon === "cloudy" || data.icon === "partly-cloudy-day")
       {
         img.src = "/img/cloudy.gif"; 
       }

       loc.textContent = data.location ; 
       summary.textContent = data.summary ; 
       desc.textContent = data.icon ; 
    }

   })
})
}

form.addEventListener("submit" , (e) => {
   e.preventDefault() ; 
   error.textContent="searching..."
   fetching(input.value); 
})

