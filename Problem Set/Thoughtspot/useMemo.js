export function useNewMemo(callback, dep) {
  const memoRef = useRef({ deps: [], value: undefined });
  let hasChanged = false;

  deps.forEach((element, i) => {
    if (memoRef.current.deps[i] && deps[i] !== memoRef.current.deps[i]) {
      memoRef.current.deps[i] = deps[i];
      hasChanged = true;
    }
  });
  if (hasChanged) {
    memoRef.current.value = callback();
  }
  return memoRef.current.value;
}

export function useNewCallback(callback, deps) {
  const memoRef = useRef({ callback: undefined, deps: [] });
  let hasChanged = false;

  deps.forEach((element, i) => {
    if (memoRef.current.deps[i] && memoRef.current.deps[i] !== deps[i]) {
      memoRef.current.deps[i] = deps[i];
      hasChanged = true;
    }
  });

  if (hasChanged) {
    memoRef.current.callback = callback;
  }

  return memoRef.current.callback;
}
