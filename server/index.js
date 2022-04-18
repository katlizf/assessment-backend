const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get('/api/fortune', (req, res) => {
  const fortunes = ["A fresh start will put you on your way", "A golden egg of opportunity falls into your lap this month", "A lifetime of happieness lies ahead of you", "A smile is your personal welcome mat", "Adventure can be real happiness"
  ];
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune)
})


const {getActivities, createActivity, deleteActivity, updateActivity} = require('./controller')

app.get('/api/activities', getActivities)
app.post('/api/activities', createActivity)
app.put('/api/activities/:id', updateActivity)
app.delete('/api/activities/:id', deleteActivity)

app.listen(4000, () => console.log("Server running on 4000"));
