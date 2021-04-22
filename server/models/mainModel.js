const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const CONNECTION_URL = `mongodb+srv://BrianBarr:${process.env.MONGO_PW}@cluster0.ekxhs.mongodb.net/SpotifyTribe?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err.message));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const UserSettingsSchema = new Schema({
  username: { type: String, unique: true, required: true },
  profile_layout: [ { widget_name: String, options: {} } ],
  featured_playlist: { 
    active: { type: Boolean, default: false }, 
    uri: { type: String, default: null }
  }
});

const UserSettings = mongoose.model('user_settings', UserSettingsSchema);

module.exports = UserSettings;