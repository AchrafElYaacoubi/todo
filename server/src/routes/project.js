import express from 'express';
import verifyToken from "../auth/verifyToken.js";
import { Project, Todo } from "../models/index.js";
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
    try {
      if (req.user) {
        const { user } = req.user;
        const { name } = req.body;
        const newProject = await Project.create({ name, user_id: user.id });
        await newProject.save();
        res.json(newProject.toJSON());
      } else {
        res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
    }
});

router.get("/", verifyToken, async (req, res) => {
    try {
        const { user } = req.user;
      if (req.user) {
        const allProjects = await Project.findAndCountAll({
            where:{
                user_id: user.id
            },
            include: Todo
        })
        return res.json(allProjects.rows);
      } else {
        return res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(503).json({ error: "service unavailable" });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try {
      if (req.user) {
        const { id } = req.params;
        const deletedProject = await Project.findOne({where: { id }});
        if(deletedProject) {
            await deletedProject.destroy();
            return res.status(200).json({ message: "Project was deleted!" }) 
        } else {
            res.status(403).json({ error: "no project" });
        }
      } else {
        res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
});

export default router;