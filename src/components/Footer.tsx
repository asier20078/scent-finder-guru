import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-muted-foreground">
              Discover your perfect scent through our curated collection of luxury fragrances.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground">Phone: (+34) 654-18-33-26</p>
            <p className="text-muted-foreground">Web: lasalhajasdetoledoymas.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/lasalhajasdetoledoymas/" className="text-muted-foreground hover:text-foreground">Instagram</a>
              <a href="https://www.tiktok.com/@anaiarbiol" className="text-muted-foreground hover:text-foreground">TikTok</a>
              <a href="https://www.facebook.com/A4jbeauty" className="text-muted-foreground hover:text-foreground">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; 2025 lasalhajasdetoledoymas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;