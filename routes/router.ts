import { Router, Request, Response} from 'express';
import { GraficaData } from '../classes/grafica';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

const grafica = new GraficaData();

router.get('/grafica', (req: Request,res: Response) =>{

    res.json( grafica.getDataGrafica() );
});


router.post('/mensajes', (req: Request,res: Response) =>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {de,cuerpo};

    const server = Server.instance; //singleton es la unica instancia 
    server.io.emit('mensaje-nuevo', payload);//mensaje a todos

    res.json({
        ok: true,
        cuerpo,
        de,
        mensaje: 'post-mundo esta bien!!'
    })
});

router.post('/grafica', (req: Request,res: Response) =>{

    const mes = req.body.mes;
    const unidades = Number( req.body.unidades); //id de url

    const grafica_res = grafica.incrementarValor( mes, unidades) 

    const server = Server.instance; //singleton es la unica instancia 
    server.io.emit('cambio-grafica', grafica_res);//mensaje privado

    res.json( grafica_res );
});

//servicioobtener todos los id de usuarios
router.get('/usuarios',(req:Request,res:Response)=>{
    const server=Server.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});



//servicioobtener todos los id y nombres de usuarios
router.get('/usuarios/detalle',(req:Request,res:Response)=>{

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })

});


export default router;