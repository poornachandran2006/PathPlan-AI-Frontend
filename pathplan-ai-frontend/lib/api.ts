// lib/api.ts

/**
 * ✅ FINAL production backend URL (Render)
 */
export const API_BASE_URL =
  "https://pathplan-ai-backend-1.onrender.com";

// ----------------------------
// 1. Resume Upload & Extraction
// ----------------------------
export async function uploadResume(file: File, targetRole: string) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("target_role", targetRole || "General Professional");
  formData.append("timeframe_months", "3");

  const response = await fetch(`${API_BASE_URL}/upload-resume`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Resume upload failed");
  }

  return response.json();
}

// ----------------------------
// 2. Roadmap Planner
// ----------------------------
export async function generateSpecificRoadmap(
  capabilities: any,
  goal: string
) {
  const response = await fetch(`${API_BASE_URL}/planner/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      capabilities,
      goal,
      timeframe_months: 3,
    }),
  });

  if (!response.ok) {
    throw new Error("Roadmap generation failed");
  }

  return response.json();
}

// ----------------------------
// 3. Opportunity Agent
// ----------------------------
export async function analyzeOpportunities(
  capabilities: any,
  targetRole: string = ""
) {
  const response = await fetch(`${API_BASE_URL}/opportunities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      capabilities,
      market_analysis: {},
      target_role: targetRole,
    }),
  });

  if (!response.ok) {
    throw new Error("Opportunities analysis failed");
  }

  return response.json();
}

// ----------------------------
// 4. Professional Presence
// ----------------------------
export async function analyzeProfessionalPresence(
  githubUrl: string,
  linkedinUrl: string,
  targetRole: string
) {
  const response = await fetch(`${API_BASE_URL}/professional-insight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      target_role: targetRole,
      linkedin_text: {
        headline: "",
        about: "",
        experience: [],
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Professional presence analysis failed");
  }

  return response.json();
}
