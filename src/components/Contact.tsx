import { Mail as MailIcon, Phone as PhoneIcon, Search, ChevronDown, MessageSquare, MapPin, Clock, Send, Globe } from "lucide-react";
import emailjs from '@emailjs/browser';
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState, useEffect } from "react";

// EmailJS Credentials
const EMAILJS_SERVICE_ID = 'storiesbyfoot';
const EMAILJS_TEMPLATE_ID = 'template_57tfwsw';
const EMAILJS_PUBLIC_KEY = 'JH95W_X6r4YZ6I_-0';

const COUNTRIES = [
  { code: "IN", name: "India", dial: "+91" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "SL", name: "Sri Lanka", dial: "+94" },
  { code: "NP", name: "Nepal", dial: "+977" },
];

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch] = useState("");
  const [openCountryPopover, setOpenCountryPopover] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.dial.includes(countrySearch) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setOpenCountryPopover(false);
    setCountrySearch("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const message = String(formData.get("message") || "");

    // Validation
    if (!name || !email || !phone || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    setLoading(true);

    const fullPhoneNumber = selectedCountry.dial + phone;

    const contactData = {
      fullName: name,
      email: email,
      phone: fullPhoneNumber,
      message: message,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactData
      );

      setShowThankYou(true);
      form.reset();
      setSelectedCountry(COUNTRIES[0]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fad2d7d0632944f2a99e3df5568d6e82b%2F0a7a70bdabaa42b59defe24592c1de02?format=webp')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Get in <span className="text-secondary">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            Ready for your next adventure? Our team of explorers is here to help you plan the journey of a lifetime.
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background"></path>
          </svg>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-background relative px-4 md:px-0">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Side: Form */}
            <div className="lg:col-span-7">
              <Card className="border-none shadow-adventure bg-white/80 backdrop-blur-sm overflow-hidden rounded-3xl">
                <div className="h-2 bg-gradient-adventure w-full"></div>
                <CardContent className="p-8 md:p-10 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Send a Message</h3>
                    <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          required
                          className="bg-muted/30 border-none focus-visible:ring-primary h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          className="bg-muted/30 border-none focus-visible:ring-primary h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <div className="flex gap-3">
                        <Popover open={openCountryPopover} onOpenChange={(open) => {
                          setOpenCountryPopover(open);
                          if (!open) setCountrySearch("");
                        }}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-[100px] h-12 rounded-xl bg-muted/30 border-none hover:bg-muted/50 flex items-center justify-between"
                            >
                              <span className="font-medium">{selectedCountry.dial}</span>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56 p-0 rounded-xl shadow-xl border-none" align="start">
                            <div className="p-2 bg-popover">
                              <div className="relative mb-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                  type="text"
                                  placeholder="Search..."
                                  value={countrySearch}
                                  onChange={(e) => setCountrySearch(e.target.value)}
                                  className="w-full pl-9 pr-3 py-2 text-sm bg-muted rounded-lg focus:outline-none"
                                  autoFocus
                                />
                              </div>
                              <div className="max-h-60 overflow-y-auto scrollbar-hide">
                                {filteredCountries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-between group"
                                  >
                                    <span>{country.name}</span>
                                    <span className="text-muted-foreground group-hover:text-white/80">{country.dial}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="9876543210"
                          className="flex-1 bg-muted/30 border-none focus-visible:ring-primary h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about the dream adventure you're planning..."
                        required
                        className="bg-muted/30 border-none focus-visible:ring-primary min-h-[150px] rounded-2xl resize-none p-4"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full h-14 rounded-2xl text-lg font-semibold group transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          Send Message
                          <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Side: Contact Info & Support */}
            <div className="lg:col-span-5 space-y-10 pt-8 md:pt-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Talk to our Experts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have questions about a specific destination or need help with a custom itinerary, we're here to provide expert guidance.
                </p>
              </div>

              {/* Contact Method Cards */}
              <div className="grid gap-4">
                <Card className="group border-none shadow-sm hover:shadow-md transition-all duration-300 bg-muted/30">
                  <CardContent className="p-4 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <WhatsAppIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">WhatsApp</p>
                      <a href="https://wa.me/916205129118" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:underline">Chat with us now</a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group border-none shadow-sm hover:shadow-md transition-all duration-300 bg-muted/30">
                  <CardContent className="p-4 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <PhoneIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">Call Us</p>
                      <div className="space-y-1">
                        <a href="tel:+916205129118" className="block text-lg font-medium hover:underline">+91 62051 29118</a>
                        <a href="tel:+916283620764" className="block text-lg font-medium hover:underline">+91 62836 20764</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group border-none shadow-sm hover:shadow-md transition-all duration-300 bg-muted/30">
                  <CardContent className="p-4 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <MailIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">Email</p>
                      <div className="space-y-1">
                        <a href="mailto:contact@storiesbyfoot.com" className="block text-lg font-medium hover:underline">contact@storiesbyfoot.com</a>
                        <a href="mailto:storiesbyfoot@gmail.com" className="block text-lg font-medium hover:underline">storiesbyfoot@gmail.com</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Extra Info Icons */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Available</h4>
                    <p className="text-sm text-muted-foreground">9 AM - 9 PM IST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Global Support</h4>
                    <p className="text-sm text-muted-foreground">Multilingual help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold">Our Base Camp</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Drop by for a coffee and let's talk about your next destination.</p>
          </div>
          
          <div className="flex justify-center">
            <Card className="max-w-md w-full border-none shadow-sm hover:shadow-md transition-shadow bg-background rounded-3xl overflow-hidden">
              <div className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <MapPin className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Main Office</h3>
                  <p className="text-muted-foreground">
                    91, GK Crystal Home, KL Highway,<br />
                    SAS Nagar, Punjab - 140307, India
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Thank You Modal */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-3xl">
          <DialogTitle className="sr-only">Message Sent Successfully</DialogTitle>
          <div className="relative h-32 bg-gradient-adventure flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg transform translate-y-8">
              <Send className="h-10 w-10 text-secondary" />
            </div>
          </div>
          <div className="pt-16 pb-10 px-8 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Message Sent!</h2>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for reaching out. One of our adventure specialists will contact you shortly to help plan your journey.
              </p>
            </div>
            <Button
              onClick={() => setShowThankYou(false)}
              className="w-full h-12 rounded-xl font-semibold"
              variant="default"
            >
              Excellent
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
