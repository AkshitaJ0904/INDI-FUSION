document.addEventListener("DOMContentLoaded", () => {
    dresses();
    pots();
  });

  async function dresses(){
    try{
        const response = await fetch("./frontend/JSON/data.json");
        const data = await response.json();

        const cotureSection = document.getElementById("coturesection");

        data.dresses.forEach((dress, index) => {
          const dressDiv = document.createElement("div");
          dressDiv.className = `dress${index + 1}`;
          const imgElement = document.createElement("img");
          imgElement.src = dress.image;
          imgElement.alt = `Dress ${index + 1}`;
          imgElement.height = 600;
          imgElement.width = 370;
          dressDiv.appendChild(imgElement);
          cotureSection.appendChild(dressDiv);
      })
      data.dresses.forEach((dress, index) => {
        const infoDiv = document.createElement("div");
          infoDiv.className = `d${index + 1}in`;

          infoDiv.innerHTML = `
            <p class="red">${dress.title}</p>
            <p>${dress.description}</p>
            <p>(USD) ${dress.price}</p>`;
          
          cotureSection.appendChild(infoDiv);
    })
    }
    catch(error){console.error("Error loading JSON:", error)};
}
    
  async function pots(){
    try{
        const response = await fetch("./frontend/JSON/data.json");
        const data = await response.json();

        const potimgs = document.getElementById("potimgs");
        data.pots.forEach((pot, index) => {
            const potDiv = document.createElement("div");
            potDiv.className = `pot${index + 1}`;
            const imgElement = document.createElement("img");
            imgElement.src = pot.image;
            imgElement.alt = `pot ${index + 1}`;
            imgElement.height = 250;
            imgElement.width = 400;
            potDiv.appendChild(imgElement);
            potimgs.appendChild(potDiv);
        })
        data.pots.forEach((pot, index) => {
          const infoDiv = document.createElement("div");
            infoDiv.className = `pot${index + 1}content`;
            infoDiv.innerHTML = `
              <p>${pot.title}</p>
              <p class="red">(USD) ${pot.price}</p>`;
            
            potimgs.appendChild(infoDiv);
      })

    }
    catch(error){console.error("Error loading JSON:", error)};
}
