import express from 'express';
import { newTask, getMyTasks, updateMyTasks, deleteMyTasks } from '../controllers/task.js';
import { isAuthinticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/new', isAuthinticated, newTask);
router.get('/my', isAuthinticated, getMyTasks);
router.put("/:id",isAuthinticated, updateMyTasks);
router.delete("/:id",isAuthinticated, deleteMyTasks);

export default router;