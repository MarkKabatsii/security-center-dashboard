import React, {useState} from 'react';
import Select from '../../components/ui/Select';
import TextArea from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';
import {useNavigate} from 'react-router-dom';

const HomePage: React.FC = () => {
    const [selectedModel, setSelectedModel] = useState<string>('gpt4');
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false); // To indicate loading
    const navigate = useNavigate();

    const aiModels = [
        {value: 'gpt4', label: 'OpenAI GPT-4'},
        {value: 'gpt3.5', label: 'OpenAI GPT-3.5 Turbo'},
        {value: 'claude', label: 'Anthropic Claude'},
        {value: 'gemini', label: 'Google Gemini'},
    ];

    const handleSendPrompt = async () => {
        if (!prompt.trim()) {
            alert('Prompt cannot be empty!'); // Can be replaced with more beautiful notifications
            return;
        }

        setIsLoading(true);
        // Here will be the logic for sending a request to your AI Gateway
        // Instead of a real API request, we simulate it with a delay
        try {
            console.log(`Sending prompt to ${selectedModel}: "${prompt}"`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // API latency simulation

            // After receiving the response, redirect to ResponseViewPage
            // We pass the prompt and simulated response through the router state
            navigate('/response-view', {
                state: {
                    originalPrompt: prompt,
                    aiResponse: "Based on last month's sales data, here are some recommendations:\n\n1.  **Identify Top-Performing Products:** Focus marketing efforts on products with highest sales volume.\n2.  **Analyze Regional Performance:** Pinpoint areas with high and low sales to optimize distribution.\n3.  **Customer Segmentation:** Understand purchasing patterns to tailor promotions.\n4.  **Promotional Effectiveness:** Evaluate which promotions drove the most sales.\n5.  **Inventory Management:** Adjust stock levels based on sales trends to avoid overstocking or shortages.",
                    modelUsed: selectedModel,
                },
            });
        } catch (error) {
            console.error("Error sending prompt:", error);
            // In case of an error, you can redirect to an error page or show a notification
            navigate('/blocked', {
                state: {
                    reason: "Failed to process your request due to an internal error. Please try again later.",
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="bg-light-surface dark:bg-dark-surface p-8 rounded-lg shadow-xl text-light-text dark:text-dark-text max-w-3xl mx-auto my-8">
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">AI Gateway Client Portal</h1>

            <div className="mb-6">
                <label htmlFor="ai-model-select"
                       className="block text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
                    Select AI Model
                </label>
                <Select
                    id="ai-model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    options={aiModels}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="prompt-textarea"
                       className="block text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
                    Type your prompt here...
                </label>
                <TextArea
                    id="prompt-textarea"
                    rows={8}
                    placeholder="E.g., Analyze last month's sales data for key insights."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-48"
                />
            </div>

            <Button
                onClick={handleSendPrompt}
                disabled={isLoading}
                variant="primary"
                className="w-full"
            >
                {isLoading ? 'Sending...' : 'Send Prompt'}
            </Button>
        </div>
    );
};

export default HomePage;