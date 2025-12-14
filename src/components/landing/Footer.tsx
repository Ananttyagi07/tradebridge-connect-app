import { Link } from 'react-router-dom';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Demo', 'Integrations'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Support', 'Status'],
  Legal: ['Privacy', 'Terms', 'Compliance', 'Security'],
};

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="TradeChain Logo" className="w-48 h-48 object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Blockchain-powered B2B trade platform for the global economy.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2024 TradeChain. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
