const express = require('express');
const app = express();
const port = 5471

const projects = [
{ id: 1, title: 'POrtfolio web', technologies: ['React', 'Node.js'] },
{ id: 2, title: 'Fashion Engine Simulator', technologies: ['Vue.js', 'Express'] },
{ id: 3, title: 'Chat bot', technologies: ['Gemini', 'Express' , 'Jupyterlab'] },
];
const workExperience = [
{ id: 1, company: 'Google', position: 'Full Stack Developer' }
];

app.get('/api/projects', (req, res) => {
res.json({ success: true, count: projects.length, data: projects });
});


app.get('/api/experience', (req, res) => {
res.json({ success: true, count: workExperience.length, data: workExperience });
});

app.get('/api/projects/:id', (req, res) => {
const projectId = parseInt(req.params.id);
const project = projects.find(p => p.id === projectId);
if (!project) {
return res.status(404).json({
success: false,
error: 'Project not found'
});
}
res.json({ success: true, data: project });
});

app.listen(port , ()=>{
    console.log(`server is running on port : ${port}`)
})