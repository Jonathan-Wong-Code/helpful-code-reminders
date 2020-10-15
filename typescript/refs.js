// Set initially to null.
// get the current and assert it exists

useEffect(() => {
  const node = enterRef.current;
  if (node) {
    node.focus();
  }
}, []);

const enterRef = useRef < HTMLElement > null;
