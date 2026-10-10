const LINKS = [
  {
    label: 'Email',
    display: 'nikhilkabi0504@gmail.com',
    href: 'mailto:nikhilkabi0504@gmail.com',
  },
  {
    label: 'LinkedIn',
    display: 'nikhil-k-abi',
    href: 'https://www.linkedin.com/in/nikhil-k-abi-9a0b42169/',
  },
  {
    label: 'GitHub',
    display: 'Nikhilkabi',
    href: 'https://github.com/Nikhilkabi',
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="block" aria-label="Contact">
      <div className="w">
        <div className="glass dock">
          <div>
            <h2>Reach out</h2>
            <p>If the role needs both sides of the brain, reach out.</p>
          </div>
          <div className="dock-links">
            {LINKS.map(({ label, display, href }) => (
              <a
                key={label}
                href={href}
                className="dock-link"
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              >
                <span>{label}</span>
                <strong>{display}</strong>
              </a>
            ))}
          </div>
        </div>
        <footer className="ft">
          <span>Nikhil K Abi · 2026</span>
          <span>Bangalore</span>
        </footer>
      </div>
    </section>
  );
}
