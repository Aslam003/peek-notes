const express = require("express");
const router = express.Router();
router.use(express.json());
const Note = require("../../models/Notes");

//Home route of notes
router.post("/users", function(req,res){
        Note.findOne({userId:req.body.id}, function(err,foundUser){
            if(foundUser){
                res.json(foundUser.notes);
            }
            else if(!foundUser){
                const newNotes = new Note({
                    userId:req.body.id,
                    notes:[{
                        title:"Welcome "+req.body.name,
                        content:"Your saved notes will be here!!"
                    }]
                })
                newNotes.save();
                res.send(newNotes.notes);
            }
            else{
                res.send(err);
            }
        });
});

//Updating added notes
router.put("/", function(req,res){
    const{userId,prevTitle,title,content} = req.body;
    Note.updateOne({userId:userId,"notes.title":prevTitle}, {
        "$set" : {
            "notes.$.title":title,
            "notes.$.content":content
        }
    }, function(err,result){
        if(err){
            res.send(err);
        } else {
            res.send(result);
            
        }
    })
    
})

//adding notes
router.post("/", function(req,res){
    const {userId,title,content} = req.body;
    Note.findOne({userId:userId}, function(err, user){
        if(user){
            Note.updateOne({"userId": userId }, 
                { $push:{ 
                    notes:[{ "title":title,
                        "content":content
                    }]
                }
            }, function(err,result){
                if(err){
                    res.json(err);
                }else{
                    res.send(result);
                }
            }
            );
        }
        });
    });

    //Deleting notes
    router.delete("/", function(req,res){
        const {user,title} = req.body;
        Note.findOne({userId:user}, function (err,foundUser) {
            if(foundUser){
                Note.updateOne({userId:foundUser.userId},{
                      $pull: {
                          notes: {
                              title:title
                          }
                      }  
                }, function(err,result){
                    if(err){
                        res.send(err);
                    }else{
                        res.send(result);
                    }
                } );
                
            }
        });
    });

module.exports = router;