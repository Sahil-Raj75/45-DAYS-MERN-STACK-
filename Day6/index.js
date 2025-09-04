    // --- Random Quote Generator ---
    // Features:
    // 1) Fetches a random quote from Quotable API (https://api.quotable.io/random)
    // 2) Falls back to a local quote list if offline or API fails
    // 3) Copy, Tweet, keyboard shortcut, loading indicator, and subtle animations

    const textEl = document.getElementById('text');
    const authorEl = document.getElementById('author');
    const newBtn = document.getElementById('newBtn');
    const copyBtn = document.getElementById('copyBtn');
    const tweetBtn = document.getElementById('tweetBtn');
    const apiToggle = document.getElementById('apiToggle');
    const spinner = document.getElementById('spinner');
    const modeLabel = document.getElementById('mode');
    const lastUpdated = document.getElementById('lastUpdated');

    // A small curated local list as a reliable fallback
    const LOCAL_QUOTES = [
      { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { content: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
      { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
      { content: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
      { content: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
      { content: "What we know is a drop, what we don’t know is an ocean.", author: "Isaac Newton" },
      { content: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
      { content: "Make it work, make it right, make it fast.", author: "Kent Beck" },
      { content: "The secret of getting ahead is getting started.", author: "Mark Twain" },
      { content: "Stay hungry, stay foolish.", author: "Whole Earth Catalog" }
    ];

    let useAPI = true; // start in API mode by default

    function setLoading(isLoading) {
      spinner.style.display = isLoading ? 'inline-block' : 'none';
      newBtn.disabled = isLoading;
      apiToggle.disabled = isLoading;
      newBtn.ariaBusy = String(isLoading);
    }

    function timestamp() {
      const d = new Date();
      const pad = n => String(n).padStart(2, '0');
      return `${pad(d.getDate())}-${pad(d.getMonth()+1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    function renderQuote({ content, author }) {
      // trigger fade animation by replacing the node
      const fig = document.getElementById('quoteBox');
      const clone = fig.cloneNode(true);
      clone.querySelector('#text').textContent = `“${content}”`;
      clone.querySelector('#author').textContent = `— ${author || 'Unknown'}`;
      fig.replaceWith(clone);
      clone.classList.add('fade');
      lastUpdated.textContent = `Last updated: ${timestamp()}`;
    }

    async function fetchFromAPI() {
      const url = 'https://api.quotable.io/random';
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return { content: data.content, author: data.author };
    }

    function getFromLocal() {
      const r = LOCAL_QUOTES[Math.floor(Math.random() * LOCAL_QUOTES.length)];
      return { content: r.content, author: r.author };
    }

    async function loadQuote() {
      setLoading(true);
      try {
        const q = useAPI ? await fetchFromAPI() : getFromLocal();
        renderQuote(q);
      } catch (err) {
        // graceful fallback
        useAPI = false;
        modeLabel.textContent = 'Mode: Local';
        apiToggle.textContent = 'Use Local';
        renderQuote(getFromLocal());
      } finally {
        setLoading(false);
      }
    }

    // Event: New Quote
    newBtn.addEventListener('click', loadQuote);

    // Event: Copy
    copyBtn.addEventListener('click', async () => {
      const text = `${document.getElementById('text').textContent} ${document.getElementById('author').textContent}`;
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.innerHTML = '<span class="sr-only">Copied</span>✅ Copied';
      } catch {
        copyBtn.innerHTML = '<span class="sr-only">Copy failed</span>❌ Copy failed';
      } finally {
        setTimeout(() => (copyBtn.innerHTML = `\n        <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n          <path d=\"M9 9h8v11H9z\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M7 13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1\" stroke=\"currentColor\" stroke-width=\"2\"/>\n        </svg>\n        Copy\n      `), 1200);
      }
    });

    // Event: Tweet
    tweetBtn.addEventListener('click', () => {
      const quote = document.getElementById('text').textContent.replace(/^“|”$/g, '');
      const author = document.getElementById('author').textContent.replace(/^—\s*/, '');
      const tweet = `${quote} — ${author}`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}&hashtags=quotes,inspiration`;
      window.open(url, '_blank');
    });

    // Event: Toggle API/Local
    apiToggle.addEventListener('click', () => {
      useAPI = !useAPI;
      modeLabel.textContent = `Mode: ${useAPI ? 'API' : 'Local'}`;
      apiToggle.textContent = useAPI ? 'Use API' : 'Use Local';
    });

    // Keyboard shortcut (Space)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !e.repeat) { e.preventDefault(); loadQuote(); }
    });

    // Initial load
    loadQuote();
