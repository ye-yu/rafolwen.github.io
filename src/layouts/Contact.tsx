export function Contact({ style = {}}: Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children">) {
  return <div
    style={{
      lineHeight: "2rem",
      fontSize: "1.2rem",
      ...style,
    }}
  >
    <p>
      Hi, I am Raflie Zainuddin. I mainly do backend development and simple cloud server management, but in my free time, I do Minecraft mod development because they are just my favourite.
    </p>
    <p>
      If you want to contact me for any employment or freelancing opportunity, feel free to contact me here:
      <ul>
      <li>
          Email: <a href="mailto:contact@raflie.cc?cc=rafolwen98@gmail.com">contact@raflie.cc</a>
        </li>
        <li>
          LinkedIn: <a href="https://linkedin.com/in/raflie">Raflie Zainuddin</a>
        </li>
      </ul>
    </p>
  </div>
}
