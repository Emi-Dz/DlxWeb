
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XIcon, N8N_CONTACT_FORM_WEBHOOK_URL } from '../constants';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData = {
    nombreCompleto: '',
    empresa: '',
    email: '',
    telefono: '',
    cargo: '',
    soluciones: [] as string[],
    otraSolucion: '',
    objetivo: '',
    plazo: '',
    siguientesPasos: ''
};

const FormSection: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="mb-8">
        <h3 className="text-xl font-bold text-light-text mb-1">{title}</h3>
        <p className="text-sm text-light-text/70 mb-4">{description}</p>
        {children}
    </div>
);

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isOtherService, setIsOtherService] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
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
    
    useEffect(() => {
        if (!isOpen) {
            // Delay reset to allow fade-out animation
            setTimeout(() => {
                 setFormData(initialFormData);
                 setIsOtherService(false);
                 setIsSuccess(false);
                 setError(null);
                 setIsLoading(false);
            }, 300);
        }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === 'Otro') {
            setIsOtherService(checked);
        } else {
            setFormData(prev => {
                const currentServices = prev.soluciones;
                if (checked) {
                    return { ...prev, soluciones: [...currentServices, value] };
                } else {
                    return { ...prev, soluciones: currentServices.filter(s => s !== value) };
                }
            });
        }
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        const isWebhookConfigured = !!N8N_CONTACT_FORM_WEBHOOK_URL;

        if (!isWebhookConfigured) {
            setError('La URL del webhook no está configurada. El administrador debe definir la variable de entorno VITE_N8N_CONTACT_FORM_WEBHOOK_URL.');
            setIsLoading(false);
            return;
        }

        const dataToSend = { ...formData };
        if (!isOtherService) {
            dataToSend.otraSolucion = '';
        }

        try {
            const response = await fetch(N8N_CONTACT_FORM_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Error response body:", errorBody);
                throw new Error(`Error de red: ${response.status} ${response.statusText}`);
            }

            setIsSuccess(true);

        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Hubo un error al enviar el formulario. Por favor, revisa la consola e inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen || !modalRoot) {
        return null;
    }

    const serviceOptions = [
        { label: 'Desarrollo Web / App: Aplicaciones a medida, sitios interactivos, plataformas online.', value: 'Desarrollo Web / App' },
        { label: 'Automatización de Procesos: Optimización de tareas repetitivas, flujos de trabajo eficientes.', value: 'Automatización de Procesos' },
        { label: 'Asistente Virtual / Chatbot: Herramientas para mejorar la atención al cliente o la gestión interna.', value: 'Asistente Virtual / Chatbot' }
    ];

    const nextStepOptions = [
        { label: 'Agendar una videollamada: La mejor opción para discutir los detalles en profundidad y aclarar cualquier duda.', value: 'Agendar una videollamada' },
        { label: 'Que te enviemos una propuesta por email: Recibirás una cotización detallada basada en la información proporcionada.', value: 'Recibir propuesta por email' }
    ];

    return createPortal(
        <div 
            className="fixed inset-0 bg-dark-background/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            <div 
                className="bg-dark-blue w-full max-w-3xl rounded-xl shadow-2xl border border-white/10 p-6 sm:p-8 relative animate-slideInUp max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-light-text/70 hover:text-accent-purple transition-colors" aria-label="Cerrar modal">
                    <XIcon />
                </button>

                {isSuccess ? (
                     <div className="text-center py-10 px-4">
                        <h2 id="contact-modal-title" className="text-3xl font-bold text-light-text mb-4">¡Gracias por tu tiempo!</h2>
                        <p className="text-light-text/80 max-w-lg mx-auto">Hemos recibido tu información. En breve, nos pondremos en contacto para enviarte una propuesta personalizada o para agendar una llamada.</p>
                         <button onClick={onClose} className="mt-8 bg-button-bg text-light-text font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-button-hover transform transition-all duration-300 ease-in-out">
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h2 id="contact-modal-title" className="text-3xl font-bold text-light-text">Contanos sobre tu Proyecto</h2>
                            <p className="text-light-text/80 mt-2">Mientras más detalles nos des, mejor podremos ayudarte.</p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            {/* Section 1: Tu Información */}
                            <FormSection title="1. Tu Información" description="Por favor, ayúdanos a conocerte mejor.">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" name="nombreCompleto" placeholder="Nombre completo" required className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple outline-none transition-all" value={formData.nombreCompleto} onChange={handleInputChange} />
                                    <input type="text" name="empresa" placeholder="Empresa (si aplica)" className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple outline-none transition-all" value={formData.empresa} onChange={handleInputChange} />
                                    <input type="email" name="email" placeholder="Correo electrónico" required className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple outline-none transition-all" value={formData.email} onChange={handleInputChange}/>
                                    <input type="tel" name="telefono" placeholder="Teléfono de contacto" className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple outline-none transition-all" value={formData.telefono} onChange={handleInputChange}/>
                                    <div className="md:col-span-2">
                                        <input type="text" name="cargo" placeholder="Cargo o rol dentro de la empresa" className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple outline-none transition-all" value={formData.cargo} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </FormSection>
                            
                            {/* Section 2: ¿Qué Tipo de Solución Estás Buscando? */}
                            <FormSection title="2. ¿Qué Tipo de Solución Estás Buscando?" description="Indícanos cuál de nuestras especialidades se alinea con tu proyecto.">
                                <div className="space-y-3">
                                    {serviceOptions.map(service => (
                                        <label key={service.value} className="flex items-start space-x-3 bg-dark-background/30 p-3 rounded-lg border border-transparent hover:border-accent-purple/50 transition-colors cursor-pointer">
                                            <input type="checkbox" name="soluciones" value={service.value} onChange={handleServiceChange} className="mt-1 h-5 w-5 rounded bg-dark-background border-white/20 text-accent-purple focus:ring-accent-purple shrink-0"/>
                                            <span className="text-light-text/90">{service.label}</span>
                                        </label>
                                    ))}
                                    <label className="flex items-start space-x-3 bg-dark-background/30 p-3 rounded-lg border border-transparent hover:border-accent-purple/50 transition-colors cursor-pointer">
                                        <input type="checkbox" value="Otro" onChange={handleServiceChange} checked={isOtherService} className="mt-1 h-5 w-5 rounded bg-dark-background border-white/20 text-accent-purple focus:ring-accent-purple shrink-0"/>
                                        <span className="text-light-text/90">Otro (por favor, describir)</span>
                                    </label>
                                    {isOtherService && (
                                        <textarea name="otraSolucion" rows={3} placeholder="Describí brevemente la solución que necesitás..." className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple outline-none transition-all mt-2 animate-fadeIn" value={formData.otraSolucion} onChange={handleInputChange}></textarea>
                                    )}
                                </div>
                            </FormSection>

                            {/* Section 3: Tu Objetivo */}
                            <FormSection title="3. Tu Objetivo" description="Ayúdanos a comprender la esencia de tu proyecto.">
                                <textarea name="objetivo" rows={5} placeholder="¿Cuál es el principal problema o necesidad que querés resolver con esta solución?" required className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple outline-none transition-all" value={formData.objetivo} onChange={handleInputChange}></textarea>
                            </FormSection>
                            
                            {/* Section 4: Tiempo y Presupuesto */}
                            <FormSection title="4. Tiempo y Presupuesto" description="Esta información nos ayuda a ajustar nuestra propuesta a tus expectativas y recursos.">
                                  <input type="text" name="plazo" placeholder="¿Tenés alguna fecha ideal para lanzar o tener listo el proyecto?" className="w-full bg-dark-background/50 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-accent-purple outline-none transition-all" value={formData.plazo} onChange={handleInputChange} />
                            </FormSection>

                            {/* Section 5: Siguientes Pasos */}
                             <FormSection title="5. Siguientes Pasos" description="¿Cómo te gustaría que avancemos con tu proyecto?">
                                <div className="space-y-3">
                                    {nextStepOptions.map(option => (
                                         <label key={option.value} className="flex items-start space-x-3 bg-dark-background/30 p-3 rounded-lg border border-transparent hover:border-accent-purple/50 transition-colors cursor-pointer">
                                            <input type="radio" name="siguientesPasos" required value={option.value} onChange={handleInputChange} className="mt-1 h-5 w-5 bg-dark-background border-white/20 text-accent-purple focus:ring-accent-purple shrink-0"/>
                                            <span className="text-light-text/90">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </FormSection>
                            
                            {error && <div className="my-4 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">{error}</div>}

                            <div className="mt-8 text-center">
                                <button type="submit" disabled={isLoading} className="w-full md:w-auto bg-button-bg text-light-text font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-button-hover hover:scale-105 transform transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center mx-auto">
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Información del Proyecto'
                                    )}
                                </button>
                                <p className="text-xs text-light-text/50 mt-4">Una vez que completes esta información, podremos enviarte una propuesta personalizada.</p>
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

