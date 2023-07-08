import db from '../models/index';
import user from '../models/user';
import CRUDservices from '../services/CRUDservices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};


let displaygetCRUD = async (req, res) => {
    try {
        let data = await CRUDservices.getAllUser();
        
        return res.render('displayCRUD.ejs', {
            dataTable: data
        });
    } catch (e) {
        console.log(e);
    }
};

let geteditCRUD = async (req, res) => {
    let userid = req.query.id;
    console.log(userid);
    if (userid) {
        let userdata = await CRUDservices.getUserInfobyID(userid);
        
        return res.render('editCRUD.ejs', {
            user: userdata
        });
    } else {
        return res.send('User not found!');
    }
};


let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body);
    console.log(message);
    return res.redirect('/thongtin');
};

let putCRUD = async(req,res) => {
    let data = req.body;
    await CRUDservices.updateUserData(data);
    return res.redirect('/thongtin'); 
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    await CRUDservices.deleteUser(id);
    res.redirect('/thongtin');
}

let getChuyenKhoaPage = (req, res) => { // new function
    res.render('clinic.ejs');
}

let getChuyenKhoaSpecialtyPage = (req, res) => { // new function
    let specialty = req.params.specialty;
    res.render('chuyenkhoa_specialty.ejs', {specialty: specialty});
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displaygetCRUD: displaygetCRUD,
    geteditCRUD: geteditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD, // Export the new function
    getChuyenKhoaPage: getChuyenKhoaPage,
    getChuyenKhoaSpecialtyPage: getChuyenKhoaSpecialtyPage
};
