import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XIcon, SERVICES } from '../constants';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        services: [] as string[],
        message: ''
    });

    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // This ensures the code runs only on the client, where the document exists.
        setModalRoot(document.getElementById('modal-root'));
    }, []);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);
    
    // Reset form state when closing
    useEffect(() => {
        if (!isOpen) {
            // Delay reset to allow fade-out animation
            setTimeout(() => {
                setSubmissionStatus('idle');
                 setFormData({ name: '', email: '', company: '', services: [], message: '' });
            }, 300);
        }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const currentServices = prev.services;
            if (checked) {
                return { ...prev, services: [...currentServices, value] };
            } else {
                return { ...prev, services: currentServices.filter(s => s !== value) };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formsubmit.co/dev.dlxtech@gmail.com", {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmissionStatus('error');
        }
    };
    
    if (!isOpen || !modalRoot) {
        return null;
    }

    return createPortal(
        <div 
            className="fixed inset-0 bg-dark-background/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            <div 
                className="bg-dark-blue w-full max-w-2xl rounded-xl shadow-2xl border border-white/10 p-6 sm:p-8 relative animate-slideInUp max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-light-text/70 hover:text-accent-purple transition-colors" aria-label="Cerrar modal">
                    <XIcon />
                </button>

                {submissionStatus === 'success' ? (
                     <div className="text-center py-10">
                        <h2 id="contact-modal-title" className="text-3xl font-bold text-light-text mb-4">¡Mensaje Enviado!</h2>
                        <p className="text-light-text/80">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <h2 id="contact-modal-title" className="text-3xl font-bold text-light-text">Hablemos de tu Proyecto</h2>
                            <p className="text-light-text/80 mt-2">Completa el formulario y nos pondremos en contacto.</p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            {/* FormSubmit fields */}
                            <input type="hidden" name="_subject" value="Nuevo Mensaje de Contacto desde DlxTech" />
                            <input type="text" name="_honey" style={{display: 'none'}} />
                        
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-light-text/90 mb-2">Nombre Completo</label>
                                    <input type="text" id="name" name="name" required className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple focus:border-accent-purple outline-none transition-all" value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-light-text/90 mb-2">Email</label>
                                    <input type="email" id="email" name="email" required className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple focus:border-accent-purple outline-none transition-all" value={formData.email} onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="company" className="block text-sm font-semibold text-light-text/90 mb-2">Empresa (Opcional)</label>
                                <input type="text" id="company" name="company" className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple focus:border-accent-purple outline-none transition-all" value={formData.company} onChange={handleInputChange}/>
                            </div>

                            <div className="mt-6">
                                <p className="block text-sm font-semibold text-light-text/90 mb-2">Servicios de Interés</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {SERVICES.map(service => (
                                        <label key={service.title} className="flex items-center space-x-3 bg-dark-background/30 p-3 rounded-lg border border-transparent hover:border-accent-purple/50 transition-colors cursor-pointer">
                                            <input type="checkbox" name="services" value={service.title} className="h-5 w-5 rounded bg-dark-background border-white/20 text-accent-purple focus:ring-accent-purple" onChange={handleCheckboxChange} checked={formData.services.includes(service.title)}/>
                                            <span className="text-light-text/90">{service.title}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <label htmlFor="message" className="block text-sm font-semibold text-light-text/90 mb-2">Tu Mensaje</label>
                                <textarea id="message" name="message" rows={4} required className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple focus:border-accent-purple outline-none transition-all" value={formData.message} onChange={handleInputChange}></textarea>
                            </div>
                            
                            <div className="mt-8 text-center">
                                <button type="submit" disabled={submissionStatus === 'submitting'} className="w-full md:w-auto bg-button-bg text-light-text font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-button-hover hover:scale-105 transform transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                                    {submissionStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>
                                {submissionStatus === 'error' && <p className="text-red-500 mt-4">Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.</p>}
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>,
        modalRoot
    );
};

export default ContactModal;
