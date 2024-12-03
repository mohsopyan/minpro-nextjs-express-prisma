// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Event Platform. All rights reserved.
        </p>
        <div className="mt-4 space-x-6">
          <a href="/terms" className="text-sm hover:underline">
            Terms of Service
          </a>
          <a href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="/about" className="text-sm hover:underline">
            About Us
          </a>
        </div>
        <div className="mt-4">
          <p className="text-sm">Follow us:</p>
          <div className="flex justify-center space-x-6 mt-2">
            <a href="#" className="text-blue-400 hover:text-blue-600">
              Facebook
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              Twitter
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              Instagram
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
