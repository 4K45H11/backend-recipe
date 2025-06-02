const express = require('express')
const cors = require('cors')
const {initializeDatabase} = require('./db/db.connect')
const recipe = require('./model/recipe.model')
initializeDatabase()

const PORT = 3000
const corsObject = {
    origin: "*",
    credentials: true,  
    methods: ["POST", "GET"]
};


const app = express()
app.use(express.json())
app.use(cors(corsObject))



const createrecipe = async (newrecipe)=>{
    try {
        const recipe = new recipe(newrecipe)
        const savedrecipe = await recipe.save()
        return savedrecipe;
    } catch (error) {
        throw error;
    }
}

app.get('/',(req,res)=>{
    res.send('welcome to the recipe server')
})
app.post('/recipe',async (req,res)=>{
    try {
        const data = await createrecipe(req.body);
        if(data){
            res.status(202).json({message: 'data added successfully!',data})
        }
        
    } catch (error) {
        res.status(500).json({error:`Error occurred: ${error}`})
    }
})

const readAllrecipes = async ()=>{
    try {
        const recipes = await recipe.find()
        
        return recipes;
    } catch (error) {
        throw error;
    }
}

app.get('/recipe',async (req,res)=>{
    try {
        const data = await readAllrecipes();
        if(data){
            res.status(202).json(data)
        }
        else res.status(404).json({message: 'No recipe found'})
        
    } catch (error) {
        res.status(500).json({error:`Error occurred: ${error}`})
    }
})

const readrecipeByTitle = async (title)=>{
    try {
        const recipes = await recipe.findOne({title:title})
        
        return recipes;
    } catch (error) {
        throw error;
    }
}

app.get('/recipe/:titleName',async (req,res)=>{
    try {
        const data = await readrecipeByTitle(req.params.titleName);
        if(data){
            res.status(202).json(data)
        }
        else res.status(404).json({message: 'No recipe found'})
        
    } catch (error) {
        res.status(500).json({error:`Error occurred: ${error}`})
    }
})

const readrecipesByAuthor = async (authorName)=>{
    try {
        const recipes = await recipe.find({author:authorName})
        
        return recipes;
    } catch (error) {
        throw error;
    }
}

app.get('/recipe/author/:name',async (req,res)=>{
    try {
        const data = await readrecipesByAuthor(req.params.name);
        if(data){
            res.status(202).json(data)
        }
        else res.status(404).json({message: 'No recipe found'})
        
    } catch (error) {
        res.status(500).json({error:`Error occurred: ${error}`})
    }
})

const readrecipesByLevel = async (level)=>{
    try {
        const recipes = await recipe.find({difficulty:level})
        
        return recipes;
    } catch (error) {
        throw error;
    }
}

app.get('/recipe/difficulty/:level',async (req,res)=>{
    try {
        const data = await readrecipesByLevel(req.params.level);
        if(data){
            res.status(202).json(data)
        }
        else res.status(404).json({message: 'No recipe found'})
        
    } catch (error) {
        res.status(500).json({error:`Error occurred: ${error}`})
    }
})

const updaterecipesById = async (id,dataToupdate)=>{
    try {
        const recipes = await recipe.findByIdAndUpdate(id,dataToupdate,{new:true})
        
        return recipes;
    } catch (error) {
        throw error;
    }
}

app.post('/recipe/difficulty/:id',async (req,res)=>{
    try {
        const data = await updaterecipesById(req.params.id,req.body);
        if(data){
            res.status(202).json(data)
        }
        else res.status(404).json({message: 'No recipe found'})
        
    } catch (error) {
        res.status(500).json({error:`Error occurred: ${error}`})
    }
})

const updaterecipesByTitle = async (titleName,dataToupdate)=>{
    try {
        const recipes = await recipe.findOneAndUpdate({title:titleName},dataToupdate,{new:true})
        
        return recipes;
    } catch (error) {
        throw error;
    }
}

app.post('/recipe/title/:name',async (req,res)=>{
    try {
        const data = await updaterecipesByTitle(req.params.name,req.body);
        if(data){
            res.status(202).json(data)
        }
        else res.status(404).json({message: 'No recipe found'})
        
    } catch (error) {
        res.status(500).json({error:`Error occurred: ${error}`})
    }
})

const deleterecipesById = async (id)=>{
    try {
        const recipes = await recipe.findByIdAndDelete(id)
        
        return recipes;
    } catch (error) {
        throw error;
    }
}

app.delete('/recipe/:id',async (req,res)=>{
    try {
        const data = await deleterecipesById(req.params.id);
        if(data){
            res.status(202).json({message:"deleted data..",data})
        }
        else res.status(404).json({message: 'No recipe found'})
        
    } catch (error) {
        res.status(500).json({error:`Error occurred: ${error}`})
    }
})

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
