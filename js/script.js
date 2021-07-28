// Where your profile information will appear
const overview = document.querySelector(".overview");
const username = "SamL2021";
// List to display repos list
const repoList = document.querySelector(".repo-list");

// Fetch API data
const getGit = async function () {
    const gitRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await gitRequest.json();
    // console.log(data);
    displayData(data);
};

getGit();

// Display the fetched user information on the page
const displayData = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info"); 
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
`;

overview.append(div);
getRepos();
};

const getRepos = async function () {
    const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRequest.json();
    repoInfo(repoData);
};

// Display Info about the repos
const repoInfo = function (repos) {
    for (const repo of repos) {
    const repoItems = document.createElement("li");
    repoItems.classList.add("repo");
    repoItems.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItems);
    }
};

