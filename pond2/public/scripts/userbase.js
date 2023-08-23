import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const table = "Users";
const supabase = createClient(
    "https://tmtxhmoxwgwgezkbjjhn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdHhobW94d2d3Z2V6a2JqamhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjA0MjU0MiwiZXhwIjoyMDA3NjE4NTQyfQ.TKYq-hQ2jEX9IzDLIXgwQr_2Gp3NXx91VP0k07JGWjU"
);

const loginform = document.getElementById('loginForm');

loginform.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = loginform.name.value;
  const password = loginform.password.value;

  const { data, error } = await supabase.from(table).select()

  if (error) {
    console.error('Error:', error.message);
  } else {
    data.forEach(user => {
        if (user.name === name && user.password === password) {
            window.location.href = "index.html";
        }
    loginform.reset();
    });
  }
});