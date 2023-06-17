const router = require('express').Router();

const {
  getUser, getUsers, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

const { validateUserId, validateUserProfileBody, validateUserAvatarBody } = require('../middlewares/validators');

// router.post('/', createUser);
router.get('/me', getUserInfo);

router.get('/', getUsers);
router.patch('/me/avatar', validateUserAvatarBody, updateAvatar);
router.patch('/me', validateUserProfileBody, updateProfile);
router.get('/:userId', validateUserId, getUser);

module.exports = router;
