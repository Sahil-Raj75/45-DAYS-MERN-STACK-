const skills = [
    { name: "HTML", proficiency: "Intermediate" },
    { name: "CSS", proficiency: "Intermediate" },
    { name: "JavaScript", proficiency: "Advanced" },
    { name: "React", proficiency: "Intermediate" },
    { name: "Node.js", proficiency: "Beginner" }
];

const skillStrings = skills.map(skill => ` ${skill.name} (${skill.proficiency})`);

console.log(skillStrings);