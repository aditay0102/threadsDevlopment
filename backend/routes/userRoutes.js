import express from 'express';
import {signupUser} from '../controllers/uesrController.js'
import { loginUser } from '../controllers/uesrController.js';
import { logoutUser } from '../controllers/uesrController.js';
import { followUnfollowUser } from '../controllers/uesrController.js';
import { updateUser } from '../controllers/uesrController.js';
import protectRoute from '../middlewares/protectRoutes.js';
import { profile } from '../controllers/uesrController.js';
import { thirdprofile } from '../controllers/uesrController.js';
import { createpost } from '../controllers/postController.js';
import { getpost } from '../controllers/postController.js';
import { postUpdate } from '../controllers/postController.js';
import { delpost } from '../controllers/postController.js';
import { likeUnlike } from '../controllers/postController.js';
import { replyToPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/follow/:id',protectRoute,followUnfollowUser);
router.post("/update/:id",protectRoute,updateUser);
router.get('/profile',protectRoute,profile);
router.get('/profile/:id',protectRoute,thirdprofile);

router.post('/post/create',protectRoute,createpost);
router.post('/getpost/:id',protectRoute,getpost);
router.post('/post/update',protectRoute,postUpdate)
router.post('/delpost/:id',protectRoute,delpost)
router.post('/post/likeUnlike',protectRoute,likeUnlike);
router.post('/post/reply/:id',protectRoute,replyToPost)




// login 
// update
// follow

export default router;