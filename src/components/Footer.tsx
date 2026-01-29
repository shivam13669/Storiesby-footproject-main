import { Mail, AlertTriangle, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const indiaPackages = [
  "Ladakh Tour Packages", "Spiti Tour Packages", "Kashmir Tour Packages",
  "Rajasthan Tour Packages", "Kerala Tour Packages", "Andaman Tour Packages",
  "Sikkim Tour Packages", "Darjeeling Tour Packages", "Meghalaya Tour Packages",
  "North East Tour Packages", "Arunachal Tour Packages", "Assam Tour Packages",
  "Himachal Tour Packages", "Uttarakhand Tour Packages", "Manali Tour Packages",
  "Jaisalmer Tour Packages", "Golden Triangle Tour Packages", "Udaipur Tour Packages",
  "Wayanad Tour Packages", "Munnar Tour Packages", "Shimla Tour Packages",
  "Mussoorie Tour Packages", "Jim Corbett Tour Packages", "Srinagar Tour Packages",
  "Alleppey Tour Packages",
];

const internationalPackages = [
  "Bali Tour Packages", "Thailand Tour Packages", "Singapore Tour Packages",
  "Vietnam Tour Packages", "Malaysia Tour Packages", "Maldives Tour Packages",
];

const honeymoonPackages = [
  "Bali Honeymoon Packages", "Maldives Honeymoon Packages", "Thailand Honeymoon Packages",
];

const Footer = () => {
  return (
    <footer className="bg-footer text-primary-foreground">
      {/* Package Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex gap-8 mb-6 border-b border-primary-foreground/20 pb-4">
            <button className="font-medium border-b-2 border-primary-foreground pb-2">India Packages</button>
            <button className="font-medium text-primary-foreground/60 hover:text-primary-foreground transition-colors">International Packages</button>
            <button className="font-medium text-primary-foreground/60 hover:text-primary-foreground transition-colors">Honeymoon Packages</button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {indiaPackages.map((pkg, idx) => (
              <a key={idx} href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                {pkg}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-primary-foreground/20">
          <div>
            <h4 className="font-semibold mb-4">About Thrillophilia</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Thrillophilia Reviews</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">News</a></li>
              <li className="flex items-center gap-1 text-destructive text-sm">
                <AlertTriangle className="w-4 h-4" />
                Beware Of Frauds
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Privacy Policies</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Copyright Policies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                support@thrillophilia.com
              </li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Support</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Sitemap</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Partner With Thrillophilia</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Destination Marketing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <ul className="space-y-2">
              <li><a href="#" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"><Facebook className="w-4 h-4" /> Facebook</a></li>
              <li><a href="#" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"><Instagram className="w-4 h-4" /> Instagram</a></li>
              <li><a href="#" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">𝕏 X.com</a></li>
              <li><a href="#" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"><Linkedin className="w-4 h-4" /> Linkedin</a></li>
              <li><a href="#" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"><Youtube className="w-4 h-4" /> Youtube</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">✈</span>
            </div>
            <span className="text-xl font-bold text-primary">thrillophilia</span>
          </div>
          <p className="text-sm text-primary-foreground/60">
            © 2026 Thrillophilia.com All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
