// src/pages/client/HomePage.tsx
import React, { useState } from 'react';
import Select from '../../components/ui/Select'; // Шлях може відрізнятися
import TextArea from '../../components/ui/TextArea'; // Шлях може відрізнятися
import Button from '../../components/ui/Button'; // Шлях може відрізнятися
import { useNavigate } from 'react-router-dom'; // Для перенаправлення на ResponseViewPage

const HomePage: React.FC = () => {
    const [selectedModel, setSelectedModel] = useState<string>('gpt4');
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false); // Для індикації завантаження
    const navigate = useNavigate();

    const aiModels = [
        { value: 'gpt4', label: 'OpenAI GPT-4' },
        { value: 'gpt3.5', label: 'OpenAI GPT-3.5 Turbo' },
        { value: 'claude', label: 'Anthropic Claude' },
        { value: 'gemini', label: 'Google Gemini' },
    ];

    const handleSendPrompt = async () => {
        if (!prompt.trim()) {
            alert('Prompt cannot be empty!'); // Можна замінити на більш красиві сповіщення
            return;
        }

        setIsLoading(true);
        // Тут буде логіка відправки запиту до вашого AI Gateway
        // Замість реального API-запиту, імітуємо його затримкою
        try {
            console.log(`Sending prompt to ${selectedModel}: "${prompt}"`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Імітація затримки API

            // Після отримання відповіді, перенаправляємо на ResponseViewPage
            // Передаємо prompt та імітовану відповідь через стан роутера
            navigate('/response-view', {
                state: {
                    originalPrompt: prompt,
                    aiResponse: "Based on last month's sales data, here are some recommendations:\n\n1.  **Identify Top-Performing Products:** Focus marketing efforts on products with highest sales volume.\n2.  **Analyze Regional Performance:** Pinpoint areas with high and low sales to optimize distribution.\n3.  **Customer Segmentation:** Understand purchasing patterns to tailor promotions.\n4.  **Promotional Effectiveness:** Evaluate which promotions drove the most sales.\n5.  **Inventory Management:** Adjust stock levels based on sales trends to avoid overstocking or shortages.",
                    modelUsed: selectedModel,
                },
            });
        } catch (error) {
            console.error("Error sending prompt:", error);
            // У випадку помилки, можна перенаправити на сторінку з помилкою або показати сповіщення
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
        <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-lg shadow-xl text-light-text dark:text-dark-text max-w-3xl mx-auto my-8">
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">AI Gateway Client Portal</h1>

            <div className="mb-6">
                <label htmlFor="ai-model-select" className="block text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
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
                <label htmlFor="prompt-textarea" className="block text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
                    Type your prompt here...
                </label>
                <TextArea
                    id="prompt-textarea"
                    rows={8} // Висота textarea
                    placeholder="E.g., Analyze last month's sales data for key insights."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-48" // Додаємо фіксовану висоту
                />
            </div>

            <Button
                onClick={handleSendPrompt}
                disabled={isLoading}
                variant="primary" // Використовуйте ваш акцентний колір
                className="w-full"
            >
                {isLoading ? 'Sending...' : 'Send Prompt'}
            </Button>
        </div>
    );
};

export default HomePage;