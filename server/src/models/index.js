import User from "./user.js";
import Project from "./project.js";
import Todo from "./todo.js";

User.hasMany(Project);
Project.belongsTo(User);
Project.hasMany(Todo, { onDelete: 'CASCADE', hooks: true });
Todo.belongsTo(Project);

export { User, Project, Todo };
