const express = require('express');
// const { MongoClient } = require('mongodb');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'resumeData';
let db;

app.use(express.json());
// creating the data
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

// reading the data
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

// updating the data
app.put('/api/projects/:id', async (req, res) => {
try {
const projectId = req.params.id;
const objectId = new ObjectId(projectId);
const updateData = req.body;
updateData.updatedAt = new Date();
const result = await db.collection('projects').updateOne(
{ _id: objectId },
{ $set: updateData }
);
console.log(projectId)
console.log(objectId)
console.log(updateData)
console.log(result)
if (result.matchedCount === 0) {
return res.status(404).json({
success: false,
error: 'Project not found'
});
}
res.json({
success: true,
message: 'Project updated successfully',
modifiedCount: result.modifiedCount
});
} catch (error) {
console.error("❌ Error in PUT /api/projects:", error);
res.status(500).json({
success: false,
error: 'Failed to update project'
});
}
});
// DELETE the data stored via diffrent route endpoints
app.delete('/api/projects/:id', async  (req, res) => {
try {
const projectId = req.params.id;
const objectId = new ObjectId(projectId);
const result = await db.collection('projects').deleteOne({
_id: objectId
});
console.log(projectId)
console.log(objectId)
console.log(result)
if (result.deletedCount === 0) {
return res.status(404).json({
success: false,
error: 'Project not found'
});
}
res.status(204).send();
} catch (error) {
res.status(500).json({
success: false,
error: 'Failed to delete project'
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