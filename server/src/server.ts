import 'dotenv/config';
import { app } from './app';


const PORT = process.env.DB_PORT;


app.listen(PORT, ()=>{
    console.log(`app corriendo en http://localhost:${PORT}`)
});