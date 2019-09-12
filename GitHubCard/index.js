
function createCard(data) {
  // create elements
  let card = document.createElement('div');
  let image = document.createElement('img');
  let cardInfo = document.createElement('div');
  let name = document.createElement('h3');
  let username = document.createElement('p');
  let location = document.createElement('p');
  let profile = document.createElement('p');
  let profileAddress = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');

  // compose elements
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  profile.appendChild(profileAddress);

  // classify elements
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");

  // add content to elements
  image.src = data["avatar_url"];
  name.textContent = data.name;
  username.textContent = data.login;
  location.textContent = `Location: ${data.location}`;
  profile.innerHTML = `Profile: <a href=${data.html_url}>${data.html_url}</a>`;
  followers.textContent = `Followers: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  bio.textContent = `Bio: ${data.bio}`;

  return card;
}

const cardlist = document.querySelector(".cards");
const followersArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];
let followersURL;
axios.get("https://api.github.com/users/garybot")
    .then(response => {
      const myCard = createCard(response.data);
      cardlist.appendChild(myCard);
      return response;
    })
    .then(response => {
      axios.get(response.data.followers_url)
          .then(response => {
            console.log(response);
            response.data.forEach(user => {
              const card = createCard(user);
              cardlist.appendChild(card);
            })
          })
    })
    .catch(err => console.log(err));


followersArray.forEach(uid => {
  axios.get(`https://api.github.com/users/${uid}`)
    .then(response => {
      const card = createCard(response.data);
      cardlist.appendChild(card);
    })
    .catch(err => console.log(err));

})
