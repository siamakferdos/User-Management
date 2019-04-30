var express = require('express');
var router = express.Router();

var DAL = require('../../modules/DAL.js')

//Gets Program List
router.get('/', function (req, res) {
    var initData = {};
    DAL('uspGetPrograms', null, function (err, records) {
        initData.programs = records.Programs;
        DAL('uspGetProgramElements', { "ProgramId": initData.programs[0].ProgramId }, function (err, records) {
            initData.elements = records.Elements;
            res.send(initData);
        })    
    
        // res.send(initData);
    })

})

//Gets program Element list
router.post('/getElements', function (req, res) {
    if(!isNaN(req.body.ProgramId))
        DAL('uspGetProgramElements', req.body, function (err, records) {
            res.send(records.Elements);
        })
})


//Gets available element type of given element type id
router.post('/getElementTypes',  function (req, res) {
    if(!isNaN(req.body.ElementTypeId))
        DAL('uspGetElementType', req.body, function(err, records){
            res.send(records.ElementTypes);
        })
})

//Gets data of element if element is selected to update, otherwise renders empty partial 
// router.post('/getElementTypesPartial',  function (req, res) {
//      var ElementId = req.body.ElementId;
//      var ElementTypeId = req.body.ElementTypeId;
//          var elementData;
//      
//      if(!isNaN(ElementId))
//      if(ElementId == -1)   
//         switch(ElementTypeId){               
//                 case 3:
//                     elementData = {ClassName:"", EnglishName : "",  FarsiName : ""};
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/plugin", elementData);
//                     break; 
//                 case 4:
//                      elementData = 
//                         {ServerName : "", Name:"", IsRemote:false, AuthenticateMode:"",
//                          Login:"", Password:"", Status:""};  
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/database", elementData);
//                     break; 
//                 case 5:
//                     elementData = {Name: ""};                                     
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/image", elementData);
//                     break;    
//                 case 6:               
//                 case 7:   
//                 case 9:   
//                     elementData = {EnglishName : "",  FarsiName : ""};
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/sharedElements", elementData);
//                     break;
//                 case 8:
//                     elementData = {Name:"", Order:0};                                                   
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/menu", elementData);
//                     break;     
//                                
//             }  
//      else 
//         DAL('uspGetElementTypeData', req.body, function(err, records){            
//             switch(ElementTypeId){               
//                 case "3":
//                     elementData = {ClassName:"", EnglishName : "",  FarsiName : ""};                     
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]             
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/plugin", elementData);
//                     break; 
//                 case "4":
//                      elementData = 
//                         {ServerName : "", Name:"", IsRemote:false, AuthenticateMode:"",
//                          Login:"", Password:"", Status:""};                     
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]             
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/database", elementData);
//                     break; 
//                 case "5":
//                     elementData = {Name: ""};                     
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]             
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/database", elementData);
//                     break;    
//                 case "6":               
//                 case "7":   
//                 case "9":   
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]              
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/sharedElements", elementData);
//                     break;
//                 case "8":
//                     elementData = {Name:"", Order:0};                     
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]             
//                     elementData.eType = ElementTypeId;
//                     res.render("partials/menu", elementData);
//                     break;     
//                                
//             }
//      })
// })

// router.get('/editElement',  function (req, res) {
//      var elementId = req.query.elementId;
//      var elementTypeId = req.query.elementTypeId;
//          var elementData;
//      
//      //if(!isNaN(elementId))
//     //  if(elementId == -1)   
//     //     switch(elementTypeId){               
//     //             case 3:
//     //                 elementData = {ClassName:"", EnglishName : "",  FarsiName : ""};
//     //                 elementData.eType = elementTypeId;
//     //                 res.render("partials/plugin", elementData);
//     //                 break; 
//     //             case 4:
//     //                  elementData = 
//     //                     {ServerName : "", Name:"", IsRemote:false, AuthenticateMode:"",
//     //                      Login:"", Password:"", Status:""};  
//     //                 elementData.eType = elementTypeId;
//     //                 res.render("partials/database", elementData);
//     //                 break; 
//     //             case 5:
//     //                 elementData = {Name: ""};                                     
//     //                 elementData.eType = elementTypeId;
//     //                 res.render("partials/image", elementData);
//     //                 break;    
//     //             case 6:               
//     //             case 7:   
//     //             case 9:   
//     //                 elementData = {EnglishName : "",  FarsiName : ""};
//     //                 elementData.eType = elementTypeId;
//     //                 res.render("partials/sharedElements", elementData);
//     //                 break;
//     //             case 8:
//     //                 elementData = {Name:"", Order:0};                                                   
//     //                 elementData.eType = elementTypeId;
//     //                 res.render("partials/menu", elementData);
//     //                 break;     
//                                
//     //         }  
//     //  else 
//         DAL('uspGetelementTypeData', req.query, function(err, records){            
//             switch(elementTypeId){               
//                 case "3":
//                     elementData = {ClassName:"", englishName : "",  FarsiName : ""};                     
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]             
//                     elementData.eType = elementTypeId;
//                     res.render("partials/plugin", elementData);
//                     break; 
//                 case "4":
//                      elementData = 
//                         {ServerName : "", Name:"", IsRemote:false, AuthenticateMode:"",
//                          Login:"", Password:"", Status:""};                     
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]             
//                     elementData.eType = elementTypeId;
//                     res.render("partials/database", elementData);
//                     break; 
//                 case "5":
//                     elementData = {Name: ""};                     
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]             
//                     elementData.eType = elementTypeId;
//                     res.render("partials/database", elementData);
//                     break;    
//                 case "6":               
//                 case "7":   
//                 case "9":   
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]              
//                     elementData.eType = elementTypeId;
//                     res.render("partials/sharedelements", elementData);
//                     break;
//                 case "8":
//                     elementData = {Name:"", Order:0};                     
//                     if(records.ElementData.length > 0)
//                         elementData =  records.ElementData[0]             
//                     elementData.eType = elementTypeId;
//                     res.render("partials/menu", elementData);
//                     break;     
//                                
//             }
//      })
// })

router.post('/addElement',  function (req, res) {     
     DAL('uspAddElement', req.body, function(err, records){
         res.send(0)
     });
})

router.post('/editElement',  function (req, res) {     
     DAL('uspEditElement', req.body, function(err, records){
         res.send(0)
     });
})

router.get('/loadElementPartial', function (req, res) {
    var elementType = {eType : req.query.elementTypeId}
    switch (req.query.elementTypeId) {
        case "3":
            res.render('partials/plugin', elementType)
            break;
        case "4":
            res.render('partials/database', elementType)
            break;
        case "5":
            res.render('partials/image', elementType)
            break;
        case "6":
        case "7":
        case "9":
            res.render('partials/sharedElements', elementType)
            break;
        case "8":
            res.render('partials/menu', elementType)
            break;
    }
})

// router.get('/definations/editElement', function (req, res) {
//     var elementType = {eType : req.query.elementTypeId}
//     switch (req.query.elementTypeId) {
//         case "3":
//             res.render('partials/plugin', elementType)
//             break;
//         case "4":
//             res.render('partials/database', elementType)
//             break;
//         case "5":
//             res.render('partials/image', elementType)
//             break;
//         case "6":
//         case "7":
//         case "9":
//             res.render('partials/sharedElements', elementType)
//             break;
//         case "8":
//             res.render('partials/menu', elementType)
//             break;
//     }
// })

router.post("/getElementData", function(req, res){
    DAL('uspGetelementTypeData', req.body, function(err, records){
        res.send(records.ElementData);
    })
})



module.exports = router;


    //var elementElementIdTypeModel = {};
    
        
        
        