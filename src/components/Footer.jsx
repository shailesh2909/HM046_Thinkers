const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
  <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
    <p className="text-sm">&copy; {new Date().getFullYear()} FreelanceHub</p>

    <div className="flex gap-6">
      <a href="#" className="hover:text-white transition transform hover:scale-105">Privacy</a>
      <a href="#" className="hover:text-white transition transform hover:scale-105">Terms</a>
      <a href="#" className="hover:text-white transition transform hover:scale-105">Contact</a>
    </div>
  </div>
</footer>

  );
};

export default Footer;
