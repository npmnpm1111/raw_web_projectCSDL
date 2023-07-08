import express from "express";
import homeController from "../controllers/homeController";
import multer from 'multer'; // Import multer
import db from '../models/index';
import slugify from 'slugify'; // Thêm dòng này
let router = express.Router();

let initWebRoutes = (app) => {
    // Configure multer
    let upload = multer();
    app.use(upload.array());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    router.get('/nhapphongkham', (req, res) => {
        res.render('nhapphongkham', { successMessage: null, errorMessage: null });
    });
    
    router.post('/nhapphongkham', (req, res) => {
        const { name, address, description } = req.body;
    
        const slug = slugify(name, { lower: true, strict: true }); // Thêm dòng này
    
        db.Clinic.create({
            name: name,
            address: address,
            description: description,
            slug: slug, // Thêm dòng này
        })
        .then(() => {
            res.redirect('/clinic/' + slug); // Sửa dòng này
        })
        .catch((error) => {
            console.log(error);
            res.render('nhapphongkham.ejs', { successMessage: null, errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
        });
    });  

    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/dangky', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/thongtin', homeController.displaygetCRUD);
    router.get('/chinhsua', homeController.geteditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.get('/chuyen-khoa', (req, res) => {
        res.render('chuyen-khoa', {
            specialties: ['Tim mạch', 'Thần kinh']
        });
    });

    router.get('/chuyen-khoa/tim-mach', (req, res) => {
        res.render('timmach.ejs');
    });
    router.get('/chuyen-khoa/than-kinh', (req, res) => {
        res.render('thankinh');
    });
    router.get('/clinic/:slug', (req, res) => {
        const slug = req.params.slug;
        
        db.Clinic.findOne({
            where: { slug: slug }
        })
        .then((clinic) => {
            if (clinic) {
                res.render('clinic-detail', { clinic: clinic });
            } else {
                res.status(404).send('Clinic not found.');
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('DMM');
        });
    });
        
    router.get('/clinic', (req, res) => {
        res.render('clinic');
    });
    
    return app.use("/", router);
}
    

module.exports = initWebRoutes;