# 🎓 Chatbot Training Guide

This guide explains how to train your chatbot by adding new knowledge (intents).

---

## 📚 What is Training?

**Training** your chatbot means adding **keyword-response pairs** (called **intents**) to the database. When a user's message contains a keyword, the bot responds with the associated response.

### Example:
- **Keyword:** `"pm"`
- **User asks:** "who is the pm of india"
- **Bot responds:** "The Prime Minister of India is Narendra Modi."

---

## 🚀 Method 1: Using the Training Script (Recommended)

I've created a script that adds **80+ intents** automatically!

### Step 1: Run the Training Script

```bash
node train-chatbot.js
```

### What it does:
- ✅ Adds 80+ pre-written intents
- ✅ Covers topics: greetings, knowledge, emotions, jokes, motivation
- ✅ Updates existing intents if response changes
- ✅ Shows progress in real-time

### Expected Output:
```
🔌 Connecting to MongoDB...
✅ Connected to MongoDB

🎓 Starting chatbot training...
📚 Adding 85 intents to the database

✅ Added: "who are you"
✅ Added: "your name"
✅ Added: "good morning"
...

==================================================
🎉 Training Complete!
==================================================
✅ Successfully added: 70 intents
⏭️  Skipped (duplicates): 15 intents
❌ Errors: 0 intents
📊 Total in database: 85 intents
==================================================
```

---

## 🛠️ Method 2: Add Individual Intents via API

### Using Browser Console (Easiest)

1. Open your chatbot: `http://localhost:3000`
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Paste this code (modify keyword and response):

```javascript
fetch('http://localhost:3000/api/admin/intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    keyword: 'your-keyword-here', 
    response: 'Your bot response here' 
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Example - Teaching "who are you":

```javascript
fetch('http://localhost:3000/api/admin/intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    keyword: 'who are you', 
    response: 'I am an AI Chatbot Assistant, here to help you!' 
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 📝 Method 3: Using Postman

1. Open **Postman**
2. Create a **POST** request
3. URL: `http://localhost:3000/api/admin/intent`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):

```json
{
  "keyword": "who are you",
  "response": "I am an AI Chatbot Assistant!"
}
```

6. Click **Send**

---

## 💻 Method 4: Using curl (Command Line)

```bash
curl -X POST http://localhost:3000/api/admin/intent \
  -H "Content-Type: application/json" \
  -d "{\"keyword\":\"who are you\",\"response\":\"I am an AI Chatbot!\"}"
```

---

## 🗄️ Method 5: Direct MongoDB Insert

If you have MongoDB Compass or mongosh:

```javascript
db.intents.insertOne({
  keyword: "who are you",
  response: "I am an AI Chatbot Assistant!",
  createdAt: new Date()
})
```

---

## 📊 View All Intents

### Using API:
```bash
curl http://localhost:3000/api/admin/intents
```

### Using Browser Console:
```javascript
fetch('http://localhost:3000/api/admin/intents')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🗑️ Delete an Intent

### Using API (replace INTENT_ID):
```bash
curl -X DELETE http://localhost:3000/api/admin/intent/INTENT_ID
```

### Using Browser Console:
```javascript
fetch('http://localhost:3000/api/admin/intent/INTENT_ID_HERE', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 💡 Training Tips

### 1. **Use Simple Keywords**
- ✅ Good: `"pm"`, `"president"`, `"weather"`
- ❌ Avoid: `"who is the prime minister of india"` (too specific)

### 2. **Keywords are Case-Insensitive**
- `"PM"`, `"pm"`, `"Pm"` all work the same

### 3. **Keywords Match Anywhere in Message**
- Keyword: `"pm"`
- Matches: "who is the **pm**", "tell me about **pm**", "**pm** of india"

### 4. **First Match Wins**
- If multiple keywords match, the first one found is used
- Order matters in the database

### 5. **Use Specific Keywords for Better Accuracy**
- Instead of just `"india"`, use:
  - `"pm"` for Prime Minister
  - `"president"` for President
  - `"capital"` for Capital

---

## 📚 Pre-loaded Topics (After Running Training Script)

After running `train-chatbot.js`, your bot knows about:

### 🤖 **About the Bot**
- who are you, your name, how old are you

### 👋 **Greetings**
- hello, hi, good morning, good afternoon, good evening, good night

### 💭 **Feelings & Emotions**
- how are you, happy, sad, angry, excited, love

### 🇮🇳 **India Knowledge**
- pm, president, capital, taj mahal, independence day

### 💻 **Technology**
- computer, internet, ai, programming, javascript, python

### 📖 **Education**
- education, school, college, study

### 🔬 **Science**
- science, physics, chemistry, biology

### ➗ **Math**
- math, algebra

### ⚽ **Sports**
- cricket, football, sports

### 🍕 **Food**
- food, pizza, recipe

### 🎬 **Entertainment**
- movie, music, book

### 😄 **Jokes & Fun**
- joke, funny, laugh

### 💪 **Motivation**
- motivation, success, dream, inspire

### 🙏 **Politeness**
- please, sorry, thank you, thanks

### 👋 **Farewells**
- bye, goodbye, see you, good night

---

## 🎯 Custom Training Examples

### Add Your Own Topics:

#### Example 1: Add Your School Info
```javascript
fetch('http://localhost:3000/api/admin/intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    keyword: 'school', 
    response: 'I study at XYZ School in New Delhi!' 
  })
}).then(res => res.json()).then(data => console.log(data));
```

#### Example 2: Add Your Favorite Subject
```javascript
fetch('http://localhost:3000/api/admin/intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    keyword: 'favorite subject', 
    response: 'My favorite subject is Computer Science!' 
  })
}).then(res => res.json()).then(data => console.log(data));
```

#### Example 3: Add Hobby Information
```javascript
fetch('http://localhost:3000/api/admin/intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    keyword: 'hobby', 
    response: 'I love coding and building cool projects!' 
  })
}).then(res => res.json()).then(data => console.log(data));
```

---

## 🔍 Testing Your Training

After adding intents, test them:

1. Open chatbot: `http://localhost:3000`
2. Type questions containing your keywords
3. Check if bot responds correctly

### Example Tests:
- "who are you" → Should get bot introduction
- "good morning" → Should get morning greeting
- "tell me about india" → Should get India info
- "what is ai" → Should get AI explanation

---

## 📈 Advanced: Bulk Training

To add many intents at once, edit `train-chatbot.js`:

```javascript
const trainingData = [
  { keyword: 'your-keyword-1', response: 'Response 1' },
  { keyword: 'your-keyword-2', response: 'Response 2' },
  { keyword: 'your-keyword-3', response: 'Response 3' },
  // Add as many as you want!
];
```

Then run:
```bash
node train-chatbot.js
```

---

## ⚠️ Common Issues

### Issue 1: "Keyword already exists"
**Solution:** Actually, the chatbot now supports **automatic updates**! If you add a keyword that already exists, it will simply update the response with the new one you provided. You don't need to delete it first.

### Issue 2: Bot not responding to new intent
**Solution:** 
- Check if keyword was added: `GET /api/admin/intents`
- Make sure keyword is in lowercase
- Restart the server if needed

### Issue 3: Multiple matches
**Solution:** Use more specific keywords to avoid conflicts.

---

## 🎓 Training Workflow

```
1. Identify what users might ask
   ↓
2. Choose a keyword from the question
   ↓
3. Write a helpful response
   ↓
4. Add intent via API or script
   ↓
5. Test the chatbot
   ↓
6. Repeat!
```

---

## 📊 Monitor Your Training

Check how many intents you have:

```javascript
fetch('http://localhost:3000/api/admin/intents')
  .then(res => res.json())
  .then(data => console.log(`Total intents: ${data.data.total}`));
```

---

## 🚀 Quick Start Training

**Want to get started immediately?**

Run this command:
```bash
node train-chatbot.js
```

This will add **80+ intents** and your chatbot will be ready to answer many questions!

---

## 💡 Pro Tips

1. **Start with common questions** users might ask
2. **Use the training script** for bulk additions
3. **Test frequently** to ensure accuracy
4. **Keep responses concise** and helpful
5. **Update intents** as you learn what users ask
6. **Use emojis** to make responses friendly 😊
7. **Be specific** with technical terms
8. **Add variations** of the same question

---

## 📞 Need Help?

- Check `API_TESTING.md` for API examples
- Review `README.md` for project overview
- Look at `train-chatbot.js` for training examples

---

**Happy Training! 🎉**

Your chatbot will get smarter with every intent you add!
