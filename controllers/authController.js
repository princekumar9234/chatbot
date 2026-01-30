const User = require('../models/User');

// @desc    Render register page
// @route   GET /register
exports.getRegister = (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('register', { title: 'Register - AI Chatbot' });
};

// @desc    Render login page
// @route   GET /login
exports.getLogin = (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('login', { title: 'Login - AI Chatbot' });
};

// @desc    Register user
// @route   POST /register
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.render('register', {
        title: 'Register - AI Chatbot',
        error: 'Username already exists'
      });
    }

    // Create user
    const user = await User.create({
      username,
      password
    });

    // Create session
    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('register', {
      title: 'Register - AI Chatbot',
      error: error.message || 'Error registering user'
    });
  }
};

// @desc    Login user
// @route   POST /login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.render('login', {
        title: 'Login - AI Chatbot',
        error: 'Invalid username or password'
      });
    }

    // Create session
    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('login', {
      title: 'Login - AI Chatbot',
      error: 'Error logging in'
    });
  }
};

// @desc    Logout user
// @route   GET /logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};

// @desc    Mock Social Login (For Demo Purposes)
// @route   GET /auth/social/:provider
exports.mockSocialLogin = async (req, res) => {
  const provider = req.params.provider; // google, github, linkedin
  const capitalizedProvider = provider.charAt(0).toUpperCase() + provider.slice(1);
  // Create a friendlier username, maybe use a fixed one for demo or random
  const mockUsername = `${capitalizedProvider}User`;
  
  try {
    // Check if a mock user exists, if not create one
    // We use findOneAndUpdate with upsert to find or create in one go if possible, 
    // but standard find/create is fine for clarity
    let user = await User.findOne({ username: mockUsername });

    if (!user) {
        // Create user if not exists
        user = await User.create({
            username: mockUsername,
            password: 'dummy_password_for_social_login' 
        });
    }

    // Create session
    req.session.user = {
      id: user._id,
      username: user.username,
      isSocial: true,
      provider: provider
    };

    res.redirect('/');
  } catch (error) {
    console.error(`Error in mock ${provider} login:`, error);
    res.redirect('/auth/login?error=Social+Login+Failed');
  }
};

// @desc    Update user profile
// @route   POST /auth/update-profile
// @desc    Update user profile
// @route   POST /auth/update-profile
exports.updateProfile = async (req, res) => {
  console.log('Update Profile Request Body:', req.body);
  try {
    const { displayName, email } = req.body;
    
    // Get User ID from Session or Passport User
    let userId;
    if (req.session && req.session.user) {
        userId = req.session.user.id || req.session.user._id;
    } else if (req.user) {
        userId = req.user.id || req.user._id;
    }

    if (!userId) {
        console.error('Update Profile: No user ID found in session');
        return res.status(401).json({ success: false, error: 'Unauthorized: No session found' });
    }

    // Build update object
    const updateData = {};
    if (displayName) updateData.displayName = displayName;
    if (email) updateData.email = email;
    
    console.log(`Updating user ${userId} with data:`, updateData);

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    
    if (!updatedUser) {
         console.error('Update Profile: User not found in DB');
         return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Update Session
    if (req.session.user) {
        req.session.user.displayName = updatedUser.displayName;
        req.session.user.email = updatedUser.email;
        // Also update root properties if they exist
        req.session.user = { ...req.session.user, ...updateData };
    }
    
    // Save session manually to ensure persistence before response
    req.session.save((err) => {
        if (err) console.error('Session save error:', err);
        
        // Return success JSON
        return res.json({ success: true, user: updatedUser });
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
