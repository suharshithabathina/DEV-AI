import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

const getMockProfile = (id: string) => ({
  id,
  name: "Demo Developer",
  email: "dev@example.com",
  phone: "+1 555-0811",
  age: "26 years",
  role: "Junior Frontend Engineer",
  company: "SaaS StartUp",
  experience: "2 years",
  daily_coding_hours: "5.4 hrs",
  git_commits: "28 commits",
  skills_completed: "12 completed",
  weekly_challenges: "3 solved",
  github_handle: "@dev_nikhila",
  goals: {
    career_role: "Senior Fullstack Engineer",
    daily_coding: "6 hours per day",
    learning_milestones: "3 algorithms per week",
    git_frequency: "5 commits per day"
  }
});

// Get user profile metrics
export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'User ID is required' });

  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(200).json({});
      }
      console.warn(`[Backend] Profiles query error: ${error.message}. Returning mock profile for user ${id}.`);
      return res.status(200).json(getMockProfile(id));
    }
    
    res.status(200).json(data || getMockProfile(id));
  } catch (error: any) {
    console.warn(`[Backend] Connection/Fetch error: ${error.message}. Falling back to mock metrics for user ${id}.`);
    res.status(200).json(getMockProfile(id));
  }
};

// Update user profile metrics
export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  if (!id) return res.status(400).json({ error: 'User ID is required' });

  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert({ id, ...updates })
      .select()
      .single();

    if (error) {
      console.warn(`[Backend] Profiles update error: ${error.message}. Mocking update locally for user ${id}.`);
      return res.status(200).json({ id, ...updates });
    }
    
    res.status(200).json(data);
  } catch (error: any) {
    console.warn(`[Backend] Connection/Fetch update error: ${error.message}. Mocking update locally for user ${id}.`);
    res.status(200).json({ id, ...updates });
  }
};

