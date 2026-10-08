import "./Skills.css";

function Skills({ skills = [], onSkillClick }) {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>
          <p className="skill-title">{skill.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default Skills;
