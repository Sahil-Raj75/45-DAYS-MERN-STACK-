const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'resumeData';
let db;

app.use(express.json());

app.post('/api/projects', async (req, res) => {
  try {
    
    console.log(req.body); // optional line hai dosto ! 
    // hello my connections this line log incoming JSON body

    const projectData = req.body;

    if (!projectData.title || !projectData.description) {
      return res.status(400).json({
        success: false,
        error: 'Title and description are required'
      });
    }

    projectData.createdAt = new Date();
    projectData.updatedAt = new Date();

    const result = await db.collection('projects').insertOne(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { ...projectData, _id: result.insertedId }
    });
  } catch (error) {
    console.error(" Error in POST /api/projects:", error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    });
  }
});


app.get('/api/projects', async (req, res) => {
try {

const projects = await db.collection('projects').find({}).toArray();
res.json({
success: true,
count: projects.length,
data: projects
});
} catch (error) {
res.status(500).json({
success: false,
error: 'Failed to retrieve projects'
});
}
});
// Connect to MongoDB and start server
MongoClient.connect(mongoUrl).then(client => {
db = client.db(dbName);
console.log('Connected to MongoDB');
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
});