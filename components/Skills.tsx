import skillGroups, { skillIcons } from "../constants/skillsElements";

const Skills = () => (
    <section id="skills" className="section">
        <h2 className="sub-heading">Skills</h2>
        <div className="skills-groups">
            {skillGroups.map((group) => (
                <div key={group.category} className="skill-group">
                    <h3 className="skill-group-title">{group.category}</h3>
                    <ul className="skill-list">
                        {group.items.map((item) => (
                            <li key={item.name} className="skill-chip">
                                {item.icon && skillIcons[item.icon] && (
                                    <svg
                                        className="skill-icon"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path d={skillIcons[item.icon]} />
                                    </svg>
                                )}
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

export default Skills;
