const express = require('express')
     
const app = express()
app.use('/', express.static('public'))
app.listen(8080)

const Sequelize = require('sequelize')

const sequelize = new Sequelize('MovieDirector', 'root', '', {
    dialect: "mysql",
    host: "localhost"
})
sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

const User = sequelize.define('users', {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    email:Sequelize.STRING,
    username:Sequelize.STRING
})

const Genre=sequelize.define('genres',{
    name:Sequelize.STRING,
    
})

const Movie = sequelize.define('movies',{
  
    title:Sequelize.STRING,
    duration:Sequelize.INTEGER,
    year:Sequelize.INTEGER
})
/*
const RandGenuri=sequelize.define('randgenuri',{
    idRg:{ type:Sequelize.INTEGER,primaryKey:true},
    idGen:{ type:Sequelize.INTEGER,
             references:{
                 model:Genuri,
                 key:'codGen',
                   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
             }
    },
    idFilm:{ type:Sequelize.INTEGER,
             references:{
                 model:Film,
                 key:'codFilm',
                   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
             }
    },
})
const FilmeFavorite=sequelize.define('filmefavorite',{
    idFf:{type:Sequelize.INTEGER,primaryKey:true},
    codFilm:{ type:Sequelize.INTEGER,
             references:{
                 model:Film,
                 key:'codFilm',
                   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
             }
    },
    codUtilizator:{ type:Sequelize.INTEGER,
             references:{
                 model:Utilizatori,
                 key:'idUtilizator',
                   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
             }
    },
})
*/
//definire relatii intre tabele
//Users.belongsTo(Libraries, {foreignKey: 'id_library'})
//Books.belongsTo(Categories, {foreignKey: 'id_category'})

//Genuri.belongsToMany(Film,{through:'randgenuri' })
//Libraries.belongsToMany(Books, {through:'Books_Library'})

Genre.belongsToMany(Movie, {through: 'MovieGenre'});
Movie.belongsToMany(Genre, {through: 'MovieGenre'});

Movie.belongsToMany(User,{through:'MovieUser'});
User.belongsToMany(Movie,{through:'MovieUser'});


/*app.get('/film/:id', function(request, response) {
    Film.findAll({where: {codGen:request.params.codGen}}).then(
        function(category) {
                        if(category) {
                                       response.status(200).send(category)
                            } else {
                                     response.status(404).send()}           
                             })  
  
})
*/



app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})



app.use(express.json())
app.use(express.urlencoded())

//definire endpoint POST /messages
app.post('/users', (request, response) => {
    User.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.post('/genres', (request, response) => {
    Genre.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.post('/movies', (request, response) => {
    Movie.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})
/*
app.post('/randgenuri', (request, response) => {
    RandGenuri.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})
app.post('/filmefavorite', (request, response) => {
    FilmeFavorite.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

*/
app.get('/users', (request, response) => {
    User.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/users/:id', (request, response) => {
    User.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})

app.get('/users', (request, response) => {
    User.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/users/:id', (request, response) => {
    User.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})
app.get('/genres', (request, response) => {
    Genre.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/genres/:id', (request, response) => {
    Genre.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})




app.get('/movies', (request, response) => {
    Movie.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/movies/:id', (request, response) => {
    Movie.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})
/*
app.get('/randgenuri', (request, response) => {
    RandGenuri.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/randgenuri/:idRg', (request, response) => {
    RandGenuri.findById(request.params.idRg).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})*/

app.put('/users/:id', (request, response) => {
    User.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/genres/:id', (request, response) => {
    Genre.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/movie/:id', (request, response) => {
    Movie.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
/*
app.put('/randgenuri/:idRg', (request, response) => {
    RandGenuri.findById(request.params.idRg).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/filmefavorite/:idFf', (request, response) => {
    FilmeFavorite.findById(request.params.idFf).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.get('/filmefavorite', (request, response) => {
    FilmeFavorite.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/filmefavorite/:idFf', (request, response) => {
    Utilizatori.findById(request.params.idFf).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
    
    
})
*/
app.delete('/users/:id', (request, response) => {
    User.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
app.delete('/genres/:id', (request, response) => {
    Genre.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/movies/:id', (request, response) => {
    Movie.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
/*
app.delete('/randgenuri/:idRg', (request, response) => {
    RandGenuri.findById(request.params.idRg).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/filmefavorite/:idFf', (request, response) => {
    FilmeFavorite.findById(request.params.idFf).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})*/
/*
app.get('/genuri/:codGen/filme', (req,res,next)=>{
    try{
        let genuri= Genuri.findById(req.params.codGen)
        if(genuri){
            let film= Film.getFilm();
            res.status(200).json(film);
        }
        else{
            res.status(404).json({genuri: 'not found'});
        }
    }
    catch(e){
        next(e);        
    }
})*/


app.get('/users/:id/movies', async (req, res, next) => {
	try{
		let user = await User.findById(req.params.id)
		if (user){
			let movies = await user.getMovies()
			res.status(200).json(movies)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		next(e)
	}	
})

app.post('/users/:id/movies', async (req, res, next) => {
	try{
		let user = await User.findById(req.params.id)
		let movie = await Movie.create(req.body)
        user.addMovies(movie)
		res.status(200).json({message : 'created'})
	}
	catch(e){
		next(e)
	}
})



app.get('/genres/:id/movies', async (req, res, next) => {
	try{
		let genre = await Genre.findById(req.params.id)
		if (genre){
			let movies = await genre.getMovies()
			res.status(200).json(movies)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		next(e)
	}	
})

app.post('/genres/:id/movies', async (req, res, next) => {
	try{
		let genre = await Genre.findById(req.params.id)
		let movie = await Movie.create(req.body)
        genre.addMovie(movie)
		res.status(200).json({message : 'created'})
	}
	catch(e){
		next(e)
	}
})

/*


app.post('/users/:id/movies', function(req, res) {
	try {
		let user =  User.findById(req.params.id)
		if (user){
			let movie = req.body
			movie. = utilizator.id
			Film.create(film)
			res.status(201).json({message : 'created'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}
})

//app.get('/create', async (req, res, next) => {try{await sequelize.sync({force : true});res.status(200).json({message : 'created'})}	catch(e){		next(e)	}})

app.get('/utilizatori/:id/filme', async (request, response, next) => {
    try{
        let utilizator = await Utilizatori.findById(request.params.id);
        if (utilizator){
            let filme = await utilizator.getFilm();
        response.status(200).json(filme)
		}
	else{
			response.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		next(e)
	}	
})

*/