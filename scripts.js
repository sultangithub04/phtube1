function getTimeString(time){
const hour=parseInt(time/3600);
const remainTime= time%3600;
const minute= parseInt(remainTime/60);
const remianingsec= remainTime%60
return `${hour} hour ${minute} minite ${remianingsec} sec`;
}
const removeActiveClass=()=>{
    const getButtton= document.getElementsByClassName('category-btn');
    for(let button of getButtton){
        button.classList.remove("active");
    }
    
    }
const loadDetails=async(videoId)=>{
    const response= await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data= await response.json();
    displayDetails(data.video)
}
const displayDetails=(video)=>{
 const displayModal= document.getElementById('modal-content');
 displayModal.innerHTML=`
 <img src="${video.thumbnail}"/>
 <p>${video.description}</p>
 `
    // way-1
//  document.getElementById('showmodaldata').click();

    // way-2
 document.getElementById('customModal').showModal()

}
const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCatagories(data.categories))
        .catch(error => console.log(error))
}
const loadVideo = (searhText='') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searhText}`)
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
        .catch(error => console.log(error))
}
const loadCategoryVideo = (id) => {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeBtn=document.getElementById(`btn-${id}`)
            activeBtn.classList.add("active");
            displayVideo(data.category)
        })
        .catch(error => console.log(error))
}


const displayCatagories = (category) => {
    const addButton = document.getElementById('catagoryContianer');
    category.forEach(cat => {
        const div = document.createElement('div');
        // div.classList = "btn";
        // div.onclick=()=>{alert('test')};
        div.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideo(${cat.category_id})" class="btn category-btn">${cat.category}</button>
        
        `
        addButton.appendChild(div)
    });
}
const displayVideo = (vide) => {
    const videoContainer = document.getElementById('vedio');
    videoContainer.innerHTML='';
    
    if(vide.length===0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML= `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        
          <img  src="./Icon.png" /> 
          <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
        </div>`
        return;
    }else{
        videoContainer.classList.add('grid');
    }
    vide.forEach(item => {
        const div = document.createElement('div');
        div.classList = "card card-compact";
        div.innerHTML = `

                <figure class="h-[200px] relative">
                    <img class="h-full w-full object-cover"
                    src=${item.thumbnail}
                    alt="Shoes" />
                    ${item.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(item.others.posted_date)}</span>`}
             
                </figure>
                <div class="px-0 py-2 flex gap-2">
                        <div>
                            <img class="w-10 h-10 rounded-full" src=${item.authors[0].profile_picture}>
                        </div>
                        <div>
                            <h2 class="font-bold">${item.title}</h2>
                            <div class="flex items-center gap-2">
                                <h2>${item.authors[0].profile_name}</h2>
                                ${item.authors[0].verified == true ? `<img class="w-5" src='https://img.icons8.com/?size=100&id=63760&format=png&color=000000'/> ` : ""}
                                
                            
                            </div>
                            <p><button onclick="loadDetails('${item.video_id}')" class="btn btn-sm btn-error "> details</button></p>
                        </div>
                    


                </div>
            
    `;
        videoContainer.appendChild(div)
    })
}

document.getElementById('search-input').addEventListener('keyup', (e)=>{
    loadVideo(e.target.value);
})
loadVideo();
loadCatagories();