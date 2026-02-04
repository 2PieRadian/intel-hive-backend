# Agentic HoneyPot

**AI-Driven Scam Engagement & Intelligence System**

An AI-powered honeypot that detects scams, engages scammers in realistic conversations, and extracts actionable intelligence—without revealing detection.

Built for the GUVI Hackathon.

---

## The Problem

Online scammers use sophisticated social engineering to steal money and data. Traditional detection systems just block known threats—they don't gather intelligence about scammer tactics, payment infrastructure, or networks.

**Why blocking isn't enough:**

- Scammers adapt faster than rules update
- No intelligence gathered from blocked messages
- Missed opportunity to waste scammer resources

---

## Our Solution

An **Agentic HoneyPot** that:

1. **Detects** scam intent using LLM-based classification
2. **Engages** scammers with human-like, confused responses
3. **Extracts** intelligence (UPI IDs, phishing URLs, phone numbers)
4. **Reports** findings via mandatory callback

```
[Scam Message] → [AI Detection] → [Realistic Engagement] → [Intelligence Extraction] → [Callback]
```

---

## How It Works

### 1. Scam Detection

The LLM analyzes messages for:

- Urgency tactics ("account blocked in 24 hours")
- Authority impersonation (banks, government)
- Requests for OTP, PIN, card numbers
- Suspicious links

**Output:** `scam | legitimate | uncertain` + confidence score

### 2. Agent Engagement

The AI pretends to be a confused, elderly person who:

- Is worried but not suspicious
- Asks clarifying questions
- Has "technical difficulties" (OTP not coming, link not working)
- Never provides real sensitive data

**Example:**

```
Scammer: "Send OTP to verify your account"
Agent: "otp? nothing came yet... my network is bad here sometimes msgs come late"
```

### 3. Intelligence Extraction

Automatically extracts from conversations:

- Phishing URLs
- UPI IDs (name@upi, name@paytm)
- Phone numbers
- Suspicious keywords

---

## API Usage

### Endpoint

```
POST /api/message
Headers: x-api-key: <your_key>
```

### Request

```json
{
  "sessionId": "sess_123",
  "message": "Your SBI account will be blocked. Update KYC: http://fake-sbi.xyz"
}
```

### Response

```json
{
  "success": true,
  "response": "oh no what happened?? is this really from sbi?",
  "analysis": {
    "isScam": true,
    "confidence": 0.94,
    "extractedIntelligence": {
      "urls": ["http://fake-sbi.xyz"],
      "upiIds": [],
      "phoneNumbers": [],
      "keywords": ["blocked", "kyc", "urgently"]
    }
  }
}
```

---

## Key Design Principles

| Principle                  | Implementation                              |
| -------------------------- | ------------------------------------------- |
| **Never reveal detection** | Agent acts confused, not suspicious         |
| **Never leak real data**   | Deflection instead of fabrication           |
| **Maximize engagement**    | Keep scammers talking to extract more intel |
| **Human-like responses**   | Short, informal, with typos                 |

**Forbidden behaviors:**

- Saying "this is a scam" or "I'm reporting this"
- Outputting placeholders like `XXXXX` or `[REDACTED]`
- Providing fake but realistic-looking sensitive data

---

## Tech Stack

| Technology               | Purpose                                 |
| ------------------------ | --------------------------------------- |
| **Node.js + TypeScript** | Server runtime                          |
| **Express.js**           | REST API framework                      |
| **Google Gemini**        | LLM for detection & response generation |
| **In-memory store**      | Session management                      |

---

## Quick Start

```bash
# Install
npm install

# Configure
cp .env.example .env
# Add your GOOGLE_AI_API_KEY and API_KEY

# Run
npm run dev
```

### Environment Variables

```env
PORT=3000
GOOGLE_AI_API_KEY=your_gemini_key
API_KEY=your_api_key
```

### Test

```bash
curl -X POST http://localhost:3000/api/message \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key" \
  -d '{"sessionId": "test_001", "message": "Your account is blocked. Click: http://scam.xyz"}'
```

---

## Safety Measures

- **Prompt constraints**: LLM instructed to never output real sensitive data
- **Deflection strategy**: Agent stalls instead of fabricating data
- **Server-side sanitization**: Responses filtered for accidental data leakage
- **No real connections**: System never connects to actual banking/payment systems

---

## Future Improvements

- Persistent database for session history
- Multi-language support (Hindi, regional languages)
- Intelligence dashboard for visualization
- Multi-LLM fallback (OpenAI, Claude)

---

## License

MIT License

---

## Acknowledgments

- GUVI Hackathon for the problem statement
- Google AI for Gemini API access
