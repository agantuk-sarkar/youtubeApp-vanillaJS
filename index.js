// youtube api key
const apiKey = "AIzaSyAEiqct4ez7etprYnUB1mf_-x2kwmcNLZc";

// getting the html elements into js
const myForm = document.querySelector(".myForm");
myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchInput = document.getElementById("search").value;

  // base url for search query
  const baseUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchInput}&key=${apiKey}`;

  getData(baseUrl);

});

// function to fetch the base url
const getData = async (url) =>{
    try{
        const response = await fetch(url);

        if(response.ok){
            const data = await response.json();
            // console.log("data:",data.items);
        } else{
            throw new Error("Invalid URL");
        }

    } catch(error){
        console.log("error:",error);
    }

}
