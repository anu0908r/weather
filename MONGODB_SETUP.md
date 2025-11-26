# MongoDB Setup Guide for Weather App

## Step-by-Step MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" or "Sign Up"
3. Sign up with email or Google account
4. Verify your email if required

### 2. Create a New Cluster

1. After logging in, click "Build a Database"
2. Choose **M0 FREE** tier
   - 512 MB storage
   - Shared RAM
   - No credit card required
3. Select your cloud provider and region:
   - AWS, Google Cloud, or Azure
   - Choose region closest to you
4. Name your cluster (e.g., "weather-cluster")
5. Click "Create Cluster" (takes 3-5 minutes)

### 3. Create Database User

1. While cluster is creating, you'll see "Security Quickstart"
2. Create a database user:
   - **Username**: `weatherapp` (or your choice)
   - **Password**: Click "Autogenerate Secure Password" or create your own
   - **IMPORTANT**: Copy and save this password!
3. Click "Create User"

### 4. Set Up Network Access

1. Next step: "Where would you like to connect from?"
2. Choose "My Local Environment"
3. Click "Add My Current IP Address"
4. **For development only**: You can also add `0.0.0.0/0` to allow access from anywhere
   - ⚠️ Don't use this in production!
5. Click "Finish and Close"

### 5. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Drivers"
3. Select:
   - Driver: **Node.js**
   - Version: **5.5 or later**
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace**:
   - `<username>` with your database username
   - `<password>` with your database password
   - Add `/weather-app` before the `?`
   
   Final format:
   ```
   mongodb+srv://weatherapp:yourpassword@cluster0.xxxxx.mongodb.net/weather-app?retryWrites=true&w=majority
   ```

### 6. Update .env.local

1. Open `/workspaces/weather/.env.local`
2. Replace the MONGODB_URI line:
   ```env
   MONGODB_URI=mongodb+srv://weatherapp:yourpassword@cluster0.xxxxx.mongodb.net/weather-app?retryWrites=true&w=majority
   ```
3. Save the file

### 7. Generate JWT Secret

The JWT_SECRET should be a long random string. Generate one using:

**Option 1 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2 - OpenSSL:**
```bash
openssl rand -hex 32
```

**Option 3 - Online:**
Visit [https://randomkeygen.com/](https://randomkeygen.com/)

Add to `.env.local`:
```env
JWT_SECRET=your_generated_secret_here_minimum_32_characters
```

### 8. Restart Development Server

```bash
# Kill existing server (if running)
pkill -f "next dev"

# Start fresh
npm run dev
```

### 9. Test the Setup

1. Go to [http://localhost:9002/register](http://localhost:9002/register)
2. Create a new account
3. If successful, you'll be redirected to dashboard
4. Check MongoDB Atlas:
   - Go to "Database" → "Browse Collections"
   - You should see:
     - `weather-app` database
     - `users` collection with your user
     - `searchhistories` collection (after first search)

## Troubleshooting

### Error: "MongoNetworkError"
- **Issue**: Can't connect to MongoDB
- **Fix**: 
  - Check your IP is whitelisted in Network Access
  - Verify connection string is correct
  - Make sure password doesn't have special characters (or URL encode them)

### Error: "Authentication failed"
- **Issue**: Wrong username or password
- **Fix**:
  - Double-check username and password in connection string
  - Recreate database user if needed

### Error: "MONGODB_URI not defined"
- **Issue**: Environment variable not loaded
- **Fix**:
  - Make sure `.env.local` file exists in root directory
  - Restart development server
  - Check file is named exactly `.env.local` (not `.env`)

### Collections not appearing
- **Issue**: Database/collections not created yet
- **Fix**:
  - Register a user first
  - Search for a city
  - Collections are created on first use

## MongoDB Atlas Tips

### View Your Data
1. Go to MongoDB Atlas
2. Click "Database" → "Browse Collections"
3. Select `weather-app` database
4. View `users` and `searchhistories` collections

### Monitor Usage
- Dashboard shows storage, connections, and operations
- Free tier: 512 MB storage, 500 connections
- More than enough for development!

### Backup Data
- Free tier includes continuous backups
- Can restore to any point in the last 24 hours

## Next Steps

Once MongoDB is set up:
1. ✅ Register a new account
2. ✅ Search for cities
3. ✅ Check search history page
4. ✅ View data in MongoDB Atlas

## Questions?

- MongoDB Docs: [https://docs.mongodb.com/](https://docs.mongodb.com/)
- Atlas Docs: [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)
- Mongoose Docs: [https://mongoosejs.com/docs/](https://mongoosejs.com/docs/)

---

Happy coding! 🚀
