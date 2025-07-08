import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import { ChatIcon, XIcon, N8N_WEBHOOK_URL } from '../constants';

const SendIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isWebhookConfigured = N8N_WEBHOOK_URL && !N8N_WEBHOOK_URL.includes("REEMPLAZA");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen) {
            if (messages.length === 0) {
                setMessages([{ 
                    id: 'init', 
                    text: '¡Hola! Soy el asistente virtual de DlxTech. ¿En qué puedo ayudarte hoy?', 
                    sender: 'bot' 
                }]);
            }
            setTimeout(() => inputRef.current?.focus(), 300); // Focus input when chat opens
        }
    }, [isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMessageText = inputValue.trim();
        if (!userMessageText || isLoading) return;

        const newUserMessage: ChatMessage = {
            id: Date.now().toString(),
            text: userMessageText,
            sender: 'user',
        };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsLoading(true);

        if (!isWebhookConfigured) {
            console.warn("MODO DEMO: La N8N_WEBHOOK_URL no está configurada en constants.tsx.");
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: 'demo_mode',
                    text: `¡Hola! Estoy en modo de demostración. Para conectarme, necesitas configurar la N8N_WEBHOOK_URL en el archivo 'constants.tsx'. Una vez hecho, podré responder a tu consulta sobre: "${userMessageText}"`,
                    sender: 'bot'
                }]);
                setIsLoading(false);
            }, 1200); // Simulate network delay
            return;
        }

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessageText }),
            });

            if (!response.ok) {
                 // Si hay un error, intentamos leer el cuerpo para dar más detalles
                const errorBody = await response.text();
                console.error("Error response body:", errorBody);
                throw new Error(`Error de red: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const botReplyText = data.reply || data.text || 'No he podido procesar tu solicitud. Intenta de nuevo.';
            
            const newBotMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: botReplyText,
                sender: 'bot',
            };
            setMessages(prev => [...prev, newBotMessage]);

        } catch (error) {
            console.error('Error al contactar el webhook de n8n:', error);
            
            let botMessageText = 'Ha ocurrido un error de conexión. Por favor, inténtalo más tarde.';

            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                 botMessageText = 'No se pudo conectar con el servidor. Esto suele deberse a una configuración de seguridad (CORS) en el webhook de n8n. Por favor, asegúrate de que tu servidor de n8n permite peticiones desde este dominio.';
            } else if (error instanceof Error && error.message.includes('500')) {
                botMessageText = 'El servidor ha encontrado un error interno. Esto suele indicar un problema en la configuración del workflow de n8n. Revisa las ejecuciones en n8n para ver el detalle del error.';
            }


            const errorMessage: ChatMessage = {
                id: 'error_fetch',
                text: botMessageText,
                sender: 'bot',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-5 sm:right-8 md:right-12 z-50 w-[calc(100%-40px)] sm:w-96 h-[65vh] sm:h-[70vh] max-h-[600px] bg-dark-blue/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}>
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                    <h3 className="font-bold text-light-text text-lg">Asistente DlxTech</h3>
                    <button onClick={() => setIsOpen(false)} className="text-light-text/70 hover:text-accent-purple transition-colors" aria-label="Cerrar chat">
                        <XIcon className="w-7 h-7" />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-light-text ${msg.sender === 'user' ? 'bg-accent-purple rounded-br-none' : 'bg-card-bg rounded-bl-none'}`}>
                                    <p className="text-sm sm:text-base leading-snug">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="bg-card-bg rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center space-x-1.5">
                                    <span className="w-2 h-2 bg-light-text/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                    <span className="w-2 h-2 bg-light-text/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="w-2 h-2 bg-light-text/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex-shrink-0">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            disabled={isLoading}
                            className="w-full bg-dark-background/50 border border-white/10 rounded-full py-3 pl-5 pr-14 text-light-text placeholder:text-light-text/50 focus:ring-2 focus:ring-accent-purple focus:border-accent-purple outline-none transition-all"
                        />
                        <button type="submit" disabled={isLoading || !inputValue} className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-purple h-9 w-9 rounded-full flex items-center justify-center text-light-text hover:bg-button-hover disabled:bg-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-110 disabled:scale-100">
                            <SendIcon />
                        </button>
                    </div>
                </form>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 sm:right-8 md:right-12 z-50 bg-button-bg w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-accent-purple/50"
                aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
            >
                {isOpen ? <XIcon className="w-8 h-8"/> : <ChatIcon className="w-8 h-8" />}
            </button>
        </>
    );
};

export default Chatbot;
