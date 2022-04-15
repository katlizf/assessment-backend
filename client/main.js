const activitiesContainer = document.querySelector('#activities-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/activities`

const activitiesCallback = ({data: activities}) => 
displayActivities(activities)
const errCallback = err => console.log(err.response.data)

const getAllActivities = () => axios.get(baseURL).then(activitiesCallback).catch(errCallback)
const createActivity = body => axios.post(baseURL, body).then(activitiesCallback).catch(errCallback)
const deleteActivity = id => axios.delete(`${baseURL}/${id}`).then(activitiesCallback).catch(errCallback)
const updateActivity = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(activitiesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value,
        imageURL: imageURL.value
    }

    createMovie(bodyObj)
    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createActivityCard(activity) {
    const activityCard = document.createElement('div')
    activityCard.classList.add('activity-card')
    
    activityCard.innerHTML = `<img alt='activity in action' src=${activity.imageURL}
    class="activity-title"/>
    <p class="activity-title">${activity.title}</p>
    <div class="btns-container">
    <button onclick="updateActivity(${activity.id}, 'minus)">-</button>
    <p class="activity-rating">${activity.rating} stars</p>
    <button onclick="updateActivity(${activity.id}, 'plus')">+</button>`

    activitiesContainer.appendChild(activityCard)
}

function displayActivities(arr) {
    activitiesContainer.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        createActivityCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllActivities()