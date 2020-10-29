// Set initially to null.
// get the current and assert it exists

useEffect(() => {
  const node = enterRef.current;
  if (node) {
    node.focus();
  }
}, []);

// Ref should be set null by DEFAULTand given generic element type
const enterRef = useRef<HTMLElement>(null);
