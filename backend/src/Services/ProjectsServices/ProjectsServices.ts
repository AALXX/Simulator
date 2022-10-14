import { validationResult } from 'express-validator';
import logging from '../../config/logging';
import { connect, query } from '../../config/mysql';
import { Request, Response } from 'express';
import fs from 'fs';

const NAMESPACE = 'ServerProjectsData';

const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return {
            errorMsg: error.msg,
        };
    },
});

const GetAllProjects = (req: Request, res: Response) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ error: true, errors: errors.array() });
    }

    const GetProjectQueryString = `SELECT * FROM projects;`;
    connect()
        .then((connection) => {
            //* deepcode ignore Sqli: <please specify a reason of ignoring this>
            query(connection, GetProjectQueryString)
                .then((results) => {
                    const data = JSON.parse(JSON.stringify(results));

                    //* it checks if data object has values if not it sends back account ecist false
                    if (Object.keys(data).length === 0) {
                        return res.status(200).json({
                            error: true,
                            message: 'No ProjectsFound',
                        });
                    }

                    return res.status(200).json({
                        error: false,
                        projects: data,
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        error: true,
                        message: error,
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                error: true,
                message: error,
            });
        });
};

const GetProjectData = (req: Request, res: Response) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ error: true, errors: errors.array() });
    }

    const GetProjectQueryString = `SELECT ProjectName FROM projects WHERE ProjectToken="${req.params.prjToken}";`;
    connect()
        .then((connection) => {
            //* deepcode ignore Sqli: <please specify a reason of ignoring this>
            query(connection, GetProjectQueryString)
                .then((results) => {
                    const data = JSON.parse(JSON.stringify(results));

                    //* it checks if data object has values if not it sends back account ecist false
                    if (Object.keys(data).length === 0) {
                        return res.status(200).json({
                            error: true,
                            message: 'project not found',
                        });
                    }

                    return res.status(200).json({
                        error: false,
                        projectToken: data[0].ProjectName,
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        error: true,
                        message: error,
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                error: true,
                message: error,
            });
        });
};

const GetProjectLevelFile = (req: Request, res: Response) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ error: true, errors: errors.array() });
    }

    fs.stat(`../Projects/${req.params.prjToken}/project_file.json`, (err) => {
        if (err) {
            return res.status(200).json({ error: true, message: err.message });
        }

        //* deepcode ignore PT: <input sanitized in routes file>
        fs.readFile(`../Projects/${req.params.prjToken}/project_file.json`, 'utf8', function read(err, projectFile) {
            if (err) {
                return res.status(200).json({ error: true, message: err.message });
            }
            return res.status(200).json({ error: false, ProjectData: JSON.parse(projectFile) });
        });
    });
};

export default {
    GetAllProjects,
    GetProjectData,
    GetProjectLevelFile,
};
