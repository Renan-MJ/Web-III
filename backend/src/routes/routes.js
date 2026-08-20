const Router = require('express');
const usuariosRoutes = express.Router();

const router = Router();

router.use('/usuarios', usuarioRoutes);

export default router;