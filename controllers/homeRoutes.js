const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// redner homepage if signed in
router.get('/', withAuth, async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findByPk({
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const users = userData.map((matches) => matches.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      users, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// withAuth to prevent access to users profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
