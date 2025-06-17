export interface HistoryEntry {
    id: string;
    timestamp: string; // ISO string or similar for easy sorting/display
    type: string; // e.g., "Sales Data Analysis", "Marketing Plan"
    promptSummary: string; // A short summary for display in the list
    originalPrompt: string; // Full prompt
    aiResponse: string; // Full AI response
    modelUsed: string; // e.g., "OpenAI GPT-4"
    status: 'Success' | 'Failed' | 'Blocked';
    statusReason?: string; // Optional: for 'Failed' or 'Blocked'
}

const mockHistoryData: HistoryEntry[] = [
    {
        id: 'hist-001',
        timestamp: '2025-06-10T10:30:00Z',
        type: 'Sales Data Analysis',
        promptSummary: 'Analyze Q1 2025 sales data for key insights and trends.',
        originalPrompt: 'Please provide a comprehensive analysis of the first quarter (Q1) 2025 sales data. Highlight key trends, top-performing products, regional performance, and identify any significant anomalies or opportunities for improvement. The data includes figures from both online and in-store channels.',
        aiResponse: `Based on last month's sales data, here are some recommendations:\n\n1.  **Identify Top-Performing Products:** Focus marketing efforts on products with highest sales volume.\n2.  **Analyze Regional Performance:** Pinpoint areas with high and low sales to optimize distribution.\n3.  **Customer Segmentation:** Understand purchasing patterns to tailor promotions.\n4.  **Promotional Effectiveness:** Evaluate which promotions drove the most sales.\n5.  **Inventory Management:** Adjust stock levels based on sales trends to avoid overstocking or shortages.`,
        modelUsed: 'OpenAI GPT-4',
        status: 'Success',
    },
    {
        id: 'hist-002',
        timestamp: '2025-06-09T14:15:00Z',
        type: 'Marketing Plan',
        promptSummary: 'Draft a marketing plan for a new product launch in Q3.',
        originalPrompt: 'Develop a preliminary marketing plan for the upcoming "Quantum Leap" product launch in Q3. Include target audience, key messaging, proposed channels (digital, print, events), and a rough timeline. Consider a budget of $50,000 for initial campaigns.',
        aiResponse: '### Marketing Plan for "Quantum Leap" Product Launch (Q3)\n\n**Product:** Quantum Leap\n**Launch Date:** Q3 2025\n**Budget:** $50,000 (initial campaigns)\n\n**1. Target Audience:**\n   - Early adopters, tech enthusiasts (ages 25-45)\n   - Small to medium businesses seeking efficiency solutions\n\n**2. Key Messaging:**\n   - "Unleash unparalleled performance and efficiency."\n   - "Transform your workflow with Quantum Leap."\n\n**3. Proposed Channels:**\n   - **Digital:** Social media ads (Facebook, LinkedIn), Google Ads, tech blog outreach, email marketing.\n   - **Print:** Select industry magazines.\n   - **Events:** Online webinars, participation in virtual tech conferences.\n\n**4. Rough Timeline:**\n   - **Week 1-4 (Pre-launch):** Teaser campaigns, influencer collaborations, landing page setup.\n   - **Week 5-8 (Launch):** Full ad campaigns, press release, webinar series.\n   - **Week 9-12 (Post-launch):** Retargeting, customer testimonials, performance review.',
        modelUsed: 'Google Gemini',
        status: 'Success',
    },
    {
        id: 'hist-003',
        timestamp: '2025-06-08T18:00:00Z',
        type: 'Weekly Summary',
        promptSummary: 'Summarize weekly team meetings and action items.',
        originalPrompt: 'Generate a concise summary of the last week\'s team meetings. Include key decisions made, action items assigned, and any blockers identified. Meetings were held on Monday, Wednesday, and Friday.',
        aiResponse: '### Weekly Summary (June 3 - June 7)\n\n**Key Decisions:**\n- Approved budget for Q3 marketing initiatives.\n- Prioritized bug fix for login module (high urgency).\n\n**Action Items:**\n- John: Prepare Q3 marketing proposal (due EOD Fri).\n- Sarah: Test login module fix (due Wed).\n- Dev Team: Deploy hotfix for login module (ASAP).\n\n**Blockers:**\n- Awaiting external API documentation for new feature (tracking with vendor).',
        modelUsed: 'Anthropic Claude',
        status: 'Success',
    },
    {
        id: 'hist-004',
        timestamp: '2025-06-07T09:45:00Z',
        type: 'PII Data Check',
        promptSummary: 'Check document for Personally Identifiable Information (PII).',
        originalPrompt: 'Scan the provided legal document for any Personally Identifiable Information (PII) and flag it. The document contains client contracts and might include names, addresses, and social security numbers.',
        aiResponse: 'This document contains multiple instances of Personally Identifiable Information (PII) including:\n\n- **Names:** John Doe, Jane Smith, Alex Brown\n- **Addresses:** 123 Main St, Anytown, USA; 456 Oak Ave, Otherville, USA\n- **Social Security Numbers:** ***-**-1234, ***-**-5678 (Redacted for security example)',
        modelUsed: 'OpenAI GPT-3.5 Turbo',
        status: 'Success',
    },
    {
        id: 'hist-005',
        timestamp: '2025-06-06T11:00:00Z',
        type: 'Sales Data Analysis',
        promptSummary: 'Analyze sales data from the European region.',
        originalPrompt: 'Provide an analysis of sales data specifically for the European region for the last quarter. Focus on top 3 countries and potential growth areas.',
        aiResponse: 'This request was blocked due to sensitivity settings. Please refine your prompt to comply with data access policies.',
        modelUsed: 'OpenAI GPT-4',
        status: 'Blocked',
        statusReason: 'Sensitive data access policy violation.',
    },
    {
        id: 'hist-006',
        timestamp: '2025-06-05T16:20:00Z',
        type: 'Marketing Plan',
        promptSummary: 'Generate a short social media campaign idea.',
        originalPrompt: 'Give me 3 ideas for a short social media campaign targeting Gen Z for a new eco-friendly water bottle.',
        aiResponse: 'Failed to generate response: AI model overload. Please try again later.',
        modelUsed: 'Google Gemini',
        status: 'Failed',
        statusReason: 'API rate limit exceeded.',
    },
];

export default mockHistoryData;