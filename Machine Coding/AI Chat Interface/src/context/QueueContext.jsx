import {
  useState,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react";

const QueueContext = createContext(null);

export function QueueContextProvider({ children }) {
  const [callbackQueue, setCallbackQueue] = useState([]);
  const [processingQueue, setProcessingQueue] = useState([]);
  const [pointer, setPointer] = useState(0);

  const addCallback = useCallback(({ chatText }) => {
    setCallbackQueue((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: chatText,
        status: "inactive",
        processes: [
          {
            name: "Analyzing",
            fn: () =>
              new Promise((resolve) => {
                const timer = Math.floor(Math.random() * 10) * 1000;
                setTimeout(() => {
                  resolve();
                }, timer);
              }),
            status: "inactive",
          },
          {
            name: "Processing",
            fn: () =>
              new Promise((resolve) => {
                const timer = Math.floor(Math.random() * 10) * 1000;
                setTimeout(() => {
                  resolve();
                }, timer);
              }),
            status: "inactive",
          },
          {
            name: "Executing",
            fn: () =>
              new Promise((resolve) => {
                const timer = Math.floor(Math.random() * 10) * 1000;
                setTimeout(() => {
                  resolve();
                }, timer);
              }),
            status: "inactive",
          },
        ],
      },
    ]);
  }, []);

  const execute = async (idx, promiseArr, id) => {
    if (idx === promiseArr.length) {
      setCallbackQueue((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "finished" } : item,
        ),
      );
      setProcessingQueue((prev) => prev.slice(0, -1));
      return;
    }
    setCallbackQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              processes: item.processes.map((process, index) =>
                index === idx ? { ...process, status: "running" } : process,
              ),
            }
          : item,
      ),
    );
    await promiseArr[idx].fn();
    setCallbackQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              processes: item.processes.map((process, index) =>
                index === idx ? { ...process, status: "finished" } : process,
              ),
            }
          : item,
      ),
    );
    execute(idx + 1, promiseArr, id);
  };

  const startProcessing = (callback) => {
    setProcessingQueue((prev) => [callback]);
    setCallbackQueue((prev) =>
      prev.map((item) =>
        item.id === callback.id ? { ...item, status: "running" } : item,
      ),
    );
  };

  useEffect(() => {
    if (!processingQueue.length) {
      if (pointer >= callbackQueue.length || callbackQueue.length === 0) {
        return;
      }
      startProcessing(callbackQueue[pointer]);
      setPointer((prev) => prev + 1);
      execute(0, callbackQueue[pointer].processes, callbackQueue[pointer].id);
    }
  }, [callbackQueue, processingQueue]);

  const value = useMemo(() => {
    return {
      callbackQueue,
      addCallback,
    };
  }, [callbackQueue, addCallback]);

  return (
    <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
  );
}

export function useQueueContext() {
  const context = useContext(QueueContext);
  if (!context) {
    throw "No queuecontext exists";
  }
  return context;
}
