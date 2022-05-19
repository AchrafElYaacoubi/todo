import express from 'express';
import verifyToken from "../auth/verifyToken.js";
import { Project, Todo, User} from "../models/index.js";
const router = express.Router();


// create a todo if log in and header is set
router.post("/", verifyToken, async (req, res) => {
    try {
      if (req.user) {
        // user from verifyToken token must be in header
        const { user } = req.user;
        const { description, project_id } = req.body;
        const project = await Project.findOne({where : {id: project_id}});
        if(!project){
          return res.status(403).json({ error: "could not find the project" });
        }
      //   const newTodo = await poll.query(
      //     "INSERT INTO todos (user_id, description, project_id, created_on) VALUES($1, $2, $3, $4) RETURNING *",
      //     [user.user_id, description, parseInt(project_id), created_on ]
      //   );
  
      const newTodo = await Todo.create({description, project_id, user_id: user.id});
      await newTodo.save();
        return res.json(newTodo.toJSON());
      } else {
        return res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
    }
  });


  // update users todo
router.put("/:id", verifyToken, async (req, res) => {
    try {
      if (req.user) {
        const { user } = req.user;
        const { id } = req.params;
        const { description, completed } = req.body;
  
        // try to find and update entry
        const foundTodo = await poll.query(
          "UPDATE todos SET description = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
          [description, completed, parseInt(id), user.user_id]
        );
  
        // console.log(foundTodo.rows[0]);
  
        // check if something was updated
        if (foundTodo.rowCount) {
          res.status(200).json(foundTodo.rows[0]);
        } else {
          res.status(401).json({ error: "forbidden" });
        }
      } else {
        res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
    }
  });

router.get("/:id", verifyToken, async (req, res) => {
    try {
      const { user } = req.user;

      if (req.user) {

        const allTodos = await Todo.findAndCountAll({
            where:{
                user_id: user.id,
                project_id: req.params.id
            },
        })
        return res.json(allTodos.rows);
      } else {
        return res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(503).json({ error: "service unavailable" });
    }
});

// update users todo status
router.put("/status/:id", verifyToken, async (req, res) => {
    try {
      if (req.user) {
        const { user } = req.user;
        const { id } = req.params;
        const { completed } = req.body;
  
        // try to find and update entry
        const foundTodo = await poll.query(
          "UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3",
          [completed, id, user.user_id]
        );
  
        // check if something was updated
        if (foundTodo.rowCount) {
          res.status(200).json({ message: "Todo was updated!" });
        } else {
          res.status(401).json({ error: "forbidden" });
        }
      } else {
        res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
    }
});

// delete users todo
router.delete("/:id", verifyToken, async (req, res) => {
    try {
      if (req.user) {
        const { id } = req.params;
        const { user } = req.user;
  
        // deleting todo
        const deletedTodo = await poll.query(
          "DELETE FROM todos WHERE id = $1 AND user_id = $2",
          [id, user.user_id]
        );
  
        // checking if todo was found and deleted
        if (deletedTodo.rowCount) {
          res.status(200).json({ message: "Todo was deleted!" });
        } else {
          res.status(401).json({ error: "forbidden" });
        }
      } else {
        res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
    }
});

export default router;