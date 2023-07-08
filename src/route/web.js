import express from "express";
import homeController from "../controllers/homeController";
import multer from 'multer'; // Import multer
import db from '../models/index';
import slugify from 'slugify'; // Thêm dòng này

const clinicRoutes = require('./clinic');
const nhapphongkhamRoutes = require('./nhapphongkham');
const dangkyRoutes = require('./dangky');
const thongtinRoutes = require('./thongtin');
let router = express.Router();
let initWebRoutes = (app) => {
    // Configure multer
    let upload = multer();
    app.use(upload.array());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.use('/clinic', clinicRoutes);
    router.use('/dangky', dangkyRoutes);
    router.use('/nhapphongkham', nhapphongkhamRoutes);
    router.use('/thongtin', thongtinRoutes);
    router.get('/chinhsua', homeController.geteditCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    return app.use("/", router);
}
    

module.exports = initWebRoutes;