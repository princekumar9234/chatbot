require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Hash the password manually to force-update it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('PRINCE@18', salt);

    // Check if user already exists
    const existing = await User.findOne({ username: 'prince' });
    if (existing) {
      // Force update using findByIdAndUpdate (bypasses pre-save hook)
      await User.findByIdAndUpdate(existing._id, {
        $set: {
          role: 'admin',
          displayName: 'prince chauhan',
          email: 'princechouhan9939@gmail.com',
          password: hashedPassword
        }
      });
      console.log('✅ Existing user updated to Admin with new password!');
    } else {
      // Create new admin user (pre-save hook will hash password)
      const admin = new User({
        username: 'prince',
        displayName: 'prince chauhan',
        email: 'princechouhan9939@gmail.com',
        password: 'PRINCE@18',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully!');
    }

    console.log('');
    console.log('🔑 Admin Login Details:');
    console.log('   Username : prince');
    console.log('   Password : PRINCE@18');
    console.log('   Role     : admin');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

createAdmin();
