// getting the selected object from local storage
const get_video_obj = JSON.parse(localStorage.getItem("videoObj"));
// console.log(get_video_obj);

// video sub container where the videos are displayed
const video_subContainer = document.querySelector(".video-subContainer");

// recommendation container where thumbnails are shown
const recommendation_subContainer = document.querySelector(".recommendation-subContainer");

// youtube api key
const apiKey = "AIzaSyAEiqct4ez7etprYnUB1mf_-x2kwmcNLZc";

// getting the form element from html
const myForm = document.querySelector(".myForm");

// submit event for form
myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchInput = document.getElementById("search").value;

  const baseUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchInput}&key=${apiKey}`;

  fetchUrl(baseUrl);
});

// function to fetch the base url
const fetchUrl = async (url) => {
  try {
    let responseObj = await fetch(url);

    if (responseObj.ok) {
      let data = await responseObj.json();
      // console.log("data:",data);
      showVideo(data.items);
      recommendations(data.items);
    } else {
      throw new Error("It's a bad request");
    }
  } catch (error) {
    console.log("error:", error);
  }
};

// function to show videos when somthing is typed on the input search field
const showVideo = (videoList) => {
  video_subContainer.innerHTML = "";

  videoList?.forEach((video) => {
    const {
      id: { videoId },
      snippet: { title },
    } = video;

    if (videoId) {
      const iframe_mainDiv = document.createElement("div");
      iframe_mainDiv.classList.add(
        "border-2",
        "border-red-500",
        "h-[53vh]",
        "w-full",
        "mb-[1rem]"
      );

      const iframe_tag = document.createElement("iframe");
      iframe_tag.classList.add(
        "border-2",
        "border-teal-500",
        "h-[40vh]",
        "w-full"
      );
      iframe_tag.src = `https://www.youtube.com/embed/${videoId}`;
      iframe_tag.allowFullscreen = true;
      iframe_tag.style.borderRadius = "10px";

      const title_div = document.createElement("div");
      title_div.classList.add(
        "border-2",
        "border-blue-500",
        "h-[12vh]",
        "rounded-lg"
      );

      const title_text = document.createElement("p");
      title_text.textContent = title;
      title_text.classList.add("font-semibold", "text-xl", "p-2", "italic");

      // appending title text into title div
      title_div.append(title_text);

      // appending both iframe tag and title div into iframe main div
      iframe_mainDiv.append(iframe_tag, title_div);
      video_subContainer.append(iframe_mainDiv);
    }
  });
};

// function to show videos in iframe with title when clicked on the thumbnails from index.html page
const showSearchedVideos = ({ videoId, title }) => {
  const iframe_mainDiv = document.createElement("div");
  iframe_mainDiv.classList.add(
    "border-2",
    "border-red-500",
    "h-[50vh]",
    "w-full",
  );

  const iframe_tag = document.createElement("iframe");
  iframe_tag.classList.add("border-2", "border-teal-500", "h-[40vh]", "w-full");
  iframe_tag.src = `https://www.youtube.com/embed/${videoId}`;
  iframe_tag.allowFullscreen = true;
  iframe_tag.style.borderRadius = "10px";

  const title_div = document.createElement("div");
  title_div.classList.add(
    "border-2",
    "border-blue-500",
    "h-[10vh]",
    "rounded-lg"
  );

  const title_text = document.createElement("p");
  title_text.textContent = title;
  title_text.classList.add("font-semibold", "text-xl", "p-2", "italic");

  // appending title text into title div
  title_div.append(title_text);

  // appending both iframe tag and title div into iframe main div
  iframe_mainDiv.append(iframe_tag, title_div);
  video_subContainer.append(iframe_mainDiv);
};
showSearchedVideos(({ videoId, title } = get_video_obj));

// function for recommendation container to show thumbnails
const recommendations = (videoArray)=>{
  recommendation_subContainer.innerHTML = "";

  const headingTag = document.createElement("p");
  headingTag.textContent = "Recommendations"
  headingTag.classList.add("border-2","border-red-500","italic","text-lg","font-semibold","text-center");

  recommendation_subContainer.append(headingTag);
}




// function which will return title and thumbnail url
const getTitleAndUrl = (videoProperties)=>{
  return{
    title: videoProperties.snippet.title,
    url: videoProperties.snippet.thumbnails.medium.url
  }
}
