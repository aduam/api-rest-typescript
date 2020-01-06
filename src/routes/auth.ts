import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, res) => {
  res.send({ message: 'hello-world' });
})

export default router;