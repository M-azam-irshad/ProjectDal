import { useEffect, useState } from "react";
import { supabase } from "../Auth/supabaseClient";
// Dummy Supabase client with auth - replace with your actual Supabase client

export default function MyProjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

useEffect(() => {
  let mounted = true;            // guard so we don't set state after unmount
  let subscription = null;

  // Immediately-invoked async function (so effect callback remains non-async)
  (async () => {
    try {
      const res = await supabase.auth.getSession();         // safe, no nested destructuring
      const session = res?.data?.session ?? null;
      if (mounted) setUser(session?.user ?? null);
    } catch (err) {
      console.error('Failed to get session:', err);
      if (mounted) setUser(null);
    }
  })();

  // Register auth state listener
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    // event === 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | ...
    if (!mounted) return;
    setUser(session?.user ?? null);
  });

  subscription = data?.subscription;

  // cleanup
  return () => {
    mounted = false;
    if (subscription?.unsubscribe) subscription.unsubscribe();
  };
}, []);


  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Replace this with your actual Supabase query
      // Filter by the current user's ID
      const { data: items, error } = await supabase
        .from("engineering_projects")
        .select("*")
        .eq("user_id", user.id)


      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(items);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Please sign in to view your data</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading your data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex justify-center flex-col">
      <div className="flex justify-center items-center mb-6">
        <h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-8 text-center"
          style={{
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: "-0.025em",
          }}
        >
          Your Projects
        </h2>

        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-lg">No data found for your account.</p>
          </div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.subtitle}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
