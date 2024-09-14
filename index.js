// youtube api key
const apiKey = "AIzaSyAEiqct4ez7etprYnUB1mf_-x2kwmcNLZc";

// getting the html elements into js
const video_subContainer = document.querySelector(".video-subContainer");

const myForm = document.querySelector(".myForm");

// submit event for input field
myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchInput = document.getElementById("search").value;

  // base url for search query
  const baseUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchInput}&key=${apiKey}`;

  getData(baseUrl);
});

// function to fetch the base url
const getData = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      // console.log("data:",data.items);
      showVideo(data.items);
    } else {
      throw new Error("Invalid URL");
    }
  } catch (error) {
    console.log("error:", error);
  }
};

// function to show videos in UI
const showVideo = (videoList) => {
  console.log("videos:", videoList);
  video_subContainer.innerHTML = "";

  // using higher order function
  videoList?.forEach((videos) => {
    // const iframe_mainDiv = document.createElement("div");
    // iframe_mainDiv.classList.add("border-2","border-red-500","h-[30vh]");

    // // using destructuring by taking the same key and comparing with the object
    
    // // const {url} = videos.snippet.thumbnails.medium;
    // // console.log("url:",url);

    // if (videos?.id?.videoId) {
    //   const iframe = document.createElement("iframe");

    //   iframe.src = `https://www.youtube.com/embed/${videos.id.videoId}`;
    //   iframe.classList.add("h-full","w-full","border-2","border-green-500");
    //   iframe.allowFullscreen = true;
    //   iframe.style.borderRadius = "10px";

    //   iframe_mainDiv.append(iframe);
    //   video_subContainer.append(iframe_mainDiv);
    // }

    // using destructuring by comparing the object returned from function

    // const{id:{videoId},snippet:{title,thumbnails:{medium:{url : imageUrl}}}} = videos
    const {videoId,title,url:imageUrl} = getObject(videos);

    if(videoId){
      const thumbnailDiv = document.createElement("div");
      thumbnailDiv.classList.add("border-2","border-green-500","h-[32vh]","cursor-pointer","rounded-lg");

      const imageTag = document.createElement("img");
      imageTag.src = imageUrl;
      imageTag.classList.add("h-full","w-full");

      // click event for thumbnail div
      thumbnailDiv.addEventListener("click",()=>{

        let videoObject = {
          videoId,
          title
        }
        localStorage.setItem("videoObj",JSON.stringify(videoObject));

        window.location.href = "./video.html";
      })

      thumbnailDiv.append(imageTag);
      video_subContainer.append(thumbnailDiv);
    }

  });
};

// function to return object
const getObject = (videoObj)=>{
  return{
    videoId: videoObj.id.videoId,
    title:videoObj.snippet.title,
    url:videoObj.snippet.thumbnails.medium.url
  }
}