import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

const LessonsAuthContext = createContext();

export const LessonsAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setUser(sessionData.session?.user ?? null);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <LessonsAuthContext.Provider value={{ user }}>
      {children}
    </LessonsAuthContext.Provider>
  );
};

export const useLessonsAuth = () => useContext(LessonsAuthContext);
