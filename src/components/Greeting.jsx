import { useState } from 'preact/hooks';

export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <p class="flex items-center gap-2 mb-4">
      <em>{greeting}</em>
      <button onClick={() => setGreeting(randomMessage())}>
        Otra frase
      </button>
    </p>
  );
}
