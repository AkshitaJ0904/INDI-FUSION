// Select all "Add to List" buttons and add event listeners
document.querySelectorAll('.but').forEach(button => {
    button.addEventListener('click',  async function() {
      // Get the product ID (which is the same as the button ID)
      const productId = this.id;
      
      // Get the product details from the page
      const productElement = document.getElementById(`product${productId}`);
      const title = productElement.querySelector(`#item${productId}-title`).textContent;
      const description = productElement.querySelector(`#item${productId}-description`).textContent;
      const imgSrc = productElement.querySelector(`#item${productId}-img`).src;
  
      // Prepare the product data
      const productData = {
        title,
        description,
        imgSrc
      };
  
      // Add the product to the wishlist
      // addToWishlist(productData);
      try{
            const response = await fetch("http://localhost:4000//indifusion/list/add",{
              method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(groupData)
        });
        if(!response.ok){
            throw new Error("Failed to create group");
        }

        const data = await response.json();
        console.log(data);

        setTimeout(()=>{
            location.href = "/avail_grp";
        },3000);
            
      }catch(ERR){

      }



    });
  });
  
  // Function to add product to the wishlist panel
  function addToWishlist(productData) {
    // Get the wishlist panel
    const panel = document.getElementById("selectedWishlistPanel");
  
    // Create a new wishlist item
    const newItem = document.createElement("div");
    newItem.className = "wishlist-item";
    newItem.innerHTML = `
      <img src="${productData.imgSrc}" alt="${productData.title}" class="wishlist-item-img">
      <h3>${productData.title}</h3>
      <p>${productData.description}</p>
    `;
  
    // Append the new item to the wishlist panel
    panel.appendChild(newItem);
  
    // Log for debugging
    console.log("Added to wishlist:", productData);
  }
  

