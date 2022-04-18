let activities = require('./db.json')
let id = 4

module.exports = {
    getActivities: (req, res) => {
        res.status(200).send(activities)
    },

    deleteActivity: (req, res) => {
        let index = activities.findIndex(elem => elem.id === +req.params.id)
        activities.splice(index, 1)
        res.status(200).send(activities)
    },

    createActivity: (req, res) => {
        const {title, rating, imageURL} = req.body;
        let newActivity = {
            id: id,
            title,
            rating,
            imageURL
        }
        activities.push(newActivity);
        id++
        res.status(200).send(activities)
    },

    updateActivity: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = activities.findIndex(elem => +elem.id === +id)
        
        if (activities[index].rating === 5 && type === 'plus') {
            res.status(400).send('Cannot go above 5')
       } else if (activities[index].rating === 0 && type === 'minus') {
           res.status(400).send('Cannot go below 0')
       } else if (type === 'minus') {
            activities[index].rating--;
            res.status(200).send(activities)
        } else if (type === 'plus') {
            activities[index].rating++;
            res.status(200).send(activities)
        } else {
            res.status(400).send('Something went wrong...')
        }
    }
}

