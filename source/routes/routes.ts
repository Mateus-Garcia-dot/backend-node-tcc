import express from "express";
import linhasRoutes from "./linha-route";
import veiculosRoutes from "./veiculo-route";
import pontosRoutes from "./pontos-route";
import loginRouter from "./login-route";

const Routes = (app: any) => {
  app.route('/').get((req: express.Request, res: express.Response) => {
    'URBS RODANDO'
  })

  app.use(
    express.json(),
    linhasRoutes,
    veiculosRoutes,
    pontosRoutes,
    loginRouter
  )
}

export default Routes