import { useState } from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import EmergencyBanner from "../components/emergency-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  Shield, 
  Heart, 
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Bug,
  Lightbulb,
  Users
} from "lucide-react";

const contactReasons = [
  {
    id: "support",
    title: "General Support",
    description: "Questions about using the platform or getting help",
    icon: HelpCircle,
    color: "text-blue-600"
  },
  {
    id: "technical",
    title: "Technical Issues",
    description: "Report bugs, app problems, or technical difficulties",
    icon: Bug,
    color: "text-red-600"
  },
  {
    id: "feedback",
    title: "Feedback & Suggestions",
    description: "Share ideas for improvements or new features",
    icon: Lightbulb,
    color: "text-yellow-600"
  },
  {
    id: "partnership",
    title: "Schools & Organizations",
    description: "Partnerships, implementation, or institutional support",
    icon: Users,
    color: "text-green-600"
  },
  {
    id: "privacy",
    title: "Privacy & Safety",
    description: "Privacy concerns, safety issues, or data questions",
    icon: Shield,
    color: "text-purple-600"
  },
  {
    id: "other",
    title: "Other",
    description: "Media inquiries, general questions, or other topics",
    icon: MessageSquare,
    color: "text-gray-600"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    subject: "",
    message: "",
    isStudent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (in a real app, this would send to your backend)
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: "",
        email: "",
        reason: "",
        subject: "",
        message: "",
        isStudent: false
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f9dcd1]">
      <EmergencyBanner />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ecb4a7] to-[#f9dcd1] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[#59291f] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We're here to help and would love to hear from you. Whether you have questions, feedback, 
            or need support, our team is committed to providing you with the assistance you need.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-semibold text-[#59291f] mb-6">Send Us a Message</h2>
                
                {/* Contact Reasons */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">What can we help you with?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {contactReasons.map((reason) => {
                      const Icon = reason.icon;
                      return (
                        <label
                          key={reason.id}
                          className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.reason === reason.id
                              ? "border-[#59291f] bg-[#f9dcd1]"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="reason"
                            value={reason.id}
                            checked={formData.reason === reason.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <Icon className={`h-5 w-5 ${reason.color} mr-3 mt-0.5 flex-shrink-0`} />
                          <div>
                            <div className="font-medium text-gray-900">{reason.title}</div>
                            <div className="text-sm text-gray-600">{reason.description}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your inquiry"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your question, feedback, or concern..."
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="is-student"
                      name="isStudent"
                      type="checkbox"
                      checked={formData.isStudent}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#59291f] border-gray-300 rounded focus:ring-[#59291f]"
                    />
                    <label htmlFor="is-student" className="ml-2 text-sm text-gray-700">
                      I am a high school student (ages 14-18)
                    </label>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      By submitting this form, you acknowledge that you have read our privacy policy 
                      and agree to our terms of service. We will only use your information to respond 
                      to your inquiry and will not share it with third parties.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message || !formData.reason}
                    className="w-full bg-[#59291f] hover:bg-[#4a1f17] text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-semibold text-[#59291f] mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-[#59291f] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Send us an email for detailed inquiries or support requests.
                      </p>
                      <a 
                        href="mailto:wishesonwindmills@gmail.com" 
                        className="text-[#59291f] text-sm font-medium hover:text-[#4a1f17] underline"
                      >
                        wishesonwindmills@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MessageSquare className="h-6 w-6 text-[#59291f] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">WhatsApp Support</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Connect with us on WhatsApp for quick questions and support.
                      </p>
                      <a 
                        href="https://wa.me/917099030702" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#59291f] text-sm font-medium hover:text-[#4a1f17] underline"
                      >
                        +91 7099030702
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-[#59291f] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                      <p className="text-gray-600 text-sm">
                        We typically respond within 24 hours during business days.
                        For urgent matters, please use our crisis resources.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-[#59291f] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Privacy & Safety</h3>
                      <p className="text-gray-600 text-sm">
                        All communications are handled with strict confidentiality.
                        Your privacy and safety are our top priorities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Heart className="h-6 w-6 text-[#59291f] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Supportive Team</h3>
                      <p className="text-gray-600 text-sm">
                        Our team understands the importance of mental health support
                        and is committed to helping you succeed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emergency Notice */}
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">In Crisis?</h4>
                      <p className="text-red-700 text-sm mb-2">
                        If you're in immediate danger or having thoughts of self-harm, 
                        please contact emergency services immediately.
                      </p>
                      <a 
                        href="/crisis-support" 
                        className="text-red-600 text-sm font-medium hover:text-red-800 underline"
                      >
                        View Crisis Resources →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-[#59291f] text-center mb-8">
              Other Ways to Connect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <MessageSquare className="h-12 w-12 text-[#59291f] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a Chat</h3>
                <p className="text-gray-600 mb-4">
                  Get immediate support through our AI-powered chat interface available 24/7.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center text-[#59291f] font-medium hover:text-[#4a1f17]"
                >
                  Start Conversation →
                </a>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Phone className="h-12 w-12 text-[#59291f] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Crisis Support</h3>
                <p className="text-gray-600 mb-4">
                  Access emergency numbers and crisis resources for 194 countries worldwide.
                </p>
                <a
                  href="/crisis-support"
                  className="inline-flex items-center text-[#59291f] font-medium hover:text-[#4a1f17]"
                >
                  View Resources →
                </a>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Mail className="h-12 w-12 text-[#59291f] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media</h3>
                <p className="text-gray-600 mb-4">
                  Follow us on Instagram for mental health tips and community updates.
                </p>
                <a
                  href="https://instagram.com/wishesonwindmills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#59291f] font-medium hover:text-[#4a1f17]"
                >
                  @wishesonwindmills →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}