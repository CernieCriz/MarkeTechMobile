# Deploy MarkeTech Mobile to PythonAnywhere

## 🚀 Quick Deployment Guide

### Prerequisites
- PythonAnywhere free account
- GitHub repository: https://github.com/CernieCriz/MarkeTech-Mobile

---

## 📝 Step-by-Step Instructions

### 1️⃣ Sign Up (2 minutes)
- Go to: https://www.pythonanywhere.com
- Click "Start running Python online"
- Sign up for **Beginner (FREE)** account
- Verify email

### 2️⃣ Clone Repository (3 minutes)
In **Consoles** → **$ Bash**:
```bash
git clone https://github.com/CernieCriz/MarkeTech-Mobile.git
cd MarkeTech-Mobile
ls
```

### 3️⃣ Setup Virtual Environment (5 minutes)
```bash
mkvirtualenv --python=/usr/bin/python3.10 marketech-env
pip install -r requirements.txt
pip list  # Verify
```

### 4️⃣ Create Web App (2 minutes)
- **Web** tab → **Add a new web app**
- Choose: **your-username.pythonanywhere.com**
- Select: **Manual configuration**
- Python version: **3.10**

### 5️⃣ Configure WSGI File (3 minutes)
Click the WSGI configuration file link and replace ALL content with:

```python
import sys
import os

# Add project directory to sys.path
project_home = '/home/YOUR_USERNAME/MarkeTech-Mobile'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# Set working directory
os.chdir(project_home)

# Import Flask app
from app import app as application
```

**⚠️ Replace YOUR_USERNAME with your actual username!**

Save the file (Ctrl+S or click Save button)

### 6️⃣ Set Virtual Environment (1 minute)
In **Web** tab, under **Virtualenv** section:
```
/home/YOUR_USERNAME/.virtualenvs/marketech-env
```

### 7️⃣ Set Working Directory (1 minute)
In **Web** tab, under **Code** section → **Working directory**:
```
/home/YOUR_USERNAME/MarkeTech-Mobile
```

### 8️⃣ Reload App (1 minute)
- Click big green **"Reload YOUR_USERNAME.pythonanywhere.com"** button
- Wait 30 seconds
- Visit: `http://YOUR_USERNAME.pythonanywhere.com`

---

## ✅ Verification Checklist

- [ ] Website loads without errors
- [ ] Homepage displays with logo and featured phones
- [ ] Products page shows all phones with images
- [ ] CRUD page allows adding/editing/deleting phones
- [ ] Analytics page shows charts and statistics

---

## 🔄 Updating Your App

When you push changes to GitHub:

```bash
# In PythonAnywhere Bash console
cd MarkeTech-Mobile
git pull
pip install -r requirements.txt  # if requirements changed

# Then reload your web app from Web tab
```

---

## 🐛 Troubleshooting

### Error: "Something went wrong"
1. Check **Error log** in Web tab
2. Common issues:
   - Wrong username in WSGI file
   - Virtual environment path incorrect
   - Missing packages: `pip install -r requirements.txt`

### Error: "Import Error"
```bash
# In bash console
cd MarkeTech-Mobile
workon marketech-env
python app.py  # Check for errors
```

### WSGI File Issues
- Make sure path uses YOUR actual username
- No typos in file paths
- Forward slashes `/` not backslashes `\`

### Virtual Environment Not Found
```bash
# Recreate virtual environment
mkvirtualenv --python=/usr/bin/python3.10 marketech-env
cd MarkeTech-Mobile
pip install -r requirements.txt
```

---

## 📊 PythonAnywhere Free Tier Limits

✅ **Included:**
- Always-on web app (never sleeps!)
- 512MB storage
- 100MB MySQL database (not used in this project)
- HTTPS enabled
- your-username.pythonanywhere.com domain

❌ **Limitations:**
- No custom domains on free tier
- Limited CPU time per day
- Can only access whitelist websites (includes GitHub)

---

## 🎯 Benefits Over Render

| Feature | PythonAnywhere FREE | Render FREE |
|---------|-------------------|-------------|
| **Always-On** | ✅ Yes | ❌ Sleeps after 15min |
| **Cold Starts** | ✅ None | ❌ 15-30 seconds |
| **Auto-Deploy** | ❌ Manual git pull | ✅ Automatic |
| **Setup Time** | ~15 minutes | ~5 minutes |
| **Reliability** | ✅ High | ✅ High |
| **Best For** | Long-term free hosting | Quick demos |

---

## 🌐 Your Live URLs

**PythonAnywhere**: `http://YOUR_USERNAME.pythonanywhere.com`  
**Render** (old): `https://your-app.onrender.com` (can keep both!)  
**GitHub**: https://github.com/CernieCriz/MarkeTech-Mobile

---

## 💡 Tips

1. **Keep Both Deployments**: You can run on both Render and PythonAnywhere
2. **Backup Data**: Download data.csv regularly via SFTP or Files tab
3. **Monitor Usage**: Check Web tab for CPU usage stats
4. **Upgrade Later**: PythonAnywhere paid plans ($5/mo) offer custom domains

---

## 📞 Need Help?

- PythonAnywhere Help: https://help.pythonanywhere.com
- PythonAnywhere Forums: https://www.pythonanywhere.com/forums/
- Your GitHub: https://github.com/CernieCriz/MarkeTech-Mobile

---

**Total Setup Time: ~20 minutes**  
**Result: Always-on FREE hosting! 🎉**

