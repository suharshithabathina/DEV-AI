import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper to read local users
const getLocalUsers = (): any[] => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading local users file:', err);
  }
  return [];
};

// Helper to save a local user
const saveLocalUser = (user: any) => {
  try {
    const users = getLocalUsers();
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local users file:', err);
  }
};

// Register a new developer user and create their profile
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    let user;
    let isOffline = false;
    
    // 1. Create the user in Supabase Auth with auto-confirmed email
    try {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name }
      });

      if (authError) {
        if (authError.message === 'fetch failed') {
          throw new Error('fetch failed');
        }
        return res.status(400).json({ error: authError.message });
      }
      user = authData.user;
    } catch (dbError: any) {
      console.warn(`[Backend] Supabase lookup failed during signup (${dbError.message}). Using local users.json store.`);
      isOffline = true;
      
      const localUsers = getLocalUsers();
      const existing = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ error: 'User already exists' });
      }

      user = {
        id: `mock-user-${Date.now()}`,
        email: email
      };
      
      saveLocalUser({
        id: user.id,
        name,
        email,
        password // saved for offline login verification
      });
    }

    if (!user) {
      return res.status(500).json({ error: 'Failed to create user record' });
    }

    // 2. Create the corresponding profile row in the profiles table
    try {
      const githubHandle = `@${email.split('@')[0]}`;
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: user.id,
          name,
          email,
          phone: '',
          github_handle: githubHandle,
          age: '26 years',
          role: 'Junior Frontend Engineer',
          company: 'SaaS StartUp',
          experience: '2 years',
          daily_coding_hours: '0 hrs',
          git_commits: '0 commits',
          skills_completed: '0 completed',
          weekly_challenges: '0 solved',
          goals: {
            career_role: 'Senior Fullstack Engineer',
            daily_coding: '6 hours per day',
            learning_milestones: '3 algorithms per week',
            git_frequency: '5 commits per day'
          }
        });

      if (profileError) {
        console.warn(`[Backend] Auth signup completed, but profile database insert warning: ${profileError.message}`);
      }
    } catch (profileDbError: any) {
      console.warn(`[Backend] Database unreachable for profile insert, skipping database record: ${profileDbError.message}`);
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name
      }
    });
  } catch (error: any) {
    console.error('[Backend] Signup exception:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Login user and return session token
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    let user;
    let token = `mock-token-${Date.now()}`;
    let isOffline = false;
    let offlineName = '';

    // Authenticate user with email and password
    try {
      const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        if (error.message === 'fetch failed') {
          throw new Error('fetch failed');
        }
        return res.status(401).json({ error: error.message });
      }
      user = data.user;
      token = data.session?.access_token || token;
    } catch (dbError: any) {
      console.warn(`[Backend] Supabase login connection failed (${dbError.message}). Validating credentials locally.`);
      isOffline = true;

      const localUsers = getLocalUsers();
      const localUser = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!localUser || localUser.password !== password) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }

      user = {
        id: localUser.id,
        email: localUser.email
      };
      offlineName = localUser.name;
    }

    if (!user) {
      return res.status(500).json({ error: 'Authentication succeeded, but session data is missing' });
    }

    // Attempt to retrieve profile metadata
    let name = offlineName || user.user_metadata?.name || email.split('@')[0];
    if (!isOffline) {
      try {
        const { data: profileData } = await supabaseAdmin
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();
        if (profileData?.name) {
          name = profileData.name;
        }
      } catch (profileError: any) {
        console.warn(`[Backend] Profile query offline: ${profileError.message}`);
      }
    }

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name
      }
    });
  } catch (error: any) {
    console.error('[Backend] Login exception:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
