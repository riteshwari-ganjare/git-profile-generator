const API="https://api.github.com/users/";
const main=document.getElementById("main");
const form=document.getElementById("form");

const search=document.getElementById("search");

const getUser=async username=>{
    const resp=await fetch(API + username);
    const respData=await resp.json();
    createUserCard(respData);
    getRepos(username);
}
const getRepos=async username=>{
    const resp=await fetch(API + username +"/repos");
    const respData=await resp.json();
    addReposToCard(respData);
}
const addReposToCard=repos=>{
    const reposEl=document.getElementById("repos");
    repos.forEach(repo=>{
        const repoEl=document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href=repo.html_url;
        repoEl.target="_blank";
        repoEl.innerHTML=repo.name;
        reposEl.appendChild(repoEl);

    })
}
const createUserCard=user=>{
    const cardHTML=`
    <div className="container">
   
    <img src="${user.avatar_url}" alt="${user.name}">
    <h6>${user.name}</h6>
    <p>${user.bio}</p>
        
       
        <ul>
            <li><strong>Followers:</strong>${user.followers}</li>
            <li><strong>Following:</strong>${user.following}</li>
            <li><strong>Repos:</strong>${user.public_repos}</li>
            <li><strong>Twitter:</strong>${user.twitter_username}</li>
            <li><strong>Location:</strong>${user.location}</li>
        </ul>
        <div id="repos"></div>
     
  </div>
    `;
    main.innerHTML=cardHTML;
}
getUser("riteshwari-ganjare");
form.addEventListener("submit",e=>{
    e.preventDefault();
    const user=search.value;
    if(user){
        getUser(user);
        search.value="";
    }

})