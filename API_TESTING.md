# API Testing Guide

This file contains examples of how to test the Chatbot API endpoints using curl or any API testing tool.

## 1. Send a Chat Message

**Endpoint:** POST /api/chat

**Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"hello\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "userMessage": "hello",
    "botReply": "Hello! How can I help you today?",
    "timestamp": "2024-01-20T10:30:00.000Z"
  }
}
```

## 2. Get Chat History

**Endpoint:** GET /api/chat/history

**Request:**
```bash
curl http://localhost:3000/api/chat/history
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "chats": [
      {
        "_id": "...",
        "userMessage": "hello",
        "botReply": "Hello! How can I help you today?",
        "timestamp": "2024-01-20T10:30:00.000Z"
      }
    ],
    "total": 1,
    "limit": 50,
    "skip": 0
  }
}
```

## 3. Add New Intent (Admin)

**Endpoint:** POST /api/admin/intent

**Request:**
```bash
curl -X POST http://localhost:3000/api/admin/intent \
  -H "Content-Type: application/json" \
  -d "{\"keyword\": \"price\", \"response\": \"Our services are competitively priced. Please contact us for a quote!\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "intent": {
      "_id": "...",
      "keyword": "price",
      "response": "Our services are competitively priced. Please contact us for a quote!",
      "createdAt": "2024-01-20T10:30:00.000Z"
    }
  },
  "message": "Intent added successfully"
}
```

## 4. Get All Intents

**Endpoint:** GET /api/admin/intents

**Request:**
```bash
curl http://localhost:3000/api/admin/intents
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "intents": [
      {
        "_id": "...",
        "keyword": "hello",
        "response": "Hello! How can I help you today?",
        "createdAt": "2024-01-20T10:00:00.000Z"
      },
      {
        "_id": "...",
        "keyword": "price",
        "response": "Our services are competitively priced. Please contact us for a quote!",
        "createdAt": "2024-01-20T10:30:00.000Z"
      }
    ],
    "total": 2
  }
}
```

## 5. Delete an Intent

**Endpoint:** DELETE /api/admin/intent/:id

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/admin/intent/INTENT_ID_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Intent deleted successfully"
}
```

## Testing with Postman

1. Open Postman
2. Create a new request
3. Set the method (GET, POST, DELETE)
4. Enter the URL (e.g., http://localhost:3000/api/chat)
5. For POST requests, go to Body > raw > JSON and enter the JSON data
6. Click Send

## Testing with Browser Console

You can also test the API directly from the browser console:

```javascript
// Send a chat message
fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'hello' })
})
.then(res => res.json())
.then(data => console.log(data));

// Get chat history
fetch('http://localhost:3000/api/chat/history')
.then(res => res.json())
.then(data => console.log(data));

// Add new intent
fetch('http://localhost:3000/api/admin/intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    keyword: 'price', 
    response: 'Our services are competitively priced!' 
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "message": "Message is required and must be a string"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "message": "Route not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "message": "Internal Server Error"
  }
}
```
