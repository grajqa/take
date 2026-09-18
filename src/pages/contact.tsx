export default function Contact() {
  return (
    <main>
      <h1>Contact Us</h1>

      <p>
        Have a question or want to work with TAKE? Send us a message.
      </p>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message"
            rows={6}
          />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </main>
  );
}