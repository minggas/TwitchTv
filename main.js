/* jshint esversion:6 */

//Global Variables
const users = ["freecodecamp", "ESL_SC2", "yoda", "alanzoka", "riotgamesbrazil", "jukes", "daniels", "riyuuka", "queenb", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const renderArea = document.querySelector('#results');
const btns = document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', btnToggle));



/*
##########################################################################
 
    Functions to controls the buttons and functions triggered by they

########################################################################## 
*/
function hiddeChannels(state) {
    const hidden = document.querySelectorAll('.hidden');
    hidden.forEach(el => el.classList.remove('hidden'));
    const channels = [...document.querySelectorAll('.channel')].filter(channel => channel.dataset.state === state);
    channels.forEach(el => el.classList.add('hidden'));
}

function btnToggle() {
    const item = document.querySelector('.btn-active');
    item.classList.remove('btn-active');
    this.classList.add('btn-active');
    hiddeChannels(this.dataset.chstate);
}


/*
######################################################################
 
    Functions to get data on Twitch API and render the results

##################################################################### 
*/

function getChannelData(end){
    $.getJSON(end, response => renderData(response));
}

(function getData(user) {
    users.forEach(user => {
        $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?', response => {
            response.stream?renderData(response):getChannelData(`https://wind-bow.gomix.me/twitch-api/channels/${user}?callback=?`);
        
        });
    });
})();
//  Render the data on the DOM

function renderData(data) {
    let logo = data.logo || data.stream.channel.logo;
    let name = data.display_name || data.stream.channel.display_name;
    let link = `https://twitch.tv/${data.name || data.stream.channel.name}`;
    let status = data.stream ? data.stream.channel.status : 'offline';
    let state = data.stream ? 'online' : 'offline';

    renderArea.innerHTML += `
    <div class="channel ${state}" data-state=${state}>
        <div class="logo">
            <img src="${logo}">
        </div>
        <a class="channel-name" target="_blank" href="${link}">
          <h4>${name}</h4>
        </a>
        <p class="status">${status}</p>
    </div>`;
}