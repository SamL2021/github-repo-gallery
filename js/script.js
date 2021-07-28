// Where your profile information will appear
const overview = document.querySelector(".overview");
const username = "SamL2021";
// List to display repos list
const repoList = document.querySelector(".repo-list");
// Section where all the repo information appears
const mainSection = document.querySelector(".repos");
// Where the individual repo data will appear
const individualRepo = document.querySelector(".repo-data");

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
    repoDisplay(repoData);
};

// Display Info about the repos
const repoDisplay = function (repos) {
    for (const repo of repos) {
    const repoItems = document.createElement("li");
    repoItems.classList.add("repo");
    repoItems.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItems);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specificInfo(repoName);
    }
});

// Get Specific Repo Info
const specificInfo = async function (repoName) {
    const specificRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepo.json();
    console.log(repoInfo);

  // Grab languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  // Make a list of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }

displaySpecificInfo(repoInfo, languages);
};

// Display Specific Repo Info
const displaySpecificInfo = async function (repoInfo, languages) {
    individualRepo.innerHTML = "";
    individualRepo.classList.remove("hide"); 
    mainSection.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    individualRepo.append(div);
  };
