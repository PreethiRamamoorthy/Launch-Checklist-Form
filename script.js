// Write your JavaScript code here!
window.addEventListener("load",function(){
   let form = document.querySelector("form");
   let faultyItems = document.getElementById('faultyItems');
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   let h2Status = document.getElementById('launchStatus');
   //This block of code shows how to format the HTML once you fetch some planetary JSON!
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {  
         const output = document.getElementById("missionTarget") ;
         //for (let i=0; i<=json.length-1; i++) {}
         output.innerHTML = 
         `<h2>Mission Destination</h2>         
            <ol>
               <li>Name: ${json[0].name}</li>
               <li>Diameter: ${json[0].diameter}</li>
               <li>Star: ${json[0].star}</li>
               <li>Distance from Earth: ${json[0].distance}</li>
               <li>Number of Moons: ${json[0].moons}</li>
            </ol>
            <img src="${json[0].image}"></img>
         `
      });
      
   }); 
   form.addEventListener("submit", function(event){
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      console.log("Before if")
      if (pilotNameInput.value == "" || copilotNameInput.value == "" || 
          fuelLevel.value == "" || cargoMass.value == ""){
            console.log("Inside if")
            alert("All fields are required");
            //event.preventDefault();
      } else if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value)) || 
                 !isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
         alert("Make sure to enter valid information for each field.");
      } else {
   
      if ((fuelLevel.value !== "" ) && (Number(fuelLevel.value) < 10000) && 
         (cargoMass.value !== "") && (Number(cargoMass.value) < 10000)) {
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch. `;
         copilotStatus.innerHTML = `CoPilot ${copilotNameInput.value} is ready for launch.`;
         fuelStatus.innerHTML = `There is no enough fuel for the journey.`;
         cargoStatus.innerHTML = `Cargo mass low enough for launch` ;
         faultyItems.style.visibility = 'visible';
         h2Status.innerHTML = `Shuttle not ready for launch`;
         h2Status.style.color = 'Red';
      } else if((cargoMass.value !== "") && (Number(cargoMass.value) > 10000) &&
         (fuelLevel.value !== "" ) && (Number(fuelLevel.value) > 10000)) {
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch. `;
         copilotStatus.innerHTML = `CoPilot ${copilotNameInput.value} is ready for launch.`;
         faultyItems.style.visibility = 'visible';
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
         cargoStatus.innerHTML = `There is too much mass for the shuttle to take off.`;
         h2Status.innerHTML = `Shuttle not ready for launch`;
         h2Status.style.color = 'Red';
      } else if((fuelLevel.value !== "" ) && (Number(fuelLevel.value) < 10000) && 
         (cargoMass.value !== "" ) && (Number(cargoMass.value) > 10000) ){
            faultyItems.style.visibility = 'visible';
            pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch. `;
            copilotStatus.innerHTML = `CoPilot ${copilotNameInput.value} is ready for launch.`;
            fuelStatus.innerHTML = `There is no enough fuel for the journey.`;
            cargoStatus.innerHTML = `There is too much mass for the shuttle to take off.`;
            h2Status.innerHTML = `Shuttle not ready for launch.`;
            h2Status.style.color = 'Red';         
      } else {
      //if (!isNaN(pilotNameInput.value) && !isNaN(copilotNameInput.value)){
            console.log('Inside Green');
            faultyItems.style.visibility = 'visible';
            pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch. `;
            copilotStatus.innerHTML = `CoPilot ${copilotNameInput.value} is ready for launch.`;
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            h2Status.innerHTML = `Shuttle is ready to Launch.`;
            h2Status.style.color = 'Green';

      }
   }
   });   
   



});