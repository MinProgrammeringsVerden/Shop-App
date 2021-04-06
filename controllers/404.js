exports.get404 = (req, res, next) => {
    console.log('404')
    res.status(404).render('404', {
     pageTitle:'404' , 
    path:'404' });
};