import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

import { mockProducts, categories } from '../mockData';

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! 👋 I'm your AI shopping assistant. Ask me about products, prices, or recommendations!",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const generateAIResponse = (userText: string) => {
        const lowerText = userText.toLowerCase();

        // 1. Check for Category queries
        const foundCategory = categories.find(c =>
            lowerText.includes(c.name.toLowerCase()) ||
            c.subcategories.some(sub => lowerText.includes(sub.toLowerCase()))
        );

        if (foundCategory) {
            const categoryProducts = mockProducts
                .filter(p => p.category === foundCategory.name)
                .slice(0, 3);

            if (categoryProducts.length > 0) {
                const productNames = categoryProducts.map(p => p.name).join(", ");
                return `For **${foundCategory.name}**, I recommend checking out: ${productNames}. Would you like to know more about any of these?`;
            }
        }

        // 2. Check for specific Product queries
        // Find product by fuzzy name match
        const foundProduct = mockProducts.find(p =>
            lowerText.includes(p.name.toLowerCase()) ||
            p.tags.some(tag => lowerText.includes(tag.toLowerCase()))
        );

        if (foundProduct) {
            if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('how much')) {
                return `The **${foundProduct.name}** is currently priced at **$${foundProduct.price}**. ${foundProduct.discount ? `(Save ${foundProduct.discount}%!)` : ''}`;
            }
            if (lowerText.includes('details') || lowerText.includes('desc') || lowerText.includes('feature')) {
                return `**${foundProduct.name}**: ${foundProduct.description}. It has a rating of ${foundProduct.rating}⭐ based on ${foundProduct.reviewCount} reviews.`;
            }
            // Default product summary
            return `I found the **${foundProduct.name}** for $${foundProduct.price}. It's a great choice in ${foundProduct.category}. Want to add it to your cart or seeing more details?`;
        }

        // 3. General Intents
        if (lowerText.includes('hello') || lowerText.includes('hi')) {
            return "Hi there! I can help you find products, check prices, or give recommendations. What are you looking for?";
        }
        if (lowerText.includes('shipping') || lowerText.includes('delivery')) {
            return "We offer **Free Shipping** on orders over $50! Standard delivery typically takes 3-5 business days.";
        }
        if (lowerText.includes('return') || lowerText.includes('refund')) {
            return "We have a hassle-free **30-day return policy**. Items must be in original condition.";
        }

        // 4. Fallback
        return "I'm not sure about that specific product. Try searching for 'headphones', 'camera', or browsing our 'Electronics' category!";
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const aiResponseText = generateAIResponse(newUserMessage.text);
            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponseText,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Phi AI Assistant</h3>
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-xs">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <Minimize2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto min-h-[300px] max-h-[350px]">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-purple-100' : 'bg-gradient-to-br from-purple-600 to-indigo-600'
                                            }`}>
                                            {msg.sender === 'user' ? (
                                                <User className="w-5 h-5 text-purple-600" />
                                            ) : (
                                                <Bot className="w-5 h-5 text-white" />
                                            )}
                                        </div>
                                        <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-purple-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                            <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-purple-200' : 'text-gray-400'
                                                }`}>
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-400 text-gray-700"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition-all transform active:scale-95"
                            >
                                <Send className="w-5 h-5 ml-0.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${isOpen
                    ? 'bg-gray-100 text-gray-600 rotate-90'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/40'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};
