const get_video_obj = JSON.parse(localStorage.getItem("videoObj"));
// console.log(get_video_obj);

const video_subContainer = document.querySelector(".video-subContainer");


// function to show videos in iframe
const showVideos = ({videoId,title})=>{
    const iframe_mainDiv = document.createElement("div");
    iframe_mainDiv.classList.add("border-2","border-red-500","h-[50vh]","w-[60%]")

    const iframe_tag = document.createElement("iframe");
    iframe_tag.classList.add("border-2","border-teal-500","h-[40vh]","w-full")
    iframe_tag.src = `https://www.youtube.com/embed/${videoId}`;
    iframe_tag.allowFullscreen = true;
    iframe_tag.style.borderRadius = "10px";

    const title_div = document.createElement("div");
    title_div.classList.add("border-2","border-blue-500","h-[10vh]")

    // appending both iframe tag and title div into iframe main div
    iframe_mainDiv.append(iframe_tag,title_div);
    video_subContainer.append(iframe_mainDiv);
}
showVideos({videoId,title} = get_video_obj);
