import express from 'express';
import ProjectsServices from '../../Services/ProjectsServices/ProjectsServices';

const router = express.Router();

router.get('/data', ProjectsServices.GetAllProjects);
router.get('/proprieties/:prjToken', ProjectsServices.GetProjectData);
router.get('/level-file/:prjToken', ProjectsServices.GetProjectLevelFile);

export = router;
