/**
 * AI Call Simulator
 * 
 * This script simulates the phone system + AI agent workflow:
 * 1. Gets a contact to call from the CRM
 * 2. Sends a prompt to Groq AI (simulating the conversation)
 * 3. Saves the result back to the CRM
 * 
 * Run with: npx ts-node simulator.ts
 */

import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import axios from 'axios';

dotenv.config();

// Configuration
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const BACKEND_URL = 'http://localhost:3000/api/ai';

// Simulated customer responses (to make the conversation realistic)
const CUSTOMER_RESPONSES = [
    "Hello? Who is this?",
    "I'm not interested.",
    "Tell me more about it.",
    "How much does it cost?",
    "Can you call back later?",
    "Yes, I'd like to learn more!",
    "I don't have time right now."
];

const getRandomResponse = () => CUSTOMER_RESPONSES[Math.floor(Math.random() * CUSTOMER_RESPONSES.length)];

// Classify the conversation outcome based on AI response
const classifyOutcome = (aiResponse: string, customerResponse: string): string => {
    const lowerAI = aiResponse.toLowerCase();
    const lowerCustomer = customerResponse.toLowerCase();

    if (lowerCustomer.includes("not interested")) return "NOT_INTERESTED";
    if (lowerCustomer.includes("call back later")) return "FOLLOW_UP";
    if (lowerCustomer.includes("yes") || lowerCustomer.includes("learn more")) return "QUALIFIED";
    if (lowerAI.includes("schedule") || lowerAI.includes("appointment")) return "QUALIFIED";

    return "FOLLOW_UP"; // Default
};

const runSimulation = async () => {
    console.log("\n🤖 ═══════════════════════════════════════════════════");
    console.log("   AI CALL SIMULATOR - Testing CRM + Groq Integration");
    console.log("═══════════════════════════════════════════════════════\n");

    try {
        // Step 1: Get the next contact to call
        console.log("📞 Step 1: Fetching next contact from CRM...");
        const taskResponse = await axios.get(`${BACKEND_URL}/next-call`);
        const task = taskResponse.data.task;

        if (!task) {
            console.log("😴 No contacts to call. Make sure you have:");
            console.log("   - At least one contact in the database");
            console.log("   - The contact is linked to an ACTIVE campaign");
            console.log("   - The contact hasn't been called yet");
            return;
        }

        console.log(`✅ Found contact: ${task.contactName}`);
        console.log(`   Phone: ${task.contactPhone}`);
        console.log(`   Campaign: ${task.campaignName}`);
        console.log(`   Company: ${task.companyName}`);

        // Step 2: Simulate the conversation with Groq AI
        console.log("\n🧠 Step 2: Starting AI conversation (using Llama3 on Groq)...\n");

        const customerOpening = getRandomResponse();
        console.log(`👤 CUSTOMER: "${customerOpening}"`);

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: task.systemPrompt },
                { role: "user", content: customerOpening }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 200
        });

        const aiReply = completion.choices[0]?.message?.content || "I apologize, I'm having trouble connecting.";
        console.log(`🤖 AI AGENT: "${aiReply}"`);

        // Step 3: Classify the outcome
        const outcome = classifyOutcome(aiReply, customerOpening);
        console.log(`\n📊 Classification: ${outcome}`);

        // Step 4: Save the result back to CRM
        console.log("\n💾 Step 3: Saving result to CRM database...");

        if (!task.campaignId) {
            console.log("⚠️  Warning: No campaign ID found. Skipping save.");
            console.log("   Make sure the contact is linked to an active campaign.");
            return;
        }

        await axios.post(`${BACKEND_URL}/call-result`, {
            contactId: task.contactId,
            campaignId: task.campaignId,
            outcome: outcome,
            ai_notes: `Simulated call using Groq API. Customer response: "${customerOpening}"`,
            transcript: `Customer: ${customerOpening}\nAI: ${aiReply}`
        });

        console.log("✅ Call result saved successfully!");
        console.log("\n🎉 ═══════════════════════════════════════════════════");
        console.log("   SIMULATION COMPLETE!");
        console.log("   Check your database to see the new call record.");
        console.log("═══════════════════════════════════════════════════════\n");

    } catch (error: any) {
        console.error("\n❌ Simulation failed:");
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Message: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(`   ${error.message}`);
        }
        console.log("\nTroubleshooting:");
        console.log("1. Is the backend running? (npm run dev)");
        console.log("2. Is GROQ_API_KEY set in .env?");
        console.log("3. Do you have contacts in the database?");
    }
};

// Run it!
runSimulation();
