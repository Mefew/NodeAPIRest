const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Mundo =  require('../models/Mundo');
const User =  require('../models/User');

const router = express.Router();

router.use(authMiddleware);

const textoDefault = `

Lorem ipsum fermentum commodo laoreet semper molestie convallis iaculis taciti, himenaeos vivamus tempus cubilia massa tristique sociosqu nec, diam porttitor euismod mollis euismod netus pellentesque sollicitudin. placerat interdum id aliquet condimentum nec suscipit eget praesent torquent tristique, vehicula potenti fusce class congue taciti magna volutpat. eleifend proin dolor dapibus enim mi vulputate interdum litora fusce, conubia sem vivamus tellus orci justo primis quam, suspendisse hendrerit in elit platea fermentum eleifend ut. sociosqu sapien etiam enim tempor inceptos pulvinar pellentesque curabitur eu, curabitur eget porta nostra lorem accumsan velit litora condimentum habitasse, taciti nisl dictumst metus ultricies scelerisque mi ante. 

Neque adipiscing potenti ultrices habitasse accumsan eget at ad donec hendrerit, risus mattis velit feugiat leo quisque conubia nostra praesent. porttitor fermentum nam a tristique porta vitae semper quam, habitant proin sollicitudin cursus lacinia semper purus sed orci, fames tellus placerat sed torquent suscipit porta. interdum elementum eget rhoncus euismod hac vehicula, vitae posuere felis venenatis tempor nullam gravida, velit arcu sociosqu quisque vestibulum. porttitor malesuada ornare netus donec quam semper vivamus platea lacinia, mauris consectetur diam dictumst placerat nulla elit rhoncus id, conubia blandit volutpat non dictumst pretium turpis sit. 

Imperdiet a litora donec interdum vulputate pulvinar sodales, senectus sit condimentum turpis aliquam felis quisque, aliquam sodales orci quam tempus nostra, aliquam lacus sociosqu mattis sodales praesent. diam nostra phasellus sollicitudin pretium inceptos maecenas, mattis volutpat nostra neque praesent nec et, elit ornare lobortis nostra facilisis. ullamcorper tempor venenatis ullamcorper rhoncus nulla ac potenti aenean tempus, vestibulum tellus fusce curae porttitor quis fermentum curae, tincidunt erat fames ad leo ut justo platea. venenatis proin lacinia fermentum curabitur est augue tristique sapien, libero sem netus nisi dictumst pharetra senectus et, massa tincidunt lacinia nunc iaculis molestie nullam. 
					
`


router.post('/', async (req, res) => {
    const email = req.body.email;
    try{

        let user = await User.findOne({"email": email});
        if(!user){
            return res.status(400).send({error: 'Usuário não cadastrado'});
        }
    
        let configuracaoMundo = await Mundo.findOne({"email": email});
        
        if(configuracaoMundo){
            return res.send({configuracaoMundo })
        }
        console.log("criando mundo!");
        configuracaoMundo = await Mundo.create(
            {
                email:email,
                fundo:1,
                titulo:"Lorem ipsum fermentum commodo laoreet",
                texto:textoDefault,
                chao:1,
                fome:50,
                solidao:50,
                tristeza:50,
                sono:50 
            });

        res.send({ok: true, configuracaoMundo })
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Login failed'});
    }
});

router.post('/comerSanduiche', async (req, res) => {
    const email = req.body.email;

    try{
        let user = await User.findOne({"email": email});
        if(!user){
            return res.status(400).send({error: 'Usuário não cadastrado'});
        }
        let configuracaoMundo = await Mundo.findOne({"email": email});
        
        if(configuracaoMundo){
            let fome = configuracaoMundo.fome;
            fome = fome - 20;

            if(fome<0)
                fome=0;
            console.log("comendo");

            configuracaoMundo.fome = fome;
            configuracaoMundo.save();
            return res.send({ok: true, fome });
        }

        return res.status(400).send({error: 'Mundo não encontrado'});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'comer sanduiche failed'});
    }
});

router.post('/comerSanduiche', async (req, res) => {
    const email = req.body.email;

    try{
        let user = await User.findOne({"email": email});
        if(!user){
            return res.status(400).send({error: 'Usuário não cadastrado'});
        }
        let configuracaoMundo = await Mundo.findOne({"email": email});
        
        if(configuracaoMundo){
            let fome = configuracaoMundo.fome;
            fome = fome - 20;

            if(fome<0)
                fome=0;
            console.log("comendo");

            configuracaoMundo.fome = fome;
            configuracaoMundo.save();
            return res.send({ok: true, fome });
        }
        
        return res.status(400).send({error: 'Mundo não encontrado'});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'comer sanduiche failed'});
    }
});

router.post('/mudarTextos', async (req, res) => {
    const email = req.body.email;
    const texto = req.body.texto;
    const titulo = req.body.titulo;
    try{
        let user = await User.findOne({"email": email});
        if(!user){
            return res.status(400).send({error: 'Usuário não cadastrado'});
        }
        let configuracaoMundo = await Mundo.findOne({"email": email});
        
        if(configuracaoMundo){
            configuracaoMundo.texto = texto;
            configuracaoMundo.titulo = titulo;
            configuracaoMundo.save();
            return res.send({ok: true, configuracaoMundo });
        }
        
        return res.status(400).send({error: 'Mundo não encontrado'});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'comer sanduiche failed'});
    }
});




module.exports = app => app.use("/projects", router);

