import { useState } from 'preact/hooks';

export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div class="flex items-center gap-2 mb-4">
      <h3><em>{greeting}</em></h3>
      <button onClick={() => setGreeting(randomMessage())}>
        Otra frase
      </button>
    </div>
  );
}
